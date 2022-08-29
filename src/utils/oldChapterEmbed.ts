import { EmbedBuilder, EmbedField, HexColorString } from 'discord.js';
import { isUrlString } from 'is-url-online';

type EmbedType = {
  chapterTitle: string;
  thumbnailUrl: string;
  url: string;
  chapterNumber: number;
  novelTitle: string;
  lastUpdatedTimeStamp: Date;
  sourceName: string;
  sourceUrl: string;
  numberOfChaps?: number;
};

export const oldChapterEmbed = ({
  chapterNumber,
  chapterTitle,
  lastUpdatedTimeStamp,
  novelTitle,
  thumbnailUrl,
  url,
  sourceUrl,
  sourceName,
}: EmbedType): EmbedBuilder => {
  const randomColor: HexColorString = `#${Math.floor(
    Math.random() * 16_777_215,
  ).toString(16)}`;

  const isUrl = isUrlString(url);

  const embedFields: EmbedField[] = [
    { name: '#️⃣ Number', value: chapterNumber.toString(), inline: true },
    { name: '🔤 Title', value: `[${chapterTitle}](${url})`, inline: true },
    {
      name: '🏠 Source',
      value: `[${sourceName.charAt(0).toUpperCase()}${sourceName
        .slice(1)
        .toLowerCase()}](${sourceUrl})`,
      inline: true,
    },
  ];

  return new EmbedBuilder()
    .setColor(randomColor)
    .setTitle(`Older Info for ${novelTitle}`)
    .setThumbnail(thumbnailUrl)
    .setURL(isUrl ? url : sourceUrl)
    .addFields(embedFields)
    .setTimestamp(lastUpdatedTimeStamp)
    .setFooter({ text: 'Last Updated' });
};
