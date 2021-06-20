import { NextFunction, Request, Response } from 'express';

export const errorMiddleWare = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ message: err.message });
};
