import { NextFunction, Request, Response } from 'express';
import User from '@/user/entity';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // const { info } = req;
    // if (!info) throw new Error();
    // const email = 'cc6656@naver.com';
    // // const checkUser = await User.findOneOrFail(info.email);
    // const checkUser = await User.findOneOrFail(email);
    // req.auth = checkUser;
    next();
  } catch (e) {
    next(e);
  }
};
