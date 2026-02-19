import { AuthUser } from '@/controllers/auth.controller';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authUser: AuthUser;

  constructor() {
    this.authUser = new AuthUser();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.authUser.Register);
  }

  getRouter(): Router {
    return this.router;
  }
}
