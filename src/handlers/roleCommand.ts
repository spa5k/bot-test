/* eslint-disable no-param-reassign */
import { Client } from 'discord.js';
import roles from '../novelCommand/roles';

export const roleSlashCommandHandler = async (client: Client) => {
  const singleCommand = roles;

  client.slashCommands.set('roles', singleCommand);
};
