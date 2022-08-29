/* eslint-disable no-param-reassign */
import { Client, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { SlashCommand } from '../types/discord';

export const slashCommandHandler = async (client: Client) => {
  client.slashCommands = new Collection();

  const commandPath = path.join(__dirname, '../commands/slash');
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith('.js' || '.ts'));

  commandFiles.forEach(async (file) => {
    const command: SlashCommand = await import(`../commands/slash/${file}`);

    client.slashCommands.set(command.data.name, command);
  });
};
