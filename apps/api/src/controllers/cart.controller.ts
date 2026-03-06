import { CartService } from '@/services/cart.service';
import { Request, Response, NextFunction } from 'express';

const cartService = new CartService();

export class Cart {
  async addCart(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await cartService.addOrUpdateCart(
        req.body,
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async count(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await cartService.getTotalCart(
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async fetchCart(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await cartService.getCart(
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const result = await cartService.deleteCart(
        Number(productId),
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
