import { Post } from './post';

export interface Group {
    id?: string;
    name?: string;
    feed?: string;
    posts?: Post[];
}