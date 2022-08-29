import { chromium } from 'playwright-chromium';
import { db } from '../../prisma';
import { NormalCommand } from '../../types/discord';
import { checkAndUpdateChapter } from '../../utils/checkAndUpdateChapter';

const updateChapterDatabase: NormalCommand = {
  name: 'update-db',
  description: 'Update all sources to their latest chapter',
  permission: 'ChangeNickname',

  usage: '',
  async execute(message, _args, _command, client) {
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

    let novelStr = '';
    novels.forEach((i) => {
      novelStr += `${i.name}`;
    });

    const msg = await message.channel.send(
      `Lookin' fer updatin' the db fer these novels - ${novelStr}`,
    );

    const browser = await chromium.launch({ chromiumSandbox: false });

    const context = await browser.newContext();
    const page = await context.newPage();

    await msg.edit('🚀 Update has been initiated');
    for await (const novel of novels) {
      for await (const source of novel.sources) {
        try {
          await checkAndUpdateChapter({
            message,
            page,
            sourceData: source,
            novelData: novel,
            client,
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

export = updateChapterDatabase;
