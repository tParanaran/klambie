import { prisma } from 'lib/prisma';
import { Profile } from 'generated/prisma/client';
import GenerateUsername from '@/utils/username';
import { genSalt, hash } from 'bcrypt';

type Register = {
  email: string;
  password: string;
  name: string;
};

export class AuthService {
  async createUser(data: Register): Promise<{ message: string }> {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) throw new Error('User already exists');

    const findRoleUser = await prisma.role.findUnique({
      where: { role: 'Customer' },
    });

    if (!findRoleUser) throw new Error('User not found');

    let username = GenerateUsername();
    let usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    while (userExists) {
      username = GenerateUsername();
      usernameExists = await prisma.user.findUnique({
        where: { username },
      });
    }

    const salt = await genSalt(10);

    const hashPassword = await hash(data.password, salt);

    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashPassword,
          username,
          roleId: findRoleUser.id,
        },
      });

      await prisma.profile.create({
        data: {
          name: data.name,
          userId: user.id,
        },
      });

      return {
        message:
          'Register successfully, please check your email for validation',
      };
    });

    return result;
  }
}
