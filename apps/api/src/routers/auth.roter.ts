import { AuthUser } from '@/controllers/auth.controller';
import { VerificationToken } from '@/middlewares/auth.middlleware';
import {
  EmailValidation,
  RegisterValidation,
} from '@/middlewares/validations/auth.validation';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authUser: AuthUser;

  constructor() {
    this.authUser = new AuthUser();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', RegisterValidation, this.authUser.Register);
    this.router.get(
      '/verification',
      VerificationToken,
      this.authUser.Verification,
    );
    this.router.post(
      '/resend',
      EmailValidation,
      this.authUser.ResendVerification,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
