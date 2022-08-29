/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChannelType } from 'discord.js';
import type { NormalCommand } from '../../types/discord';

const help: NormalCommand = {
  name: 'help',
  description: 'Help Command',
  permission: 'SendMessages',

  usage: [
    `${process.env.PREFIX}help`,
    `${process.env.PREFIX}help [command_name]`,
  ],
  execute: async (message, args) => {
    const data = [];
    const { commands } = message.client;

    if (args.length === 0) {
      await message.reply('Check ya dm matey');

      data.push(
        "H'ere's a list o' all me commands:",
        commands.map((command: NormalCommand) => command.name).join(', '),
        `\nYe can send \`${process.env.PREFIX}help [command name]\` to get info on a specific command!`,
      );

      try {
        await message.author.send(data.toString());
        if (message.channel.type === ChannelType.DM) {
          return;
        }
        return;
      } catch {
        await message.reply(
          "it seems like I can't dm you! do you have dms disabled?",
        );
      }
      return;
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name);

    if (!command) {
      await message.reply('That is not a valid command');
      return;
    }

    data.push(`**Name:** ${command.name}`);

    if (command.description) {
      data.push(`**Description:** ${command.description}`);
    }
    if (command.usage) {
      data.push(
        `**Usage:** ${process.env.PREFIX}${command.name} ${
          command.usage as string
        }`,
      );
    }
    await message.channel.send(data.toString());
  },
};

export = help;
