
export const NEWS_API = 'https://newsapi.org/v2/everything';

// query params ? for beginning
export const CATEGORY = '?q=';
export const SORT_BY = '&sortBy=';

// popularity good option

export const API_KEY = '&apiKey=fa61685a5cc84e189cbf9ca45e5fc466';
// export const CORS_PREFIX = 'https://cors-anywhere.herokuapp.com/';

const GATEWAY_SERVICE_BASE_URI = 'https://agora-gateway-service.herokuapp.com/v1';
const USERS_BASE_URI = '/users';

export const SIGN_IN = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI + '/sign-in';
export const CONFIRMATION_EMAIL = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI + '/account-verification';
export const FORGOT_PASSWORD_EMAIL = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI + '/password-reset';
export const SIGN_UP = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI + '/register';
