import { PromoService } from '@/services/promo.service';
import { Request, Response, NextFunction } from 'express';

const promoService = new PromoService();

export class Promotion {
  async createNewPromo(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await promoService.createPromo(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
