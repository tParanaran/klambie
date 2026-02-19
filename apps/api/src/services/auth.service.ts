import { prisma } from 'lib/prisma';
import { Prisma, User } from 'generated/prisma/client';

export class AuthService {
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    await prisma.$transaction(async (prisma) => {
      const userExists = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (userExists) throw new Error('User already exists');
    });

    return prisma.user.create({ data });
  }
}
