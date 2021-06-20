import 'reflect-metadata';
import * as express from 'express';

import { createConnection } from 'typeorm';
import { User } from './entity/User';

const app = express();
const port = 3000;

const init = async () => {
  const connection = await createConnection();

  app.get('/', (req, res) => {
    const user = new User();
    res.json(user);
  });

  app.listen(port, () => {
    console.log('express server running');
  });
};

init();
