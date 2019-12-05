import { Post } from './../models/Post';
import { User } from './../models/user';
import { NEWS_API, CATEGORY, SORT_BY, API_KEY, ALL_POSTS, USER_BY_ID, CREATE_POST, POST_USER_DETAILS, DELETE_POST, GET_USER_GROUPS, POST_GROUPS, ALL_GROUPS, DELETE_COMMENT, GET_POST_FROM_GROUPS, JOIN_GROUP, REMOVE_USER_FROM_GROUP } from './../HTTP/Rest/Keys/Constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EverythingNews } from '../models/newsEverything';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Group } from '../models/Group';

@Injectable({
    providedIn: 'root'
})

export class UserApiService extends ApiService {

    constructor(http: HttpClient) {
        super(http);
    }

  getNews(category: string, sortBy: string): Observable<EverythingNews> {
    return this.http.get<EverythingNews>(NEWS_API + CATEGORY + category + SORT_BY + sortBy + API_KEY);
  }

  getUserInfoById(userId: string): Observable<User> {
    return this.http.get<User>(USER_BY_ID + '/' + userId);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(ALL_POSTS);
  }

  createPosts(post: Post): Observable<Post> {
    return this.http.post<Post>(CREATE_POST, post);
  }

  deletePosts(postId: string): Observable<Post> {
    return this.http.delete<Post>(DELETE_POST + postId);
  }

  createGroups(group: Group): Observable<Group> {
    return this.http.post<Group>(POST_GROUPS, group);
  }

  deleteGroup(groupId: string): Observable<Group> {
    return null;
  }

  uploadUserImage(image: User, userId: string): Observable<User> {
    return this.http.put<User>('https://agora-storage-service.herokuapp.com/v1/users/'+ userId, image);
  }

  patchUserDetails(details: User): Observable<User> {
    return this.http.patch<User>(POST_USER_DETAILS + details.uid, details);
  }

  getUserGroups(id: string): Observable<Group[]> {
    return this.http.get<Group[]>(GET_USER_GROUPS + id);
  }

  getGroupPosts(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(GET_POST_FROM_GROUPS + id);
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(ALL_GROUPS);
  }

  deleteComment(commentId: string): Observable<Comment> {
    return this.http.delete<Comment>(DELETE_COMMENT + commentId);
  }

  joinGroup(userIdPojo: User, groupId: string): Observable<User> {
    return this.http.post<User>(JOIN_GROUP + groupId, userIdPojo);
  }

  removeUserFromGroup(groupId: string, userId: string): Observable<User> {
    return this.http.delete<User>(REMOVE_USER_FROM_GROUP + groupId + '?uid=' + userId);
  }
 
}
