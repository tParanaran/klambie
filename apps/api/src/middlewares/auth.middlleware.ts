import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '@/config';
import { User } from '@/custom';
import { verify } from 'jsonwebtoken';

async function VerificationToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new Error('Woowee! Sorry unauthorized');

    const user = verify(token, SECRET_KEY as string);

    if (!user) throw new Error('Woowee! Sorry expired authorized');

    req.user = user as User;

    next();
  } catch (err) {
    next(err);
  }
}

export { VerificationToken };
