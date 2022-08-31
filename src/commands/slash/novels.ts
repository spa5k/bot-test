import { Embed, SlashCommandBuilder } from 'discord.js';
import { db } from '../../prisma';
import { SlashCommand } from '../../types/discord';

const novels: SlashCommand = {
  name: 'novels',
  data: new SlashCommandBuilder()
    .setName('novels')
    .setDescription('Get the list of all novels!'),
  permission: 'SEND_MESSAGES',

  execute: async (interaction) => {
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
      } as Embed;

      embeds.push(embed);
    });

    await interaction.reply({
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

    await interaction?.channel?.send({
      embeds: [legendEmbed as unknown as Embed],
    });
  },
};

export = novels;
