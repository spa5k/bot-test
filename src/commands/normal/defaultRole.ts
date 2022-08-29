import { Message } from 'discord.js';
import { db } from '../../prisma';
import { NormalCommand } from '../../types/discord';

// Now `command` is strictly typed to `Command` interface
const defaultRole: NormalCommand = {
  name: 'default-role',
  description: 'Set Default Role for a Novel',
  permission: 'Administrator',

  usage: '',
  async execute(message) {
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
      title: "Enter the number o' novel ye want to change default source fer",
      fields: novelFields,
    };

    await message.channel.send({ embeds: [embed] });

    const askForNovelMessage = await message.channel
      .send(`Please enter the number that there ye want to change default source fer -
    `);

    const filter = (response: Message) =>
      response.author.id === message.author.id;

    const await1 = await askForNovelMessage.channel.awaitMessages({
      filter,
      max: 1,
    });

    const selectedNovel = await1.first()?.content;
    const novel = novels[Number(selectedNovel) - 1];

    const findNovel = await db.novel.findFirst({
      where: {
        slug: novel.slug,
      },
    });

    if (!findNovel) {
      await message.channel.send('No such source');
      return;
    }

    await message.channel.send(`Ye 'ave selected - ${findNovel.name}`);

    const defaultSource = await message.channel.send(
      'Enter the default source ye want to be used matey',
    );

    const await2 = await defaultSource.channel.awaitMessages({
      filter,
      max: 1,
    });
    const defaultSourceData = await2.first()?.content;

    await message.channel.send(
      `You have Selected ${defaultSourceData as string} for ${findNovel.name}`,
    );

    const confirmMessage = await message.channel.send(
      'Send **Yes** to make proceed, **No** to stop.',
    );

    const await3 = await confirmMessage.channel.awaitMessages({
      filter,
      max: 1,
    });

    const confirmMessageData = await3.first()?.content.toLowerCase();

    if (confirmMessageData === 'yes') {
      const updatedNovel = await db.novel.update({
        where: { id: findNovel.id },
        data: { defaultSource: defaultSourceData?.toLowerCase() },
      });
      await message.channel.send(
        `${updatedNovel.defaultSource} is now a default source for ${updatedNovel.name}`,
      );
    }
  },
};

export = defaultRole;
