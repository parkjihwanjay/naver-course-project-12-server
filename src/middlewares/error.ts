import { NextFunction, Request, Response } from 'express';

export const errorMiddleWare = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(400).json({
    message: err.message,
    statusCode: 400,
  });
};
