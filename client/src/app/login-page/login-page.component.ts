import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private authService: AuthService) {

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

  get loginInfo() { return this.loginForm.controls; }

  ngOnInit() {
    this.isLoginSection = true;
  }

  resetFields() {
    this.isResetPassword = false;
    this.isSignUpSection = false;
    this.isLoginSection = true;
  }

  here() {
    // here for testing but eventially would be a routerLink
    console.log(this.loginForm.get('email').value);
  }

  forgotPassword() {
    this.isLoginSection = false;
    this.isResetPassword = true;
  }

  signUp() {
    this.isLoginSection = false;
    this.isResetPassword = false;
    this.isSignUpSection = true;
  }

  authenticate() {
  this.authService.validateUser(this.loginInfo.name.value, this.loginInfo.password.value);
  
  }

  navToLanding() {

  }

}
