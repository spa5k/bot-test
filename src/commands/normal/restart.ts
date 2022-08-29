import { NormalCommand } from '../../types/discord';

const restart: NormalCommand = {
  name: 'restart',
  description: 'Restart the bot',
  permission: 'Administrator',

  usage: [],
  async execute(message) {
    await message.channel.send('Restarting, hurrrrrrrrrrrrr');
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  },
};

export = restart;
