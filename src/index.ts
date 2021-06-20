import 'reflect-metadata';
import * as express from 'express';

import { createConnection } from 'typeorm';
import * as morgan from 'morgan';
import { User, userRouter } from '@/user';
import { listRouter } from '@/list';
import { cardRouter } from '@/card';
import { labelRouter } from '@/label';
import { baseConfig } from './config';

const app = express();

const init = async () => {
  const connection = await createConnection();

  app.use(morgan('common'));
  app.use(express.json());

  app.use(userRouter);
  app.use('/list', listRouter);
  app.use('/card', cardRouter);
  app.use('/label', labelRouter);
  app.get('/', (req, res) => {
    const user = new User();
    res.json(user);
  });

  app.listen(baseConfig.port, () => {
    console.log('express server running');
  });
};

init();
