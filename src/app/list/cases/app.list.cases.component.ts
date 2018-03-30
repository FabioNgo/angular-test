import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {User} from "../../models/user";
import {SelectionModel} from "@angular/cdk/collections";


@Component({
  selector: 'app-list-cases',
  templateUrl: './app.list.cases.component.html',
  styleUrls: ['./app.list.cases.component.css']
})

export class AppListCasesComponent {
  private dataSource: MatTableDataSource<User>;
  private displayedColumns: string[];
  private selection: SelectionModel<User>;
  private users: User[];


  constructor() {
    this.users = this.genData();
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.displayedColumns = ['select', 'IMG', 'First Name', 'Last Name', 'Birth Date', 'Country', 'Uncompleted', 'Actions'];
    this.selection = new SelectionModel<User>(true, []);



  }

  genData(): User[] {

    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push({
        firstName: 'A' + i,
        lastName: 'B' + i,
        birthDate: new Date(),
        country: 'Singapore',
        completed: i % 2 === 0,
      });
    }
    return result;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  openModal(element) {

  }
}
