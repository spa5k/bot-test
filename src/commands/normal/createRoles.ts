import { NormalCommand } from '../../types/discord';
import { createRolesHelper } from '../../utils/createRolesHelper';

// Now `command` is strictly typed to `Command` interface
const createRoles: NormalCommand = {
  name: 'create-roles',
  description: 'Create Roles for Novels',
  permission: 'Administrator',

  usage: '',
  async execute(message) {
    await createRolesHelper(message);
  },
};
export = createRoles;
