import 'reflect-metadata';
import * as express from 'express';

import { createConnection } from 'typeorm';
import * as morgan from 'morgan';
import { User, userRouter } from '@/CustomUser';
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
import { getUser } from './middlewares/getUser';

const app = express();
const expressJwtOption = { secret: authConfig.jwtSecretKey, algorithms: ['HS256'], requestProperty: 'info' };

const init = async () => {
  const connection = await createConnection();
  app.use(morgan('common'));
  app.use(express.json());
  app.use(cors());

  // req.user를 자동으로 넣어준다.
  app.use('/board', verfiyJwt, getUser, boardAuthCheck, boardRouter);

  app.use('/list', verfiyJwt, getUser, listAuthCheck, listRouter);
  app.use('/card', verfiyJwt, getUser, cardAuthCheck, cardRouter);
  app.use('/label', verfiyJwt, getUser, labelAuthCheck, labelRouter);
  app.use('/user', userRouter);

  app.use(errorMiddleWare);

  app.listen(baseConfig.port, () => {
    console.log('express server running');
  });
};

init();
