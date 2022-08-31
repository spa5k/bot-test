/* eslint-disable no-useless-return */
import type { Page } from 'playwright-chromium';
import { db } from '../prisma';
import { NovelSlashCommand } from '../types/discord';
import { checkAndUpdateChapter } from '../utils/checkAndUpdateChapter';
import { oldChapterEmbed } from '../utils/oldChapterEmbed';

export const novelSlash: NovelSlashCommand = {
  name: 'novelslash',
  permission: 'SEND_MESSAGES',
  execute: async (interaction, client, giphy, page) => {
    const source = interaction.options.data[0]?.value?.toString();
    await interaction.deferReply();

    await interaction.editReply({ content: 'Searching 🔍!' });
    let found = false;

    const pendingPromiseSet = new Set();

    const { commandName: novelName } = interaction;

    const novelData = await db.novel.findUnique({
      select: {
        defaultSource: true,
        id: true,
        name: true,
        thumbnailUrl: true,
        createdAt: true,
        updatedAt: true,
        slug: true,
        sourceId: true,
        status: true,
      },
      where: {
        slug: novelName.toLowerCase(),
      },
    });

    if (!novelData) {
      return interaction.editReply('Novel not found');
    }

    let sourceNeeded = source;

    if (!source) {
      sourceNeeded = novelData?.defaultSource as string;
    }

    const sourceData = await db.source.findFirst({
      where: {
        source: {
          equals: sourceNeeded,
        },
        status: {
          equals: 'ENABLED',
        },
        novelId: novelData.id,
      },
    });

    if (!sourceData || sourceData.status === 'DISABLED') {
      return interaction.editReply('Source not found');
    }

    const {
      chapterNumber,
      chapterTitle,
      updatedAt,
      sourceUrl,
      chapterUrl,
      source: sourceName,
    } = sourceData;

    const previousChapterInfoEmbed = oldChapterEmbed({
      chapterNumber,
      chapterTitle,
      lastUpdatedTimeStamp: updatedAt,
      novelTitle: novelData.name,
      sourceName,
      sourceUrl,
      thumbnailUrl: novelData.thumbnailUrl,
      url: chapterUrl,
    });

    await interaction.editReply({
      embeds: [previousChapterInfoEmbed],
    });

    try {
      const chapterUpdateStatus = await checkAndUpdateChapter({
        sourceData,
        novelData,
        client,
        page: page as Page,
        message: null,
      });

      if (chapterUpdateStatus) {
        found = true;
        pendingPromiseSet.delete('informationMessage');

        const { data: gifs } = await giphy.random({
          tag: 'found it',
          type: 'gifs',
        });

        await interaction.editReply('Done ✅');

        const congratsGifMessage = await interaction?.channel?.send(gifs.url);

        pendingPromiseSet.add({
          congratsGifMessage: setTimeout(
            () => congratsGifMessage?.delete(),
            20_000,
          ),
        });
      }
    } catch (error) {
      console.error(error);
    }

    if (!found) {
      const { data } = await giphy.random({
        tag: 'nope',
        type: 'gifs',
      });
      await interaction.editReply('Done ✅');

      const noChapterFound = await interaction.channel?.send({
        content: data.url,
      });

      pendingPromiseSet.add({
        congratsGifMessage: setTimeout(() => noChapterFound?.delete(), 20_000),
      });
    }

    await Promise.all(pendingPromiseSet);
    // eslint-disable-next-line consistent-return
    return;
  },
};
