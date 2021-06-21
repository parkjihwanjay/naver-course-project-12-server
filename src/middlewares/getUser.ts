import { NextFunction, Request, Response } from 'express';
import User from '@/CustomUser/entity';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { info } = req;
    if (!info) throw new Error();
    const { email } = req.info;
    const checkUser = await User.findOneOrFail(email, { relations: ['boards'] });
    req.auth = checkUser;
    next();
  } catch (e) {
    next(e);
  }
};
