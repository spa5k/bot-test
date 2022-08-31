import { GiphyFetch } from '@giphy/js-fetch-api';
import { readdirSync } from 'fs';
import path from 'path';
import { chromium } from 'playwright-chromium';
import { client } from '../config/client';
import { SlashCommand } from '../types/discord';

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const command: SlashCommand = client.slashCommands.get(
    interaction.commandName,
  );

  const commands = ['roles'];

  if (!command) return;

  try {
    const commandPath = path.join(__dirname, '../commands/slash');
    const commandFiles = readdirSync(commandPath).filter((file) =>
      file.endsWith('.js' || '.ts'),
    );

    for (const file of commandFiles) {
      const commander: SlashCommand = await import(`../commands/slash/${file}`);
      commands.push(commander.data.name);
    }

    const giphy = new GiphyFetch(process.env.GIPHY_API_KEY as string);

    if (commands.includes(command.name)) {
      try {
        await command.execute(interaction, client, giphy);
      } catch (error) {
        console.error(error);
        await interaction.channel?.send({
          content: 'There was an error while executing this command!',
        });
      }
    } else {
      const browser = await chromium.launch({ chromiumSandbox: false });

      const context = await browser.newContext();
      const page = await context.newPage();
      try {
        await command.execute(interaction, client, giphy, page);
      } catch (error) {
        console.error(error);
        await interaction.channel?.send({
          content: 'There was an error while executing this command!',
        });
      } finally {
        await page.close();
        await browser.close();
      }
    }
  } catch (error) {
    console.log('error in interaction', error);
  }
});
