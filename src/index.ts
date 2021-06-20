import 'reflect-metadata';
import * as express from 'express';

import { createConnection } from 'typeorm';
import * as morgan from 'morgan';
import { User, userRouter } from '@/user';
import { List, listRouter } from '@/list';
import { User } from './entity/User';
import { baseConfig } from './config';

const app = express();

const init = async () => {
  const connection = await createConnection();

  app.use(morgan('common'));
  app.use(express.json());

  app.use(userRouter);
  app.use('/list', listRouter);
  app.get('/', (req, res) => {
    const user = new User();
    res.json(user);
  });

  app.listen(baseConfig.port, () => {
    console.log('express server running');
  });
};

init();
