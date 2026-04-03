import SendMail from '@/utils/sendMail';
import { prisma } from '../../lib/prisma';

export class VerificationService {
  async verifyUser(email: string): Promise<{ success: boolean }> {
    const result = await prisma.$transaction(async (prisma) => {
      const verified = await prisma.user.update({
        where: {
          email,
        },
        data: {
          isVerified: true,
        },
        include: {
          profile: true,
        },
      });

      if (!verified) throw new Error('User not found');

      if (verified.referredBy) {
        const findRefferal = await prisma.user.findUnique({
          where: {
            username: verified.referredBy,
          },
        });

        if (findRefferal) {
          const expiredDate = new Date();
          expiredDate.setMonth(expiredDate.getMonth() + 3);
          expiredDate.toISOString();

          await prisma.userPoint.create({
            data: {
              userId: findRefferal.id,
              validUntil: expiredDate,
              type: 'EARN',
              amount: 10000,
            },
          });

          const coupon = await prisma.promotion.findUnique({
            where: {
              code: 'REFF10FF',
            },
          });

          if (!coupon) throw new Error('Coupon not found');

          await prisma.userPromotion.create({
            data: {
              promotionId: coupon.id,
              userId: verified.id,
              expiresAt: expiredDate,
            },
          });
        }
      }

      const dataMail = {
        email: verified.email,
        name: verified?.profile?.name || verified.email,
        subject: 'Klambie account verified',
        htmlPath: 'verifySuccessMail.hbs',
      };

      await SendMail(dataMail);

      return { success: true };
    });

    return result;
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

    const dataMail = {
      email: result.email,
      name,
      subject: 'Verification email for your Klambie account',
      htmlPath: 'vertificationMail.hbs',
    };

    await SendMail(dataMail);

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
