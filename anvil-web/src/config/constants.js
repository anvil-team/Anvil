export const RESPONSE_STATUS = {
  FAILED: 0,
  SUCCESS: 1,
};

export const HTTP_STATUS_CODE = {
  NO_PERMISSIONS: 403,
};

export const BASE_URL = process.env.BASEURL || '/api';
export const API_VERSION = process.env.API_VERSION || 'v1';

export const isAccessible = {
  NOTALLOW_ACCESS: 'NOTALLOW_ACCESS',
  ALLOW_ACCESS: 'ALLOW_ACCESS',
};

export const errorIncome = {
  axiosResponse: 'axios-response',
  axiosRequest: 'axios-request',
};
