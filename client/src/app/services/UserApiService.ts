import { User } from './../models/user';
import { NEWS_API, CATEGORY, SORT_BY, API_KEY } from './../HTTP/Rest/Keys/Constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EverythingNews } from '../models/newsEverything';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

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

  getUserInfoById(user: User): Observable<User> {

    return this.http.post<User>('https://agora-gateway-service.herokuapp.com/beta/test', user);

  }

}
