import {Component} from '@angular/core';
import {MatButtonToggleChange, MatTableDataSource} from '@angular/material';
import {User} from '../../models/user';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-list-cases',
  templateUrl: './app.list.cases.component.html',
  styleUrls: ['./app.list.cases.component.css']
})

export class AppListCasesComponent {
  public statusFilterList: string[];
  public alphabetFilterList: string[];
  public countryFilterList: string[];
  public dataSource: MatTableDataSource<User>;
  public selectedStatusFilter: string;
  public selectedCountryFilterList: Set<string>;
  public isShowingStatusFilter = false;
  public isShowingCountryFilter = false;
  private displayedColumns: string[];
  private selection: SelectionModel<User>;
  private users: User[];
  private selectedCharacter = '';

  constructor() {
    this.users = this.genData();
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.displayedColumns = ['select', 'IMG', 'First Name', 'Last Name', 'Birth Date', 'Country', 'Uncompleted', 'Actions'];
    this.selection = new SelectionModel<User>(true, []);
    this.selectedStatusFilter = 'All cases';
    this.selectedCountryFilterList = new Set<string>();

    this.alphabetFilterList = this.generateAlphabetFilterList();
    this.statusFilterList = this.getStatusFilterList();
    // this.countryFilterList = this.getCountryList();
  }

  genData(): User[] {

    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push({
        firstName: 'A' + i,
        lastName: 'B' + i,
        birthDate: new Date(),
        country: 'AA',
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

  getStatusFilterList() {
    const result = ['All cases', 'Completed', 'Uncompleted'];
    return result;
  }

  showFilter(status: string) {
    if (status === 'status') {
      this.hideCountryFilter();
      this.showStatusFilter();
      return;
    }
    if (status === 'country') {
      this.hideStatusFilter();
      this.showCountryFilter();
    }
  }

  selectedStatusChange(statusFilter) {
    this.selectedStatusFilter = statusFilter.value;
    this.filterData();
  }

  // selectedCharacterChange($event: MatButtonToggleChange) {
  //
  // }

  selectedCharacterChange(character: string) {
    const countryFilterList = [];
    const allCountryFilterList = this.getCountryList();
    allCountryFilterList.forEach(function (country) {
      if (country.charAt(0).toUpperCase() === character) {
        countryFilterList.push(country);
      }
    });
    this.countryFilterList = countryFilterList;
  }

  isBelongToCurrentCat(country: string): boolean {
    if (country.charAt(0).toUpperCase() === this.selectedCharacter) {
      return true;
    } else {
      return false;
    }
  }

  selectedCountryChange(countryFilter: MatButtonToggleChange) {
    if (countryFilter.source.checked) {
      this.selectedCountryFilterList.add(countryFilter.value);
    } else {
      this.selectedCountryFilterList.delete(countryFilter.value);
    }
    this.filterData();
  }

  removeSelectedCountry(country: string) {
    this.selectedCountryFilterList.delete(country);
    this.filterData();
  }

  private getCountryList() {
    return ['AA', 'AB', 'BC', 'C', 'D'];
  }

  private hideCountryFilter() {
    this.isShowingCountryFilter = false;
    // this.hideAlphaBetFilterList();
    // this.countryFilterList = [];
  }

  private showStatusFilter() {
    this.isShowingStatusFilter = true;
  }

  private hideStatusFilter() {
    this.isShowingStatusFilter = false;
  }

  private showCountryFilter() {
    this.isShowingCountryFilter = true;
  }

  private filterData() {
    const data = this.users;
    const filteredData = [];
    const self = this;
    const statusSelected = new Set<string>();
    if (self.selectedStatusFilter === 'All cases') {
      statusSelected.add('Completed');
      statusSelected.add('Uncompleted');
    } else {
      statusSelected.add(self.selectedStatusFilter);
    }
    let countrySelected = new Set<string>();
    if (this.selectedCountryFilterList.size === 0) {
      this.getCountryList().forEach(function (e) {
        countrySelected.add(e);
      });
    } else {
      countrySelected = this.selectedCountryFilterList;
    }
    data.forEach(function (e) {
      const country = e.country;
      const status = e.completed ? 'Completed' : 'Uncompleted';
      if (statusSelected.has(status) && countrySelected.has(country)) {
        filteredData.push(e);
      }
    });
    this.dataSource.data = filteredData;
  }

  private generateAlphabetFilterList(): string[] {
    const result = [];
    const begin = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      result.push(String.fromCharCode(begin + i));
    }
    return result;
  }

  private hideAlphaBetFilterList() {
    this.alphabetFilterList = [];
  }

  private showAlphabetFilterList() {
    this.alphabetFilterList = this.generateAlphabetFilterList();
  }
}
