import User from '@/CustomUser/entity';
import { Board } from '@/board';
import { List } from '@/list';
import { Card } from '@/card';
import { Label } from '@/label';

declare class CustomUser extends User {}

declare global {
  namespace Express {
    interface Request {
      info?: {
        email: string;
        id: string;
      };
      auth?: CustomUser;
      board?: Board;
      list?: List;
      card?: Card;
      label?: Label;
    }
  }
}
