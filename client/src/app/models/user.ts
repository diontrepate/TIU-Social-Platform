import { Post } from './post';
import { Group } from './Group';

export interface User {
    uid?: string;
    storageItem?: string;
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token ?: string;
    newsInterests?: string[];
    groupIdList?: string[];
    group?: Group[];
    posts?: Post[];
    comments?: Comment[];
    majors?: string[];
    interest?: string;
    academicYear?: string;
}
