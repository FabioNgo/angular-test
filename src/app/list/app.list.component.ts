import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {States} from "../utilities/States";
import {EventListener} from "../utilities/EventListener";
import {Listener} from "../utilities/Listener";

@Component({
  selector: 'app-list',
  templateUrl: './app.list.component.html',
  styleUrls: ['./app.list.component.css']
})
export class AppListComponent implements OnInit {
  router: Router;
  route: ActivatedRoute;
  isMobile = false;
  menus = [
    {
      name: 'Cases',
      id: '1',
      link: 'cases',
      selected: true
    },
    {
      name: 'Create',
      id: '2',
      link: '#',
      selected: false
    },
    {
      name: 'Admin',
      id: '3',
      link: '#',
      selected: false
    }
  ];

  constructor(router: Router, route: ActivatedRoute) {
    this.router = router;
    this.route = route;
    const self = this;
    self.isMobile = window.innerWidth < 840;
    EventListener.onWidthChangeListener({
      notify(data) {
        self.isMobile = data < 840;
      }
    });

  }

  ngOnInit(): void {
    // const temp = this.route.params.value;
  }

  clickItem(menu) {
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].id === menu.id) {
        this.menus[i].selected = true;
      } else {
        this.menus[i].selected = false;
      }
    }
  }

  logout() {
    States.LogOut();
    this.router.navigate(['/login']);
  }
}
