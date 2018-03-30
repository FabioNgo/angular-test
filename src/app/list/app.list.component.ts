import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-list',
  templateUrl: './app.list.component.html',
  styleUrls: ['./app.list.component.css']
})
export class AppListComponent {
  router: Router;
  route: ActivatedRoute;

  constructor(router: Router) {
    this.router = router;
    // this.route = route;
  }
}
