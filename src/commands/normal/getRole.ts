import { Role } from 'discord.js';
import { db } from '../../prisma';
import { NormalCommand } from '../../types/discord';

const getRole: NormalCommand = {
  name: 'get',
  description: 'Get the roles',
  permission: 'SendMessages',
  usage: '[novel_slug] [source]',

  async execute(message, args) {
    if (args.length === 0) {
      await message.channel.send(
        `'Hay, no novel with such a here name, get the correct novel slugs by doing' **${process.env.PREFIX}novels** or use the slash command /roles`,
      );
      return;
    }

    const novels = await db.novel.findUnique({
      select: {
        name: true,
        slug: true,
        sources: {
          select: {
            source: true,
          },
        },
      },
      where: {
        slug: args[0].toLowerCase(),
      },
    });

    if (!novels) {
      await message.channel.send(
        `'Hey, no such novel, get yerself the correct novel by doin' **${process.env.PREFIX}novels** or use the slash command /roles`,
      );
      return;
    }

    if (args.length < 2) {
      const sourceArr = novels.sources.map((i) => i.source).join(', ');
      await message.channel.send(
        `Please enter one of the source fer the role - ${sourceArr}`,
      );
    }

    const user = message.member;

    if (user && !!message.guild) {
      const roleString = `${novels.slug.toUpperCase()}-${args[1].toUpperCase()}`;
      const role = message.guild.roles.cache.find((r) => r.name === roleString);
      await user.roles.add(role as Role);
      await message.channel.send(`You got - ${roleString}`);
    }
  },
};

export = getRole;
