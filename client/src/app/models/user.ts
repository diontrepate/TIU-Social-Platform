import { Post } from './post';
import { Group } from './Group';

export interface User {
    id: string;
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token ?: string;
    newsTopic?: string;
    groups?: Group[];
    posts?: Post[];
    comments?:Comment[];
    majors?: string[];
    interest?: string;
    year?: string;
}
