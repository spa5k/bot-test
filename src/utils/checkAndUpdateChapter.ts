import { novel as novelType, source as sourceType } from '@prisma/client';
import translate from '@vitalets/google-translate-api';
import { Client, Message } from 'discord.js';
import { lastChapterInfo } from 'novels-raw-scraper';
import type { Page } from 'playwright-chromium';
import { db } from '../prisma';
import { newChapterEmbed } from './newChapterEmbed';
import { pingForUpdate } from './pingForUpdate';

type CheckAndUpdate = {
  message: Message | null;
  sourceData: sourceType;
  novelData: novelType;
  client: Client;
  page: Page;
};

export const checkAndUpdateChapter = async ({
  message,
  sourceData,
  novelData,
  client,
  page,
}: CheckAndUpdate): Promise<boolean> => {
  const {
    sourceUrl,
    linkSelector,
    numberSelector,
    titleSelector,
    chapterNumber: oldChapterNumber,
    source,
    channelId,
    roleId,
  } = sourceData;

  const { thumbnailUrl, name } = novelData;
  console.log('----------------------------------');
  console.log('Scraping  -  ', novelData.name, ' - ', source);

  let chapterInfo;
  try {
    chapterInfo = await lastChapterInfo({
      linkSelector,
      numberSelector,
      sourceUrl,
      titleSelector,
      page,
    });
  } catch (error) {
    console.log('Error in lastChapterInfo: ', error);
    return false;
  }

  const { number, link, title } = chapterInfo;

  if (
    number <= oldChapterNumber ||
    !(Math.abs(oldChapterNumber - number) > 10)
  ) {
    return false;
  }

  const translatedTitle = await translate(title, { to: 'en' });

  const updatedChapter = await db.source.update({
    where: {
      id: sourceData.id,
    },
    data: {
      chapterTitle: translatedTitle.text,
      chapterNumber: number,
      chapterUrl: link,
    },
  });

  const embed = newChapterEmbed({
    chapterNumber: number,
    chapterTitle: translatedTitle.text,
    novelTitle: name,
    updatedAtTimeStamp: updatedChapter.updatedAt,
    url: link || sourceUrl,
    sourceName: source,
    sourceUrl,
    thumbnailUrl,
    numberOfChaps: number - oldChapterNumber,
  });

  await pingForUpdate({
    channelId,
    client,
    roleId: roleId || null,
    embed,
  });

  if (message) {
    await message.channel.send({ embeds: [embed] });
  }

  return true;
};
