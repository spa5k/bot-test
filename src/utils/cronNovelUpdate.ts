import { novel, source } from '@prisma/client';
import { Client } from 'discord.js';
import { chromium } from 'playwright-chromium';
import { db } from '../prisma';
import { checkAndUpdateChapter } from './checkAndUpdateChapter';

export const cronNovelUpdate = async (client: Client): Promise<void> => {
  const novels = await db.novel.findMany({
    include: {
      sources: true,
    },
  });

  const browser = await chromium.launch({ chromiumSandbox: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const sources: {
    source: source;
    novel: novel;
  }[] = [];

  for (const nov of novels) {
    if (nov.status === 'ENABLED') {
      const enabledSources = nov.sources.filter((s) => s.status === 'ENABLED');

      for (const sou of enabledSources) {
        sources.push({
          source: sou,
          novel: nov,
        });
      }
    }
  }

  try {
    for await (const data of sources) {
      await checkAndUpdateChapter({
        novelData: data.novel,
        sourceData: data.source,
        client,
        page,
        message: null,
      });
    }
  } catch (error) {
    console.log('Error in cronNovelUpdate', error);
  } finally {
    await page.close();
    await browser.close();
  }
};
