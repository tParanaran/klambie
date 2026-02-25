import { CategoryService } from '@/services/category.service';
import { Request, Response, NextFunction } from 'express';

const categoryService = new CategoryService();

export class Category {
  async generateHierarchy(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.createHierarchy(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
