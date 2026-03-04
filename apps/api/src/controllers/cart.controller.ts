import { CartService } from '@/services/cart.service';
import { Request, Response, NextFunction } from 'express';

const cartService = new CartService();

export class Cart {
  async addCart(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await cartService.addOrUpdateCart(
        req.body,
        req.user?.id,
        req.cookies.sessionId,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async fetchCart(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await cartService.getCart(
        req.user?.id,
        req.cookies.sessionId,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
