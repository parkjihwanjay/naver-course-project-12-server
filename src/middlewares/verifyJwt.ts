import * as jwt from 'jsonwebtoken';
import { authConfig } from '@/config';
import { NextFunction, Request, Response } from 'express';
import { findUserByEmail } from '@/CustomUser';

export const verfiyJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization;
  try {
    // const result = jwt.verify(token, authConfig.jwtSecretKey);
    // req.info = {
    //   email: 'asdf',
    //   id: 'asdf',
    // };
    // const user = await findUserByEmail('cc6656@naver.com');
    // req.auth = user;
    next();
  } catch (e) {
    next(e);
  }
};
