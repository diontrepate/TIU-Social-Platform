import { SIGN_IN, SIGN_UP, FORGOT_PASSWORD_EMAIL } from './../HTTP/Rest/Keys/Constants/endpoints';
import { Auth } from './../models/authModel';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private messageService: MessageService, private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

    // Want this to be an observable so we can have other component act reactant upon its value
    this.currentUser = this.currentUserSubject.asObservable();

   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
   }
  // need to use Behavior subject to hold on to values for all components to use



  validateUser(userAuth: Auth, isFirstTime: boolean): Observable<Auth> {
    if (isFirstTime) {
      localStorage.setItem('validated', 'true');
      return this.http.post<Auth>(SIGN_UP, userAuth);
    }
    localStorage.setItem('validated', 'true');
    return this.http.post<Auth>(SIGN_IN, userAuth);
  }

  checkStorage(): boolean {
    if (localStorage.getItem('validated') === 'true') {
      return true;
    } else {
    return false;
    }
  }

  clearStorage() {
    localStorage.clear();
  }


  sendPasswordResetEmail(userAuth: Auth): Observable<Auth> {
    return this.http.post<Auth>(FORGOT_PASSWORD_EMAIL , userAuth);
  }

}
