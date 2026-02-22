import { prisma } from 'lib/prisma';
import { genSalt, hash } from 'bcrypt';
import GenerateUsername from '@/utils/username';
import SendMail from '@/utils/sendMail';

type Register = {
  email: string;
  password: string;
  name: string;
};

export class RegisterService {
  async createUser(data: Register): Promise<{ message: string }> {
    const { email, password, name } = data;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) throw new Error('User already exists');

    const findRoleUser = await prisma.role.findUnique({
      where: { role: 'customer' },
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

      const dataMail = {
        email,
        name,
        subject: 'Verification email for your Klambie account',
        htmlPath: 'vertificationMail.hbs',
      };

      SendMail(dataMail);

      return {
        success: true,
        message: `<div>
              <h1 style="font-size: 20px; margin-bottom: 1.25rem;"><b>Woowee! Please verify your email</b></h1>
              <p>You're almost there! We sent an email to</p>
              <p style="margin-bottom: 1.25rem; font-size: 18px;"><b>${email}</b></p>
              <p>Just click on the link in that email to complete your sign up. If you don't see it, you may need to check your spam folder</p>
              <p style="margin-bottom: 1.25rem; margin-top: 2.5rem;">Still can't find the email? No problem</p>
          </div>`,
      };
    });

    return result;
  }
}
