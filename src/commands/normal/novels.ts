import { Embed } from 'discord.js';
import { db } from '../../prisma';
import { NormalCommand } from '../../types/discord';

const novels: NormalCommand = {
  name: 'novels',
  description: 'List the Novels',
  permission: 'SendMessages',

  usage: '',
  async execute(message) {
    const novelsObject = await db.novel.findMany({
      select: {
        name: true,
        slug: true,
        defaultSource: true,
        thumbnailUrl: true,
        status: true,
        sources: {
          select: {
            source: true,
            sourceUrl: true,
            roleId: true,
            status: true,
          },
        },
      },
    });

    const embeds: Embed[] = [];

    novelsObject.forEach(async (novel) => {
      const fields = novel.sources.map((source) => ({
        name: source.source.toUpperCase(),
        value: `<@&${source.roleId as string}> ${
          source.status === 'ENABLED' ? '✅' : '⛔'
        }
          `,
      }));

      const embed = {
        title: `${novel.name} ${novel.status === 'ENABLED' ? '✅' : '⛔'}`,
        color: 1_816_200,
        thumbnail: {
          url: novel.thumbnailUrl,
        },

        fields: [
          {
            name: 'Novel Slug',
            value: novel.slug.toUpperCase(),
          },
          ...fields,
        ],
      };

      embeds.push(embed as Embed);
    });

    await message.channel.send({
      embeds,
    });
    const legendEmbed = {
      title: 'Info',
      fields: [
        { name: '✅', value: 'Enabled' },
        { name: '⛔', value: 'Disabled' },
      ],
      color: '#000',
    };
    await message.channel.send({ embeds: [legendEmbed as unknown as Embed] });
  },
};

export = novels;
