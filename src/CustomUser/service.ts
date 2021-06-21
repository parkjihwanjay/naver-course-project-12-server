import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '@/config';
import CustomUser from './entity';

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

export const signJwt = (user: CustomUser): string => {
  return jwt.sign({ user }, authConfig.jwtSecretKey, { expiresIn: '10 days' });
};

export const findUserByEmail = (email: string): Promise<CustomUser> => {
  return CustomUser.findByEmail(email);
};

export const signup = async (email: string, id: string): Promise<CustomUser> => {
  const user = new CustomUser();
  user.email = email;
  user.id = id;
  await user.save();
  return user;
};
