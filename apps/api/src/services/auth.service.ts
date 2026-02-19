import { prisma } from 'lib/prisma';
import { genSalt, hash } from 'bcrypt';
import GenerateUsername from '@/utils/username';
import path from 'path';
import fs from 'fs';
import { transporter } from '@/lib/mail';

type Register = {
  email: string;
  password: string;
  name: string;
};

export class AuthService {
  async createUser(data: Register): Promise<{ message: string }> {
    const { email, password, name } = data;

    const userExists = await prisma.user.findUnique({
      where: { email },
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

    const hashPassword = await hash(password, salt);

    const templatePath = path.join(
      __dirname,
      '../templates',
      'registerMail.hbs',
    );

    const templateSource = await fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(templateSource);

    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashPassword,
          username,
          roleId: findRoleUser.id,
        },
      });

      await prisma.profile.create({
        data: {
          name,
          userId: user.id,
        },
      });

      const html = compiledTemplate({ name, email });

      await transporter.sendMail({
        to: email,
        subject: 'Registration',
        html: html,
      });

      return {
        message:
          'Register successfully, please check your email for validation',
      };
    });

    return result;
  }
}
