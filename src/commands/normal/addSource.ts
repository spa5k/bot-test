import { Prisma } from '@prisma/client';
import { EmbedBuilder, EmbedField, Message } from 'discord.js';
import { isUrlOnline } from 'is-url-online';
import { lastChapterInfo } from 'novels-raw-scraper';
import { chromium } from 'playwright-chromium';
import { db } from '../../prisma';
import { NormalCommand } from '../../types/discord';
import { createRolesHelper } from '../../utils/createRolesHelper';

const addSource: NormalCommand = {
  name: 'add-source',
  description: 'Add a Source',
  permission: 'Administrator',
  usage: '',
  async execute(message) {
    await message.channel.send(
      'In order to add a source, please provide the following information:',
    );
    await message.channel.send('1. Source Url');
    await message.channel.send('2. Link Selector');
    await message.channel.send('3. Title Selector');
    await message.channel.send('4. Number Selector');
    await message.channel.send('5. Name');

    const slugArgs = {} as Prisma.sourceCreateInput;
    const novels = await db.novel.findMany({
      select: {
        name: true,
        slug: true,
      },
    });

    const novelFields = novels.map((i, index) => ({
      name: `${index + 1} - ${i.name}`,
      value: i.slug,
    }));

    const embed = {
      title: 'Enter the number of the novel you want to add source for',
      fields: novelFields,
    };

    await message.channel.send({ embeds: [embed] });

    const askForNovelMessage = await message.channel
      .send(`Please enter the novel number that you want to create source for -

    `);
    const filter = (response: Message) =>
      response.author.id === message.author.id;

    const await1 = await askForNovelMessage.channel.awaitMessages({
      filter,
      max: 1,
    });
    const selectedNovel = await1.first()?.content;

    const findNovel = await db.novel.findFirst({
      where: {
        slug: novels[Number(selectedNovel) - 1].slug,
      },
    });

    await message.channel.send(
      `You have selected - ${findNovel?.name as string}`,
    );

    const sourceUrl = await message.channel.send('Enter the source url please');

    const await2 = await sourceUrl.channel.awaitMessages({
      filter,
      max: 1,
    });
    const sourceUrlData = await2.first()?.content;
    const isOnline = await isUrlOnline(sourceUrlData as string);

    if (!isOnline) {
      await message.channel.send(
        'The url you mentioned is not getting connected to, enter a different url',
      );
      return;
    }
    slugArgs.sourceUrl = sourceUrlData as string;
    // Link Selector
    await message.channel.send('Please enter the Link Selector brat');

    const await3 = await sourceUrl.channel.awaitMessages({
      filter,
      max: 1,
    });
    const linkSelectorData = await3.first()?.content;
    slugArgs.linkSelector = linkSelectorData as string;
    // Title Selector
    await message.channel.send('Title Selector Please');

    const await4 = await sourceUrl.channel.awaitMessages({
      filter,
      max: 1,
    });
    const titleSelectorData = await4.first()?.content;
    slugArgs.titleSelector = titleSelectorData as string;
    // Number Selector
    await message.channel.send('Number Selector as its needed');

    const await5 = await sourceUrl.channel.awaitMessages({
      filter,
      max: 1,
    });
    const numberSelectorData = await5.first()?.content;
    slugArgs.numberSelector = numberSelectorData as string;
    // Source Name
    await message.channel.send(
      'Enter the name of the Source, like raw or lnmtl',
    );

    const await8 = await sourceUrl.channel.awaitMessages({
      filter,
      max: 1,
    });
    const sourceSelectorData = await8.first()?.content;
    const searchingMessage = await message.channel.send(
      "Searching for novel's chapters",
    );

    slugArgs.source = sourceSelectorData as string;

    const browser = await chromium.launch({ chromiumSandbox: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    let chapterInfo: {
      link: string;
      number: number;
      title: string;
    };

    try {
      chapterInfo = await lastChapterInfo({
        linkSelector: slugArgs.linkSelector,
        numberSelector: slugArgs.numberSelector,
        sourceUrl: slugArgs.sourceUrl,
        titleSelector: slugArgs.titleSelector,
        page,
      });

      await browser.close();
    } catch (err) {
      await message.channel.send('Something went wrong, please try again');
      return;
    } finally {
      await browser.close();
    }

    const fields: EmbedField[] = [
      {
        name: '#️⃣ Chapter Number',
        value: chapterInfo.number.toString(),
        inline: true,
      },
      {
        name: '🔤 Chapter Title',
        value: chapterInfo.title,
        inline: false,
      },
    ];

    const statusInfo = new EmbedBuilder()
      .setTitle(chapterInfo.title)
      .setURL(slugArgs.sourceUrl)
      .addFields(fields);
    await searchingMessage.edit({ embeds: [statusInfo] });

    const confirmMessage = await message.channel.send(
      'Please send YES if you want to add this source to the novel or NO if you want to cancel',
    );

    const await6 = await confirmMessage.channel.awaitMessages({
      filter,
      max: 1,
    });

    const YES_NO = await6.first()?.content;

    if (YES_NO === 'YES') {
      const addedSource = await db.source.create({
        data: {
          ...slugArgs,
          chapterNumber: chapterInfo.number || 0,
          chapterUrl: chapterInfo.link,
          chapterTitle: chapterInfo.title || '',
          novel_novelTosource_novel_id: {
            connect: {
              id: findNovel?.id,
            },
          },
        },
      });

      await message.channel.send(
        `Your source got added with the id of - ${addedSource.id}`,
      );
      await createRolesHelper(message);
    } else {
      await message.channel.send('Cancelled');
    }
  },
};

export = addSource;
