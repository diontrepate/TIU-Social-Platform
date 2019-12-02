import { MessageService } from 'primeng/api';
import { Auth } from './../models/authModel';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})

export class SignUpPageComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private messageService: MessageService) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['',  [Validators.required, Validators.minLength(5)]],
      confirmPass: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  userAuth: Auth;

  ngOnInit() { }

  verifySignUp() {
    if (this.signUpForm.get('password').value !== this.signUpForm.get('confirmPass').value) {
      this.signUpForm.reset();

      return this.messageService.add({key: 'login', severity: 'error', summary: 'Invalid', detail: 'Passwords do not match. Please try again.'});
    }

    this.userAuth = {
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
    };

    this.callAuth(this.userAuth, true);
  }

  callAuth(userAuth: Auth, isFirstTime: boolean) {

    this.authService.validateUser(this.userAuth, isFirstTime).subscribe(userAuthPacket => {
      this.authService.isValidated = true;
      this.navToPreLanding(userAuthPacket.uid);
    },
    err => {
      console.log(err);
      this.signUpForm.reset(),
      this.authService.isValidated = false;
      return this.messageService.add({key: 'login', severity: 'error', summary: 'Invalid', detail: 'Email is already in use.'});
    });
  }

  navToPreLanding(userId: string) {
    this.router.navigate(['/preLanding', userId]);
  }

}

