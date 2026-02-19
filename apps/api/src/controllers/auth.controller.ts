import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services/auth.service';

const authService = new AuthService();

export class AuthUser {
  async Register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.createUser(req.body);
      return res
        .status(200)
        .send('Register successfully, please check your email for validation');
    } catch (error) {
      next(error);
    }
  }
}
