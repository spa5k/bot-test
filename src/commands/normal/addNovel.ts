import { Prisma } from '@prisma/client';
import { Message } from 'discord.js';
import { db } from '../../prisma';
import { NormalCommand } from '../../types/discord';

// Now `command` is strictly typed to `Command` interface
const addNovel: NormalCommand = {
  name: 'add-novel',
  description: 'Add a Novel',
  permission: 'Administrator',
  usage: '',
  async execute(message) {
    await message.channel.send(
      'In order to add a novel, please provide the following information:',
    );
    await message.channel.send('1. Title');
    await message.channel.send('2. Slug');
    await message.channel.send('3. Thumbnail Url');
    await message.channel.send('4. Default source');

    const novelArgs: Prisma.novelCreateInput = {
      name: '',
      slug: '',
      thumbnailUrl: '',
      defaultSource: '',
    };

    const filter = (response: Message) =>
      response.author.id === message.author.id;
    // Novel Message
    await message.channel.send('Enter the novel name');

    const await1 = await message.channel.awaitMessages({
      filter,
      max: 1,
    });
    const novelData = await1.first()?.content;
    // Slug Message
    await message.channel.send('What is the slug?');

    const await2 = await message.channel.awaitMessages({
      filter,
      max: 1,
    });
    const slugData = await2.first()?.content;
    // Thumbnail Url
    await message.channel.send('Thumbnail URL please');

    const await3 = await message.channel.awaitMessages({
      filter,
      max: 1,
    });
    const thumbnailUrlData = await3.first()?.content;

    await message.channel.send('Enter the default source');

    const await4 = await message.channel.awaitMessages({
      filter,
      max: 1,
    });
    const defaultSourceData = await4.first()?.content;

    novelArgs.name = String(novelData);
    novelArgs.slug = String(slugData);
    novelArgs.thumbnailUrl = String(thumbnailUrlData);
    novelArgs.defaultSource = String(defaultSourceData);

    const novelAddedData = await db.novel.create({ data: novelArgs });

    await message.channel.send(
      `Your source got added with the id of -${novelAddedData.id}`,
    );
    process.exit(1);
  },
};

export = addNovel;
