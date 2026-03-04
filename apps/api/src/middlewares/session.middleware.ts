import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export default function SessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token && !req.cookies.sessionId) {
    const sessionId = uuidv4();
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('sessionId', sessionId, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  next();
}
