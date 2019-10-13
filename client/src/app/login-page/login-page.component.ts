import { MessageService } from 'primeng/api';
import { Auth } from './../models/authModel';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  forgotPassForm: FormGroup;
  signUpForm: FormGroup;

  isLoginSection: boolean;
  isResetPassword: boolean;
  isSignUpSection: boolean;
  isPassordEmailSent: boolean;
  isJustRegistered: boolean;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private messageService: MessageService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.forgotPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['',  [Validators.required, Validators.minLength(10)]],
      confirmPass: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  userAuth: Auth;

  ngOnInit() {
    this.isLoginSection = true;
  }

  forgotPassEmail() {

    this.userAuth = {
      email: this.forgotPassForm.get('email').value,
    };
    this.isPassordEmailSent = true;

    this.authService.sendConfEmailForPass(this.userAuth).subscribe( emailSent => {
    this.forgotPassForm.reset();
    this.isPassordEmailSent = true;
    return this.messageService.add({key: 'login', severity: 'success', summary: 'Email Sent', detail: 'Email confirmation email has been sent'});

    },
    err => {
      this.forgotPassForm.reset();
      return this.messageService.add({key: 'login', severity: 'error', summary: 'Error', detail: 'An internal error has occurred'});
  }
    );

  }

  verifyLogin() {
      this.userAuth = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      this.callAuth(this.userAuth, false);
    }

  verifySignUp() {
    if (this.signUpForm.get('password').value !== this.signUpForm.get('confirmPass').value) {
      this.signUpForm.reset();

      return this.messageService.add({key: 'login', severity: 'error', summary: 'Invalid', detail: 'Passwords do not match please try again'});
    }

    this.userAuth = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
      firstName: this.loginForm.get('firstName').value,
      lastName: this.loginForm.get('lastName').value,
    };

    this.callAuth(this.userAuth, true);
  }

  callAuth(userAuth: Auth, isFirstTime: boolean) {

    this.authService.validateUser(this.userAuth, isFirstTime).subscribe(userAuthPacket => {

      this.authService.isValidated = true;
      if (isFirstTime) {
        // will include the pre landing page to ask users what their interests are
      }
      this.navToLanding(userAuthPacket.uid);
    },

    err => {
      this.signUpForm.reset(),
      this.loginForm.reset(),

      this.authService.isValidated = false;

      if (isFirstTime === true) {
        return this.messageService.add({key: 'login', severity: 'error', summary: 'Invalid', detail: 'That email is in use'});
      }
      return this.messageService.add({key: 'login', severity: 'error', summary: 'Invalid', detail: 'Wrong Password or Email please try again'});
  });
  }

  forgotPassword() {
    this.isLoginSection = false;
    this.isSignUpSection = false;
    this.isResetPassword = true;
  }

  signUp() {
    this.isLoginSection = false;
    this.isResetPassword = false;
    this.isSignUpSection = true;
  }

  resetFields() {
    this.isResetPassword = false;
    this.isSignUpSection = false;
    this.isLoginSection = true;
    this.isPassordEmailSent = false;

  }


  navToLanding(userId: string) {
    this.router.navigate(['/landing', userId]);
  }






  }
