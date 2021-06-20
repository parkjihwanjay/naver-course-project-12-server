import 'reflect-metadata';
import * as express from 'express';

import { createConnection } from 'typeorm';
import * as morgan from 'morgan';
import { User, userRouter } from '@/user';
// import { User } from './entity/User';
import { baseConfig } from './config';

const app = express();

const init = async () => {
  const connection = await createConnection();

  app.use(morgan('common'));

  app.use(userRouter);

  app.get('/', (req, res) => {
    const user = new User();
    res.json(user);
  });

  app.listen(baseConfig.port, () => {
    console.log('express server running');
  });
};

init();
