import 'reflect-metadata';
import * as express from 'express';

import { createConnection } from 'typeorm';
import * as morgan from 'morgan';
import { User, userRouter } from '@/user';
// import { User } from './entity/User';
import * as cors from 'cors';
import { Board, boardRouter } from '@/board';
import { listRouter } from '@/list';
import { cardRouter } from '@/card';
import { labelRouter } from '@/label';
import { baseConfig } from './config';
import { errorMiddleWare } from './middlewares/error';
import { verfiyJwt } from './middlewares/verifyJwt';
import { boardAuthCheck, listAuthCheck, cardAuthCheck, labelAuthCheck } from './middlewares/authCheck';

const whiteList = ['*'];
const app = express();

const init = async () => {
  const connection = await createConnection();

  app.use(morgan('common'));
  app.use(express.json());
  app.use(
    cors({
      origin: whiteList,
    }),
  );

  app.use('/board', verfiyJwt, boardAuthCheck, boardRouter);
  app.use('/list', verfiyJwt, listAuthCheck, listRouter);
  app.use('/card', verfiyJwt, cardAuthCheck, cardRouter);
  app.use('/label', verfiyJwt, labelAuthCheck, labelRouter);
  app.use('/user', userRouter);

  app.use(errorMiddleWare);

  app.listen(baseConfig.port, () => {
    console.log('express server running');
  });
};

init();
