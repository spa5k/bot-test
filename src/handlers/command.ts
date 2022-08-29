/* eslint-disable no-param-reassign */
import { Client, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { novel } from '../novelCommand/novelNormal';
import { db } from '../prisma';
import { NormalCommand } from '../types/discord';

export const commandHandler = async (client: Client) => {
  client.commands = new Collection();

  const commandPath = path.join(__dirname, '../commands/normal');
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith('.js' || '.ts'));

  commandFiles.forEach(async (file) => {
    const command: NormalCommand = await import(`../commands/normal/${file}`);

    client.commands.set(command.name, command);
  });

  const novels = await db.novel.findMany({
    select: {
      name: true,
      slug: true,
    },
  });

  novels.forEach((i) => {
    const singleCommand: NormalCommand = {
      name: i.slug,
      description: `Find new chapter details fer ${i.name}`,
      execute: novel.execute,
      usage: '[source]',
      permission: 'SendMessages',
    };
    client.commands.set(i.slug, singleCommand);
  });
};
