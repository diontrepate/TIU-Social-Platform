import { User } from './../models/user';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class CommonAppService {


    user: User;

    getUser() {
      return this.user;
    }

    setUser(passedUser: User) {
      this.user = passedUser;
    }


    
  }