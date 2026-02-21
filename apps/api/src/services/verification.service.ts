import SendMail from '@/utils/sendMail';
import { prisma } from 'lib/prisma';

export class VerificationService {
  async verifyUser(email: string): Promise<{ success: boolean }> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });

    return { success: true };
  }
  async resendVerifyUser(data: {
    email: string;
  }): Promise<{ success: boolean; message: string }> {
    const result = await prisma.user.findUnique({
      where: {
        email: data.email,
        AND: [{ isVerified: false }],
      },
      include: {
        profile: true,
      },
    });

    if (!result) throw new Error('User not found');

    const name = !result.profile?.name ? result.email : result.profile.name;

    SendMail(result.email, name);

    return {
      success: true,
      message: `<div>
              <h1 style="font-size: 20px; margin-bottom: 1.25rem;"><b>Woowee! Please verify your email</b></h1>
              <p>You're almost there! We sent an email to</p>
              <p style="margin-bottom: 1.25rem; font-size: 18px;"><b>${result.email}</b></p>
              <p>Just click on the link in that email to complete your sign up. If you don't see it, you may need to check your spam folder</p>
              <p style="margin-bottom: 1.25rem; margin-top: 2.5rem;">Still can't find the email? No problem</p>
          </div>`,
    };
  }
}
