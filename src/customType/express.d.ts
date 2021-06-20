import User from '@/user/entity';

declare class CustomUser extends User {}

declare global {
  namespace Express {
    interface Request {
      info?: {
        email: string;
        id: string;
      };
      auth?: CustomUser;
    }
  }
}
