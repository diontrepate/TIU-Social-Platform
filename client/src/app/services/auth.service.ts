import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isValidated: boolean = false;

  constructor(private messageService: MessageService) { }

  validateUser(): boolean {
    if(this.isValidated === false){
      this.messageService.add({key: 'login', severity: 'error', summary: 'Invalid', detail: 'Wrong Password or Email please try again'});
      return false;
    } else 
    return true;
  }
}
