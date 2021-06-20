import * as jwt from 'jsonwebtoken';
import { authConfig } from '@/config';
import { NextFunction, Request, Response } from 'express';
import { findUserByEmail } from '@/user';

export const verfiyJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization;
  try {
    const email = jwt.verify(token, authConfig.jwtSecretKey);
    const user = await findUserByEmail(email);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
