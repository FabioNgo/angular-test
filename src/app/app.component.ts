import {Component} from '@angular/core';
import {States} from './utilities/States';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(router: Router) {
    if (!States.isLoggedIn()) {
      router.navigate(['/login']);
    } else {
      // router.navigate(['/list']);
    }
  }
}
