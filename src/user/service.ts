import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '@/config';

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

export const signJwt = (email: string): string => {
  return jwt.sign({ email }, authConfig.jwtSecretKey);
};
