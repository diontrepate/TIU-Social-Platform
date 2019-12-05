import { Post } from './Post';

export interface Group {
    groupId?: string;
    name?: string;
    newsInterests?: string[];
    posts?: Post[];
    adminIdList?: string[];
}