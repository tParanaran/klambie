import { Request, Response, NextFunction } from 'express';
import { RegisterService } from '@/services/register.service';
import { VerificationService } from '@/services/verification.service';
import { User } from '@/custom';
import { LoginService } from '@/services/login.service';
import { CartService } from '@/services/cart.service';

const registerService = new RegisterService();
const verificationService = new VerificationService();
const loginService = new LoginService();
const cartService = new CartService();

export class AuthUser {
  async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService.createUser(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async Verification(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.user as User;

      const result = await verificationService.verifyUser(email);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async ResendVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await verificationService.resendVerifyUser(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService.userEnter(req.body);
      const { adjustments } = await cartService.mergeCart(
        result.id,
        req.cookies.sessionId,
      );

      console.log(adjustments);

      return res
        .status(200)
        .cookie('access_token', result.token)
        .clearCookie('sessionId')
        .send({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
