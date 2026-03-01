export type User = {
  id: number;
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
