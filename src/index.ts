import dotenv from 'dotenv';
import cron from 'node-cron';
import { client } from './config/client';
import { commandHandler } from './handlers/command';
import { eventHandler } from './handlers/event';
import { novelSlashCommandHandler } from './handlers/novelCommand';
import { roleSlashCommandHandler } from './handlers/roleCommand';
import { slashCommandHandler } from './handlers/slashCommand';
import { cronNovelUpdate } from './utils/cronNovelUpdate';

dotenv.config();

require('isomorphic-fetch');

const token = process.env.DISCORD_TOKEN;
if (!process.env.PREFIX) {
  process.env.PREFIX = '-';
}

const main = async () => {
  await client.login(token);

  try {
    await commandHandler(client);
  } catch (error) {
    console.log('Error in command handler', error);
  }

  try {
    await slashCommandHandler(client);
  } catch (error) {
    console.log('Error in slash command handler', error);
  }

  try {
    await novelSlashCommandHandler(client);
  } catch (error) {
    console.log('Error in novel slash command handler', error);
  }

  try {
    await roleSlashCommandHandler(client);
  } catch (error) {
    console.log('Error in role slash command handler', error);
  }

  try {
    eventHandler(client);
  } catch (error) {
    console.log('Error in event handler', error);
  }

  client.once('ready', () => {
    [...client.guilds.cache.values()].forEach((guild) => {
      console.info(`🚀 Bot connected to Discord server: ${guild.name}`);
    });
  });

  await client.login(token);

  cron.schedule('*/5 * * * *', async () => {
    await cronNovelUpdate(client);
  });
};

main().catch(console.error);
