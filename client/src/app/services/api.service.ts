import { NEWSAPI, CATEGORY, SORTBY, APIKEY } from './../HTTP/Rest/Keys/Constants/endpoints';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { EverythingNews } from '../models/newsEverything';


export interface Person {

 name: string;
}


@Injectable({
  providedIn: 'root'
})

// This service will be specifically for making rest calls to our server!

export class ApiService {
  constructor(private http: HttpClient) { }

  getNews(category: string, sortBy: string): Observable<EverythingNews> {
    return this.http.get<EverythingNews>(NEWSAPI + CATEGORY + category + SORTBY + sortBy + APIKEY);
  }


  getAllPeople(): Observable<Person> {
    return this.http.get<Person>('http://localhost:3001/api/people');
  }


}
