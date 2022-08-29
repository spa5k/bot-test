import { SlashCommandBuilder } from '@discordjs/builders';

export const slashCommand = (
  name: string,
  description: string,
): SlashCommandBuilder =>
  new SlashCommandBuilder().setName(name).setDescription(description);
