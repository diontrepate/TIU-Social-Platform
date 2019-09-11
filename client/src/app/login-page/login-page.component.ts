import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = true;
  constructor(private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  here(){
    console.log(this.loginForm.get('email').value);
  }
}
