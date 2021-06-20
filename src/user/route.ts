import { Request, Response } from 'express';
import * as express from 'express';
// import passport from '@/lib/passport';

const router = express.Router();

// router.get('/auth/login/naver', passport.authenticate('naver'));
router.get('/auth/login/naver/callback', (req, res) => res.json());

export default router;
