import { GuildMemberRoleManager, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/discord';

const roles: SlashCommand = {
  name: 'roles',
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Get or leave the roles for chapter notifications'),
  permission: 'SEND_MESSAGES',

  execute: async (interaction) => {
    const user = interaction.member;
    const userRoles = user?.roles as GuildMemberRoleManager;

    interaction.options.data.forEach(async (role) => {
      if (role.name === 'get') {
        userRoles.add(role?.value as string);
        interaction.reply('Added the role');
      } else if (role.name === 'remove') {
        userRoles.remove(role?.value as string);
        interaction.reply('Removed the role');
      }
    });
  },
};

export = roles;
