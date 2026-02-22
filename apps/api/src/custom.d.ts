export type User = {
  email: string;
  name: string;
  role: number;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
