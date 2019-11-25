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
  forgotPasswordForm: FormGroup;
  signUpForm: FormGroup;

  isLoginSection: boolean;
  isResetPassword: boolean;
  isSignUpSection: boolean;
  isPassordEmailSent: boolean;
  isJustRegistered: boolean;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private messageService: MessageService) {
    // will work on REGEX for password soon
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['',  [Validators.required, Validators.minLength(5)]],
      confirmPass: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  userAuth: Auth;

  ngOnInit() {
    this.isLoginSection = true;
  }

  forgotPasswordEmail() {

    this.userAuth = {
      email: this.forgotPasswordForm.get('email').value,
    };
    this.authService.sendPasswordResetEmail(this.userAuth).subscribe( emailSent => {
      this.forgotPasswordForm.reset();
      this.isResetPassword = false;
      this.isPassordEmailSent = true;
    },
    err => {
      this.forgotPasswordForm.reset();
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
      if (isFirstTime) {
      this.navToPreLanding(userAuthPacket.uid);
      } else {
        this.navToLanding(userAuthPacket.uid);
      }
    },

    err => {
      console.log(err);
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
  navToPreLanding(userId: string) {
    this.router.navigate(['/preLanding', userId]);
  }






  }
