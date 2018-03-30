import {FormControl, Validators} from '@angular/forms';
import {LoginErrorStateMatcher} from './login-error-state-matcher';
import {Component} from '@angular/core';
import {Constants} from '../utilities/Constants';
import {States} from '../utilities/States';
import {Router} from '@angular/router';

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
  router: Router;

  constructor(router: Router) {
    this.router = router;
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
      if (this.usernameFormControl.value === Constants.username && this.passwordFormControl.value === Constants.password) {
        this.loginErrorMess = '';
        States.LogIn();
        this.router.navigate(['/list']);
      } else {
        this.loginErrorMess = 'Username or password is wrong';
      }
    } else {
      this.loginErrorMess = '';
    }
  }
}
