import { db } from '../../prisma';
import { NormalCommand } from '../../types/discord';

const removeRole: NormalCommand = {
  name: 'remove',
  description: 'Remove the role from the user',
  permission: 'SendMessages',
  usage: '[novel_slug] [source]',

  async execute(message, args) {
    if (args.length === 0) {
      await message.channel.send(
        `Hay, no novel with such a here name, get the correct novel slugs by doing' **${process.env.PREFIX}novels** or use the slash command /roles`,
      );
      return;
    }

    const sources = await db.novel.findFirst({
      select: {
        slug: true,
        sources: {
          select: {
            source: true,
          },
        },
      },
      where: {
        slug: args[0],
      },
    });

    const novelName = sources;

    const sourceString = sources?.sources
      .map((source) => source.source)
      .join(', ');

    if (args.length === 1) {
      await message.channel.send(
        "'Hay, please add the source you want to remove",
      );
      await message.channel.send(
        `'Hey, We currently support removal of **${sourceString}** for ${novelName}, example - \`${process.env.PREFIX}remove ${args[0]} ${sources?.sources[0].source}\``,
      );
      return;
    }

    const roleString = `${args[0].toUpperCase()}-${args[1].toUpperCase()}`;

    const user = message.member;

    const role = message.guild?.roles.cache.find((r) => r.name === roleString);

    if (!role) {
      await message.channel.send(
        `'Hay, We only support **${sourceString}** for ${novelName}`,
      );
      return;
    }

    await user?.roles.remove(role);
    await message.channel.send(`You no longer have - ${roleString} role`);
  },
};

export = removeRole;
