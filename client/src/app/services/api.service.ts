import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'


export interface Person {

 name: string;
}


@Injectable({
  providedIn: 'root'
})

// This service will be specifically for making rest calls to our server!

export class ApiService {
  constructor(public http: HttpClient) { }

}


