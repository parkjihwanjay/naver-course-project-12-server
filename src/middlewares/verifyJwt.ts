import * as jwt from 'jsonwebtoken';
import { authConfig } from '@/config';
import { NextFunction, Request, Response } from 'express';

export const verfiyJwt = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, authConfig.jwtSecretKey);
    req.decoded = decoded;
  } catch (e) {
    next(e);
  }
};
