import {FormControl, Validators} from '@angular/forms';
import {LoginErrorStateMatcher} from './login-error-state-matcher';
import {Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.css']
})
export class AppLoginComponent {
  title = 'Login Page';
  usernameFormControl: FormControl;
  passwordFormControl: FormControl;
  loginErrorMatcher: LoginErrorStateMatcher;
  loginErrorMess: string;

  constructor() {
    this.usernameFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.loginErrorMatcher = new LoginErrorStateMatcher();
  }

  login() {
    this.usernameFormControl.markAsTouched();
    this.passwordFormControl.markAsTouched();
    if (!this.loginErrorMatcher.isErrorState(this.usernameFormControl, null)
      && !this.loginErrorMatcher.isErrorState(this.passwordFormControl, null)) {
      this.loginErrorMess = 'Logging in';
    } else {
      this.loginErrorMess = 'logged in fail';
    }
  }
}
