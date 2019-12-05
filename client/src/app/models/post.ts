import { Comment } from './comment';

export interface Post {
    postId?: string;
    storageItem?: string;
    uid?: string;
    firstName?: string;
    lastName?: string;
    postIdList?: string[];
    bodyText?: string;
    groupId?: string;
    dateCreated?: string;
    comments?: Comment[];
    }