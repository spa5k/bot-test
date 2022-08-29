import { HexColorString, Message, Role } from 'discord.js';
import { db } from '../prisma';

export const createRolesHelper = async (message: Message<boolean>) => {
  const roles: Record<string, string> = {};

  const novelRoles = await db.novel.findMany({
    select: {
      id: true,
      slug: true,
      sources: {
        select: {
          id: true,
          roleId: true,
          source: true,
          sourceUrl: true,
        },
      },
    },
  });

  message.guild?.roles.cache
    .sort((a, b) => b.position - a.position)
    .forEach((role) => {
      roles[role.name] = role.id;
    });

  try {
    novelRoles.forEach((novel) => {
      novel.sources.forEach(async (source) => {
        const roleName = `${novel.slug.toUpperCase()}-${source.source.toUpperCase()}`;

        const randomColor: HexColorString = `#${Math.floor(
          Math.random() * 16_777_215,
        ).toString(16)}`;

        // This gets the latest role ids and update all roles
        // to make sure none of them have old ids mentioned in db
        if (roles[roleName]) {
          await db.source.update({
            where: {
              id: source.id,
            },
            data: {
              roleId: roles[roleName],
            },
          });
        } else {
          let createdRole: Role | undefined;
          try {
            createdRole = await message.guild?.roles.create({
              color: randomColor,
              name: roleName,
            });
            console.log('created role', createdRole);
          } catch (error) {
            console.log('role error', error);
          }

          if (createdRole) {
            try {
              await db.source.update({
                where: {
                  id: source.id,
                },
                data: {
                  roleId: createdRole.id,
                },
              });
            } catch (err) {
              // delete the created role if fail
              console.log('err while updating', err);
              createdRole.delete();
            }
          }
          await message.channel.send(`Role created fer  **${roleName}**`);
        }
      });
    });
  } catch (err) {
    console.log('err while creating roles', err);
  } finally {
    const msg = await message.channel.send('Roles updated.');

    if (msg) {
      setTimeout(() => {
        process.exit(1);
      }, 30_000);
    }
  }
};
