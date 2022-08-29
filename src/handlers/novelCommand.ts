import { Client } from 'discord.js';
import { novelSlash } from '../novelCommand/novelSlash';
import { db } from '../prisma';

export const novelSlashCommandHandler = async (client: Client) => {
  const novels = await db.novel.findMany({
    include: {
      sources: true,
    },
  });

  novels.forEach((novel) => {
    client.slashCommands.set(novel.slug.toLowerCase(), novelSlash);
  });
};
