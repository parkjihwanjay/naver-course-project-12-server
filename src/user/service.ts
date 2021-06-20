import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '@/config';
import { User } from './entity';

const apiUrl = {
  naver: {
    getProfile: 'https://openapi.naver.com/v1/nid/me',
  },
};

export const getNaverProfile = async (token: string): Promise<{ email: string; id: string }> => {
  const header = `Bearer ${token}`;
  const profile = await axios.get(apiUrl.naver.getProfile, {
    headers: {
      Authorization: header,
    },
  });
  const { email, id } = profile.data.response;
  return { email, id };
};

export const signJwt = (user: User): string => {
  return jwt.sign({ user }, authConfig.jwtSecretKey);
};

export const findUserByEmail = (email: string): Promise<User> => {
  return User.findByEmail(email);
};

export const signup = async (email: string, id: string): Promise<User> => {
  const user = new User();
  user.email = email;
  user.id = id;
  await user.save();
  return user;
};
