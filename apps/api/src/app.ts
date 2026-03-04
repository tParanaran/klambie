import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ErrorMiddleware from './middlewares/error.middleware';
import SessionMiddleware from './middlewares/session.middleware';
import { BASE_WEB_URL, PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { ProductRouter } from './routers/product.router';
import { PromotionRouter } from './routers/promotion.router';
import { AttributeRouter } from './routers/attribute.router';
import { CartRouter } from './routers/cart.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(
      cors({
        origin: BASE_WEB_URL || 'http://localhost:3000',
        credentials: true,
      }),
    );
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    this.app.use(SessionMiddleware);
    const authRouter = new AuthRouter();
    const productRouter = new ProductRouter();
    const attributeRouter = new AttributeRouter();
    const promotionRouter = new PromotionRouter();
    const cartRouter = new CartRouter();
    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/product', productRouter.getRouter());
    this.app.use('/api/attribute', attributeRouter.getRouter());
    this.app.use('/api/promotion', promotionRouter.getRouter());
    this.app.use('/api/cart', cartRouter.getRouter());

    this.app.use(ErrorMiddleware);
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
