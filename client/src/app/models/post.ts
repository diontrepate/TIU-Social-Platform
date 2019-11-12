import { Comment } from './comment';

export interface Post {
    id: string;
    description: string;
    comments: Comment[];
}