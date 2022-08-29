/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable function-paren-newline */
import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';

export const eventHandler = (client: Client) => {
  const eventsPath = path.join(__dirname, '../events');
  // eslint-disable-next-line array-callback-return, consistent-return
  const commandFiles = readdirSync(eventsPath).filter((file) => {
    const js = file.endsWith('.js');
    const ts = file.endsWith('.ts');
    if (js || ts) {
      return file;
    }
  });

  commandFiles.forEach(async (file) => {
    const event = await import(`../events/${file}`);

    if (client.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });

  console.log('Event Handler is ready');
};
