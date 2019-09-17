import { User } from './../models/user';
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

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private messageService: MessageService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.forgotPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.signUpForm = this.fb.group({
      name: ['', Validators.required, Validators.minLength(3)],
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['',  [Validators.required, Validators.minLength(10)]],
      confirmPass: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  userAuth: Auth;

  get loginInfo() { return this.loginForm.controls; }

  ngOnInit() {
    this.isLoginSection = true;
  }

  

  here() {
    // here for testing but eventially would be a routerLink
  }

  login() {
    this.userAuth = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.authService.validateUser(this.userAuth).subscribe(userAuth => {
      console.log(userAuth, + '' + 'Login Successful');
      this.authService.isValidated = true;
      this.navToLanding(userAuth.uid);
    },

    err => (
      this.authService.isValidated = false,
      console.log(err),
      this.messageService.add({key: 'login', severity: 'error', summary: 'Invalid', detail: 'Wrong Password or Email please try again'})
    ));

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
  }


  navToLanding(userId: string) {
    this.router.navigate(['/landing', userId]);

  }






  }
