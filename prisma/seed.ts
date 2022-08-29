import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ptwxzGenericSelector =
  '#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)';

const wucosGenericSelector =
  '#list > dl:nth-child(1) > dd:nth-child(2) > a:nth-child(1)';

const lnmtlLinkSelector =
  'table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)';

async function seedFunction() {
  const mcbw = await prisma.novel.create({
    data: {
      name: 'My Cold and Beautiful Wife',
      slug: 'mcbw',
      thumbnailUrl: 'https://lnmtl.com/upload/novel/416.jpg',
      defaultSource: 'raw',
      sources: {
        create: [
          {
            source: 'raw',
            chapterNumber: 4016,
            chapterUrl: 'http://www.wucuoxs.com/80858/718734014.html',
            linkSelector: wucosGenericSelector,
            numberSelector: wucosGenericSelector,
            chapterTitle: '你老婆跑了',
            titleSelector: wucosGenericSelector,
            sourceUrl: 'http://www.wucuoxs.com/80858/',
            roleId: '677986539372019724',
            status: 'ENABLED',
          },
          {
            source: 'ptwxz',
            chapterNumber: 4016,
            chapterUrl: 'https://www.ptwxz.com/html/8/8965/9715218.html',
            linkSelector: ptwxzGenericSelector,
            numberSelector: ptwxzGenericSelector,
            chapterTitle: '你老婆跑了',
            titleSelector: ptwxzGenericSelector,
            sourceUrl: 'https://www.ptwxz.com/bookinfo/8/8965.html',
            roleId: '901850340255727677',
            status: 'ENABLED',
          },
        ],
      },
    },
  });

  const ki = await prisma.novel.create({
    data: {
      name: 'Keyboard Immortal',
      slug: 'ki',
      thumbnailUrl: 'https://cdn.wuxiaworld.com/images/covers/ki.jpg',
      defaultSource: 'raw',
      sources: {
        create: [
          {
            source: 'raw',
            chapterUrl: 'https://www.ptwxz.com/html/11/11622/9715141.html',
            chapterNumber: 979,
            linkSelector: ptwxzGenericSelector,
            numberSelector: ptwxzGenericSelector,

            chapterTitle: '女海王',
            titleSelector: ptwxzGenericSelector,
            sourceUrl: 'https://www.ptwxz.com/bookinfo/11/11622.html',
            roleId: '860838177908588584',

            status: 'ENABLED',
          },
        ],
      },
    },
  });

  const iacb = await prisma.novel.create({
    data: {
      name: 'I’m Actually a Cultivation Bigshot',
      slug: 'iacb',
      thumbnailUrl:
        'https://cdn.novelupdates.com/images/2021/01/Im-Actually-a-Cultivation-Bigshot.jpg',
      defaultSource: 'raw',
      sources: {
        create: [
          {
            source: 'raw',
            chapterNumber: 832,
            chapterUrl: 'https://www.ptwxz.com/html/11/11950/9711519.html',
            linkSelector: ptwxzGenericSelector,
            numberSelector: ptwxzGenericSelector,
            chapterTitle: '天地倾覆',
            titleSelector: ptwxzGenericSelector,
            sourceUrl: 'https://www.ptwxz.com/bookinfo/11/11950.html',
            roleId: '865139746523316254',
          },
        ],
      },
    },
  });

  const nshba = await prisma.novel.create({
    data: {
      name: 'Nine Star Hegemon Body Art',
      slug: 'nshba',
      thumbnailUrl: 'https://lnmtl.com/assets/images/novel/391-200.jpg',
      defaultSource: 'raw',
      sources: {
        create: [
          {
            source: 'lnmtl',
            chapterNumber: 4634,
            chapterUrl:
              'https://lnmtl.com/chapter/nine-star-hegemon-body-art-book-12-chapter-4634',
            linkSelector: lnmtlLinkSelector,
            numberSelector:
              'table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > span:nth-child(1)',
            chapterTitle: 'beautiful Spirit Race',
            titleSelector: lnmtlLinkSelector,
            sourceUrl: 'https://lnmtl.com/novel/nine-star-hegemon-body-art',
            roleId: '745708762391642162',
          },
          {
            source: 'raw',
            chapterNumber: 4634,
            chapterUrl: 'https://www.ptwxz.com/html/7/7811/9717169.html',
            linkSelector: ptwxzGenericSelector,
            numberSelector: ptwxzGenericSelector,
            chapterTitle: 'Ling',
            titleSelector: ptwxzGenericSelector,
            sourceUrl: 'https://www.ptwxz.com/bookinfo/7/7811.html',
            roleId: '860838180595695617',
          },
        ],
      },
    },
  });

  const pop = await prisma.novel.create({
    data: {
      name: 'Protect our Patriarch',
      slug: 'pop',
      thumbnailUrl:
        'https://cdn.shucdn.com/files/article/image/35/35523/35523s.jpg',
      defaultSource: 'raw',
      sources: {
        create: [
          {
            source: 'raw',
            chapterNumber: 499,
            chapterUrl: 'https://www.69shu.com/txt/35523/27004783',
            linkSelector:
              '.qustime > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)',
            numberSelector:
              '.qustime > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1) > span:nth-child(1)',
            chapterTitle: '893739996949905438',
            titleSelector:
              '.qustime > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1) > span:nth-child(1)',
            sourceUrl: 'https://www.69shu.com/txt/35523.htm',
            roleId: '893739996949905438',
          },
          {
            source: 'lnmtl',
            chapterNumber: 499,
            chapterUrl:
              'https://lnmtl.com/chapter/protect-our-patriarch-book-5-chapter-499-part-2',
            linkSelector: lnmtlLinkSelector,
            numberSelector:
              'table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > span:nth-child(1)',
            chapterTitle:
              'Part 2   The Zongkun happy fish lives( asked monthly ticket) ',
            titleSelector: lnmtlLinkSelector,
            sourceUrl: 'https://lnmtl.com/novel/protect-our-patriarch',
            roleId: '899276141439901736',
          },
        ],
      },
    },
  });

  console.log({
    mcbw,
    ki,
    iacb,
    nshba,
    pop,
  });
}

seedFunction()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
