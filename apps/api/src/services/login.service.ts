import { SECRET_KEY } from '@/config';
import SendMail from '@/utils/sendMail';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from 'lib/prisma';

type Login = {
  email: string;
  password: string;
};

export class LoginService {
  async userEnter(data: Login): Promise<{ token: string }> {
    const { email, password } = data;

    const findUser = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
        profile: true,
      },
    });

    if (!findUser)
      throw new Error('Woowee! Please check your email and password.');

    if (!findUser.isVerified) {
      const name = !findUser.profile?.name
        ? findUser.email
        : findUser.profile.name;

      const dataMail = {
        email: findUser.email,
        name,
        subject: 'Verification email for your Klambie account',
        htmlPath: 'vertificationMail.hbs',
      };

      await SendMail(dataMail);

      throw new Error(
        'Woowee! We already sent you an email, Please verify your email to be able to start shopping.',
      );
    }

    const isValid = await compare(password, findUser.password);

    if (!isValid)
      throw new Error(
        'Woowee! We couldn’t sign you in. Please verify your credentials and try again.',
      );

    const payload = {
      email,
      username: findUser.username,
      name: findUser.profile?.name,
      role: findUser.role.id,
    };

    const token = sign(payload, SECRET_KEY as string, { expiresIn: '1d' });

    return { token };
  }
}
