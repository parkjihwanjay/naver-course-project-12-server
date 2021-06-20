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
import * as jwt from 'express-jwt';
import { baseConfig } from './config';
import { errorMiddleWare } from './middlewares/error';
import { verfiyJwt } from './middlewares/verifyJwt';
import { authConfig } from './config/index';
import { boardAuthCheck, listAuthCheck, cardAuthCheck, labelAuthCheck } from './middlewares/authCheck';

const whiteList = ['*'];
const app = express();

const init = async () => {
  const connection = await createConnection();
  ``;
  app.use(morgan('common'));
  app.use(express.json());
  app.use(
    cors({
      origin: whiteList,
    }),
  );

  // req.user를 자동으로 넣어준다.
  app.use('/board', jwt({ secret: authConfig.jwtSecretKey, algorithms: ['HS256'] }), boardAuthCheck, boardRouter);
  app.use('/list', jwt({ secret: authConfig.jwtSecretKey, algorithms: ['HS256'] }), listAuthCheck, listRouter);
  app.use('/card', jwt({ secret: authConfig.jwtSecretKey, algorithms: ['HS256'] }), cardAuthCheck, cardRouter);
  app.use('/label', jwt({ secret: authConfig.jwtSecretKey, algorithms: ['HS256'] }), labelAuthCheck, labelRouter);
  app.use('/user', userRouter);

  app.use(errorMiddleWare);

  app.listen(baseConfig.port, () => {
    console.log('express server running');
  });
};

init();
