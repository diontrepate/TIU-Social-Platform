import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isValidated = false;

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


  validateUser(userName: string, password: string): boolean {
    // all this will change instead the toast should be in auth guard and I should only check the 
    // variable isValidated from the auth guard This should just serve as a call to check for status
    if (this.isValidated === false) {

      this.messageService.add({key: 'login', severity: 'error', summary: 'Invalid', detail: 'Wrong Password or Email please try again'});
      return false;
    } else {
    return true;
    }
  }
}
