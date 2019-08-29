import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

export interface Person {

 name: string;
}
@Injectable({
  providedIn: 'root'
})

// This service will be specifically for making rest calls to our server!

export class ApiService {
  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<Person> {
    return this.http.get<Person>('http://localhost:8000/api/people');
  }


}
