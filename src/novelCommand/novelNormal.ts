import type { Page } from 'playwright-chromium';
import { db } from '../prisma';
import { NormalCommand } from '../types/discord';
import { checkAndUpdateChapter } from '../utils/checkAndUpdateChapter';
import { oldChapterEmbed } from '../utils/oldChapterEmbed';

export const novel: NormalCommand = {
  name: 'novel',
  description: 'List the Novels',
  permission: 'SendMessages',

  usage: '',
  execute: async (message, args, command, client, giphy, page) => {
    const novelArguments: string[] = [];

    const pendingPromiseSet = new Set();

    const novelData = await db.novel.findUnique({
      where: { slug: command.toLowerCase() },
    });

    pendingPromiseSet.add({
      message: setTimeout(() => message.delete(), 20_000),
    });

    if (!novelData) {
      const novelNotFoundMessage = await message.channel.send(
        'No such novel, fix your command',
      );
      pendingPromiseSet.add({
        deletedNovelMessage: setTimeout(
          () => novelNotFoundMessage.delete(),
          20_000,
        ),
      });
      await Promise.all(pendingPromiseSet);

      return;
    }

    if (novelData.status === 'DISABLED') {
      const deletedNovelMessage = await message.channel.send(
        `Hey, ${novelData.name} has been disabled, please try something else.`,
      );

      pendingPromiseSet.add({
        deletedNovelMessage: setTimeout(
          () => deletedNovelMessage.delete(),
          20_000,
        ),
      });

      await Promise.all(pendingPromiseSet);

      return;
    }

    if (args.length === 0) {
      novelArguments.push(novelData?.defaultSource as string);
    }

    args.forEach((argument) => novelArguments.push(argument));

    for await (const novelArg of novelArguments) {
      const sourceData = await db.source.findFirst({
        where: {
          novelId: novelData?.id,
          source: {
            contains: novelArg.toLowerCase(),
          },
        },
      });

      if (!sourceData || sourceData.status === 'DISABLED') {
        const { data: gifs } = await giphy.random({
          tag: 'nope',
          type: 'gifs',
        });

        const noSourceMessage = await message.channel.send(gifs.url);

        const infoMessage = await message.channel.send(
          'No such source or it might have been disabled, try with different arguments',
        );

        pendingPromiseSet.add({
          noSourceMessage: setTimeout(() => noSourceMessage.delete(), 20_000),
          infoMessage: setTimeout(() => infoMessage.delete(), 20_000),
        });
        // eslint-disable-next-line no-continue
        continue;
      }

      const {
        chapterNumber,
        chapterTitle,
        updatedAt,
        sourceUrl,
        chapterUrl,
        source,
      } = sourceData;

      // We send the older chapter info embed here, then in background we search the new chapter
      const previousChapterInfoEmbed = oldChapterEmbed({
        chapterNumber,
        chapterTitle,
        lastUpdatedTimeStamp: updatedAt,
        novelTitle: novelData.name,
        sourceName: source,
        sourceUrl,
        thumbnailUrl: novelData.thumbnailUrl,
        url: chapterUrl,
      });

      const previousChapterEmbedMessage = await message.channel.send({
        embeds: [previousChapterInfoEmbed],
      });

      pendingPromiseSet.add({
        previousChapterEmbedMessage: setTimeout(
          () => previousChapterEmbedMessage.delete(),
          20_000,
        ),
      });

      try {
        const chapterUpdateStatus = await checkAndUpdateChapter({
          message,
          sourceData,
          novelData,
          client,
          page: page as Page,
        });

        if (chapterUpdateStatus) {
          pendingPromiseSet.delete('informationMessage');

          const { data: gifs } = await giphy.random({
            tag: 'found it',
            type: 'gifs',
          });

          const congratsGifMessage = await message.channel.send(gifs.url);
          pendingPromiseSet.add({
            congratsGifMessage: setTimeout(
              () => congratsGifMessage.delete(),
              20_000,
            ),
          });
        }
      } catch (error) {
        console.log('Error in checking update chapter for arg', error);
      }
    }

    if (!pendingPromiseSet.has('congratsGifMessage')) {
      const { data } = await giphy.random({
        tag: 'nope',
        type: 'gifs',
      });
      await message.channel.send(data.url);
    }
    await Promise.all(pendingPromiseSet);
  },
};
