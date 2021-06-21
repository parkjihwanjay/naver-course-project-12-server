import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { getNaverProfile, findUserByEmail, signup, signJwt } from './service';

const router = express.Router();

router.get('/naver_auth', async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    const { email, id } = await getNaverProfile(authorization);
    const user = await findUserByEmail(email);
    let finalUser = user;
    if (!finalUser) {
      finalUser = await signup(email, id);
    }
    const jwtToken = signJwt(finalUser);
    res.json({
      finalUser,
      jwtToken,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
