import { GiphyFetch } from '@giphy/js-fetch-api';
import { readdirSync } from 'fs';
import path from 'path';
import { chromium } from 'playwright-chromium';
import { client } from '../config/client';
import { NormalCommand } from '../types/discord';

const prefix = process.env.PREFIX as string;

client.on('messageCreate', async (message) => {
  if (
    message.author.bot ||
    !message.content.startsWith(prefix) ||
    !message.guild
  ) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args?.shift()?.toLowerCase();

  if (!cmd || cmd.length === 0) return;

  const command: NormalCommand = client.commands.get(cmd);
  const commands = [];

  if (!command) return;
  const commandPath = path.join(__dirname, '../commands/normal');
  const commandFiles = readdirSync(commandPath).filter((file) =>
    file.endsWith('.js' || '.ts'),
  );

  for (const file of commandFiles) {
    const commander: NormalCommand = await import(`../commands/normal/${file}`);
    commands.push(commander.name);
  }

  const giphy = new GiphyFetch(process.env.GIPHY_API_KEY as string);
  if (commands.includes(command.name)) {
    try {
      await command.execute(message, args, command.name, client, giphy);
    } catch (error) {
      console.error('Error happened while scraping', error);
    }
  } else {
    const browser = await chromium.launch({ chromiumSandbox: false });

    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await command.execute(message, args, command.name, client, giphy, page);
    } catch (error) {
      console.error('Error happened while scraping', error);
    } finally {
      await page.close();
      await browser.close();
    }
  }
  await message.channel.send(
    '**Attention please**: After few weeks, our Bot will only respond to slash (/) commands, the old type of commands will not be available.',
  );
});
