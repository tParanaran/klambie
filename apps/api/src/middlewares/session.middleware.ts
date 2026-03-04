import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export default function SessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let sessionId = req.cookies.sessionId;

  if (!sessionId) {
    sessionId = uuidv4();
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('sessionId', sessionId, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  next();
}
