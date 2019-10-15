
export const NEWS_API = 'https://newsapi.org/v2/everything';

// query params ? for beginning
export const CATEGORY = '?q=';
export const SORT_BY = '&sortBy=';

// popularity good option

export const API_KEY = '&apiKey=fa61685a5cc84e189cbf9ca45e5fc466';
export const CORS_PREFIX = 'https://cors-anywhere.herokuapp.com/';

const AUTH_SERVICE_BASE_URI = 'https://tiu-social-auth-service.herokuapp.com';
const AUTH_API_BASE_URI = '/auth/v1/users';

export const SIGN_IN = AUTH_SERVICE_BASE_URI + AUTH_API_BASE_URI + '/sign-in';
export const CONFIRMATION_EMAIL = AUTH_SERVICE_BASE_URI + AUTH_API_BASE_URI + '/email-verification';
export const FORGOT_PASSWORD_EMAIL = AUTH_SERVICE_BASE_URI + AUTH_API_BASE_URI + '/password-reset';
export const SIGN_UP = AUTH_SERVICE_BASE_URI + AUTH_API_BASE_URI + '/register';
