export const baseConfig = {
  port: 3000,
};

export const authConfig = {
  clientId: 'BcmS2m0jhTnXRfQzxYWk',
  secretId: 'IfmkcEKED6',
  callBackUrl: `http://127.0.0.1:${baseConfig.port}/auth/login/naver/callback`,
};
