/* eslint-disable no-underscore-dangle */

import { Strategy as NaverStrategy } from 'passport-naver';
import * as passport from 'passport';
import { findUserByEmail, signup } from '@/CustomUser';
import { naverConfig } from '../config';

passport.use(
  new NaverStrategy(
    {
      clientID: naverConfig.clientId,
      clientSecret: naverConfig.secretId,
      callbackURL: naverConfig.callBackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      const _profile = profile._json;
      const email = profile.emails[0].value;
      try {
        const user = await findUserByEmail(email);
        if (user) done(null, user);

        const username = profile.displayName;

        const newUser = await signup(email, username);
        return done(null, newUser);
      } catch (e) {
        console.log(e);
      }
    },
  ),
);

export default passport;
