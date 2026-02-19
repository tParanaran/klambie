import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services/auth.service';
import { prisma } from 'lib/prisma';

const authService = new AuthService();

export class AuthUser {
  async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.createUser(req.body);
      return res.status(200).send(result.message);
    } catch (error) {
      next(error);
    }
  }
}
