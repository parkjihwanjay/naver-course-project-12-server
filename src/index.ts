import 'reflect-metadata';
import * as express from 'express';

import { createConnection } from 'typeorm';
import * as morgan from 'morgan';
import { User, userRouter } from '@/user';
// import { User } from './entity/User';
import * as cors from 'cors';
import { baseConfig } from './config';
import { errorMiddleWare } from './middlewares/error';

const whiteList = ['*'];
const app = express();

const init = async () => {
  const connection = await createConnection();

  app.use(morgan('common'));
  app.use(cors());
  app.use(userRouter);
  app.use(errorMiddleWare);

  app.listen(baseConfig.port, () => {
    console.log('express server running');
  });
};

init();
