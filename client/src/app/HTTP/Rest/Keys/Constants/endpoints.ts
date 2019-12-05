
export const NEWS_API = 'https://newsapi.org/v2/everything';

// query params ? for beginning
export const CATEGORY = '?q=';
export const SORT_BY = '&sortBy=';

// popularity good option

export const API_KEY = '&apiKey=fa61685a5cc84e189cbf9ca45e5fc466';
// export const CORS_PREFIX = 'https://cors-anywhere.herokuapp.com/';

const GATEWAY_SERVICE_BASE_URI = 'https://agora-gateway-service.herokuapp.com/v1';
const USERS_BASE_URI = '/users';
const POSTS_BASE_URI = '/posts';
const GROUPS_BASE_URI = '/groups';
const COMMENTS_BASE_URI = '/comments';

export const SIGN_IN = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI + '/sign-in';
export const CONFIRMATION_EMAIL = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI + '/account-verification';
export const FORGOT_PASSWORD_EMAIL = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI + '/password-reset';
export const SIGN_UP = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI;

export const ALL_POSTS = GATEWAY_SERVICE_BASE_URI + POSTS_BASE_URI;
export const USER_BY_ID = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI;
export const CREATE_POST = GATEWAY_SERVICE_BASE_URI + POSTS_BASE_URI;
export const POST_USER_DETAILS = GATEWAY_SERVICE_BASE_URI + USERS_BASE_URI + '/';
export const DELETE_POST = GATEWAY_SERVICE_BASE_URI + POSTS_BASE_URI + '/';
export const GET_USER_GROUPS = GATEWAY_SERVICE_BASE_URI + GROUPS_BASE_URI + '?uid=';
export const POST_GROUPS = GATEWAY_SERVICE_BASE_URI + GROUPS_BASE_URI;
export const GET_POST_FROM_GROUPS = GATEWAY_SERVICE_BASE_URI + POSTS_BASE_URI + '?groupId=';
export const DELETE_GROUP = GATEWAY_SERVICE_BASE_URI + GROUPS_BASE_URI + '/';
export const ALL_GROUPS = GATEWAY_SERVICE_BASE_URI + GROUPS_BASE_URI;
export const DELETE_COMMENT = GATEWAY_SERVICE_BASE_URI + COMMENTS_BASE_URI + '/';
export const JOIN_GROUP = GATEWAY_SERVICE_BASE_URI + GROUPS_BASE_URI + '/';
export const REMOVE_USER_FROM_GROUP = GATEWAY_SERVICE_BASE_URI + GROUPS_BASE_URI + '/';