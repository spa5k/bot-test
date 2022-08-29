/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { GiphyFetch } from '@giphy/js-fetch-api';
import 'discord.js';
import type {
  CommandInteraction,
  Message,
  PermissionResolvable,
  SlashCommandBuilder,
} from 'discord.js';
import { Page } from 'puppeteer';

declare module 'discord.js' {
  export interface Client {
    commands: Collection<unknown, NormalCommand>;
    events: Collection<unknown, Event>;
    slashCommands: Collection<unknown, SlashCommand>;
  }
}

type NormalCommand = {
  name: string;
  description: string;
  permission: PermissionResolvable;
  usage: string | string[];
  execute: (
    message: Message,
    args: string[],
    command: string,
    client: Client,
    giphy: GiphyFetch,
    page?: Page,
  ) => SomeType; // Can be `Promise<SomeType>` if using async
};

type SlashCommand = {
  data: SlashCommandBuilder;
  name: string;
  permission: Permissioniesolvable;
  execute: (
    interaction: CommandInteraction,
    client: Client,
    giphy: GiphyFetch,
    page?: Page,
  ) => SomeType; // Can be `Promise<SomeType>` if using async
};

type NovelSlashCommand = {
  permission: Permissioniesolvable;
  name: string;

  execute: (
    interaction: CommandInteraction,
    client: Client,
    giphy: GiphyFetch,
    page?: Page,
  ) => SomeType; // Can be `Promise<SomeType>` if using async
};
