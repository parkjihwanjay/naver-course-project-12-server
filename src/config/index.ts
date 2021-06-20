export const baseConfig = {
  port: 1000,
};

export const naverConfig = {
  clientId: 'BcmS2m0jhTnXRfQzxYWk',
  secretId: 'IfmkcEKED6',
  callBackUrl: `http://127.0.0.1:${baseConfig.port}/auth/login/naver/callback`,
};

export const authConfig = {
  jwtSecretKey: 'trello 12 fighting12',
};
