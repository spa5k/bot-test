import { Client, EmbedBuilder, TextChannel } from 'discord.js';

type RolePing = {
  roleId: string | null;
  channelId: string;
  client: Client;
  embed: EmbedBuilder;
};

export const pingForUpdate = async ({
  channelId,
  roleId,
  client,
  embed,
}: RolePing): Promise<boolean> => {
  const channelToSend = client.channels.cache.get(channelId) as TextChannel;
  if (channelToSend) {
    const tag = roleId ? `<@&${roleId}>` : '';
    await channelToSend.send({ content: tag, embeds: [embed] });
  }
  return true;
};
