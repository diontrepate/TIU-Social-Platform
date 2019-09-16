import { NEWSAPI, CATEGORY, SORTBY, APIKEY } from './../HTTP/Rest/Keys/Constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EverythingNews } from '../models/newsEverything';
import { ApiService, Person } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
export class UserApiService extends ApiService {

    constructor(http: HttpClient) {
        super(http);
      }

  getNews(category: string, sortBy: string): Observable<EverythingNews> {
    return this.http.get<EverythingNews>(NEWSAPI + CATEGORY + category + SORTBY + sortBy + APIKEY);
  }
  getAllPeople(): Observable<Person> {
    return this.http.get<Person>('http://localhost:3001/api/people');
  }
 
}
