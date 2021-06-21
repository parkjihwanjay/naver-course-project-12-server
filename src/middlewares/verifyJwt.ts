import * as jwt from 'jsonwebtoken';
import { authConfig } from '@/config';
import { NextFunction, Request, Response } from 'express';
import { findUserByEmail } from '@/CustomUser';

export const verfiyJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization;
  try {
    const { user } = jwt.verify(token, authConfig.jwtSecretKey);
    req.info = {
      email: user.email,
      id: user.id,
    };
    next();
  } catch (e) {
    next(e);
  }
};
