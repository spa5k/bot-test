import dotenv from 'dotenv';
dotenv.config();

import { REST } from '@discordjs/rest';
import type { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/rest/v9';
import { Routes } from 'discord-api-types/rest/v9';
import {
  APIApplicationCommandOptionChoice,
  SlashCommandBuilder,
} from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { novelSlash } from './novelCommand/novelSlash';
import roles from './novelCommand/roles';
import { db } from './prisma';
import { SlashCommand } from './types/discord';



const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const deployCommands = async () => {
  const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];

  const commandPath = path.join(__dirname, './commands/slash');
  const commandFiles = readdirSync(commandPath).filter((file) =>
    file.endsWith('.js' || '.ts'),
  );

  for (const file of commandFiles) {
    const command: SlashCommand = await import(`./commands/slash/${file}`);
    commands.push(command.data.toJSON());
  }

  const novels = await db.novel.findMany({
    include: {
      sources: true,
    },
  });

  try {
    for (const novel of novels) {
      if (novel.status === 'ENABLED' && novel.sources.length > 0) {
        const enabledSources = novel.sources.filter(
          (source) => source.status === 'ENABLED',
        );

        const sources = enabledSources.map((source) => source.source);

        const options: APIApplicationCommandOptionChoice<string>[] = [];

        sources.forEach((source) =>
          options.push({
            name: source.toLowerCase(),
            value: source.toLowerCase(),
          }),
        );

        const command = new SlashCommandBuilder()
          .setName(novel.slug.toLowerCase())
          .setDescription(novel.name)
          .addStringOption((option) =>
            option
              .setName('source')
              .setDescription('Select the source you want to get update for')
              .setRequired(false)
              .addChoices(...options),
          );

        const singleCommand = {
          name: novel.slug,
          data: command,
          execute: novelSlash.execute,
          permission: 0n,
        };

        commands.push(singleCommand.data.toJSON());
      }
    }
  } catch (err) {
    console.log('Error happened while creating slash commandHandler', err);
  }

  // Role command
  const roleOptions: APIApplicationCommandOptionChoice<string>[] = [];

  // name and slug

  novels.forEach((novel) => {
    if (novel.status === 'ENABLED' && novel.sources.length > 0) {
      novel.sources.forEach((source) => {
        if (source.status === 'ENABLED') {
          const roleString = `${novel.slug.toUpperCase()}'s ${source.source.toUpperCase()}`;
          roleOptions.push({ name: roleString, value: source.roleId || '' });
        }
      });
    }
  });

  try {
    const command = new SlashCommandBuilder()
      .setName('roles')
      .setDescription('Handle the notification role')
      .addStringOption((option) =>
        option
          .setName('get')
          .setDescription('Get the role')
          .setRequired(false)
          .addChoices(...roleOptions),
      )
      .addStringOption((option) =>
        option
          .setName('remove')
          .setDescription('Remove the role')
          .setRequired(false)
          .addChoices(...roleOptions),
      );
    const singleCommand = {
      name: 'roles',
      data: command,
      execute: roles.execute,
      permission: 0n,
    };
    commands.push(singleCommand.data.toJSON());
  } catch (err) {
    console.log('Error happened while creating roleSlashCommandHandler', err);
  }

  const rest = new REST({ version: '9' }).setToken(String(token));
  try {
    const bot = rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    await bot;
    console.log('Registered');
  } catch (error) {
    console.log('Error while registering', error);
  }
};

deployCommands().catch((error) => {
  console.log('Registering', error);
});
