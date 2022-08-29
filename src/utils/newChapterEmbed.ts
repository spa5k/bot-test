import { EmbedBuilder, EmbedField, HexColorString } from 'discord.js';
import { isUrlString } from 'is-url-online';

type EmbedType = {
  chapterTitle: string;
  thumbnailUrl: string;
  url: string;
  chapterNumber: number;
  novelTitle: string;
  updatedAtTimeStamp: Date;
  sourceName: string;
  sourceUrl: string;
  numberOfChaps: number;
};

export const newChapterEmbed = ({
  chapterNumber,
  chapterTitle,
  updatedAtTimeStamp,
  novelTitle,
  thumbnailUrl,
  url,
  sourceUrl,
  sourceName,
  numberOfChaps,
}: EmbedType): EmbedBuilder => {
  const randomColor: HexColorString = `#${Math.floor(
    Math.random() * 16_777_215,
  ).toString(16)}`;

  const isUrl = isUrlString(url);

  const fields: EmbedField[] = [
    {
      name: '#️⃣ Number',
      value: chapterNumber.toString(),
      inline: true,
    },
    {
      name: '🔤 Title',
      value: `[${chapterTitle}](${url})`,
      inline: false,
    },
    {
      name: '🏠 Source',
      value: `[${sourceName.charAt(0).toUpperCase()}${sourceName
        .slice(1)
        .toLowerCase()}](${sourceUrl})`,
      inline: false,
    },
  ];

  if (numberOfChaps > 1) {
    fields.unshift({
      name: '1️⃣ Number of New Chapters',
      value: numberOfChaps.toString(),
      inline: true,
    });
  }

  return new EmbedBuilder()
    .setColor(randomColor)
    .setTitle(novelTitle)
    .setThumbnail(thumbnailUrl)
    .setURL(isUrl ? url : sourceUrl)
    .addFields(fields)
    .setTimestamp(updatedAtTimeStamp)
    .setFooter({ text: 'Last Updated' });
};
