const SUCCESS_STATUS = {
  200: 'ok',
  201: 'created',
  202: 'accepted',
};

const ERROR_STATUS = {
  500: 'internal server error',
  502: 'bad gateway',
};

const AUTH_STATUS = {
  400: 'bad reqeust',
  401: 'unauthorized',
  403: 'forbidden',
};

export const STATUS = {
  ...SUCCESS_STATUS,
  ...ERROR_STATUS,
  ...AUTH_STATUS,
};
