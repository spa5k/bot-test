import { SlashCommandBuilder } from '@discordjs/builders';
import { chromium } from 'playwright-chromium';
import { client } from '../../config/client';
import { db } from '../../prisma';
import { SlashCommand } from '../../types/discord';
import { checkAndUpdateChapter } from '../../utils/checkAndUpdateChapter';

const updateChapterDb: SlashCommand = {
  name: 'update',
  data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('Check update for all novels at once'),
  permission: 'Administrator',

  execute: async (interaction) => {
    await interaction.reply('Hey, the Update has been initiated');

    const novels = await db.novel.findMany({
      select: {
        name: true,
        slug: true,
        sources: true,
        id: true,
        updatedAt: true,
        thumbnailUrl: true,
        defaultSource: true,
        status: true,
        createdAt: true,
        sourceId: true,
      },
      where: {
        status: 'ENABLED',
        sources: {
          every: {
            status: 'ENABLED',
          },
        },
      },
    });

    // const page = await puppeteerPage()
    const browser = await chromium.launch({ chromiumSandbox: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    for await (const novel of novels) {
      for await (const source of novel.sources) {
        try {
          await checkAndUpdateChapter({
            page,
            sourceData: source,
            novelData: novel,
            client,
            message: null,
          });
        } catch (error) {
          console.log(
            'Error while Scraping Chapter',
            source.source,
            novel.name,
          );
        }
      }
    }
    await page.close();
    await browser.close();
  },
};

export = updateChapterDb;
