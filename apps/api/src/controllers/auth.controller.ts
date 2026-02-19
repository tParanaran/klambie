import { Request, Response, NextFunction } from 'express';
import { RegisterService } from '@/services/register.service';

const registerService = new RegisterService();

export class AuthUser {
  async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService.createUser(req.body);
      return res.status(200).send(result.message);
    } catch (error) {
      next(error);
    }
  }
}
