import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatButtonToggleChange, MatDialog, MatTableDataSource, PageEvent} from '@angular/material';
import {User} from '../../models/user';
import {SelectionModel} from '@angular/cdk/collections';
import {MyPaginatorComponent} from '../../utilities/mypaginator/app.utilities.mypaginator.component';
import {AppListCasesEditComponent} from './edit/app.list.cases.edit.component';
import {EventListener} from '../../utilities/EventListener';


@Component({
  selector: 'app-list-cases',
  templateUrl: './app.list.cases.component.html',
  styleUrls: ['./app.list.cases.component.css']
})

export class AppListCasesComponent implements AfterViewInit {
  public statusFilterList: string[];
  public alphabetFilterList: string[];
  public countryFilterList: string[];
  public dataSource: MatTableDataSource<User>;
  public selectedStatusFilter: string;
  public selectedCountryFilterList: Set<string>;
  public isShowingStatusFilter = false;
  public isShowingCountryFilter = false;
  public displayedColumns: string[];
  public selection: SelectionModel<User>;
  public users: User[];
  public editModal: MatDialog;
  @ViewChild(MyPaginatorComponent) paginator: MyPaginatorComponent;
  public pageEvent: PageEvent;
  public isMobile: boolean;
  private selectedCharacter = '';

  constructor(dialog: MatDialog) {
    this.editModal = dialog;
    this.users = this.genData();
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.displayedColumns = ['select', 'IMG', 'First Name', 'Last Name', 'Birth Date', 'Country', 'Uncompleted', 'Actions'];
    this.selection = new SelectionModel<User>(true, []);
    this.selectedStatusFilter = 'All cases';
    this.selectedCountryFilterList = new Set<string>();

    this.alphabetFilterList = this.generateAlphabetFilterList();
    this.statusFilterList = this.getStatusFilterList();
    // this.countryFilterList = this.getCountryList();
    const self = this;
    self.isMobile = window.innerWidth < 840;
    EventListener.onWidthChangeListener({
      notify(data) {
        self.isMobile = data < 840;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource._updatePaginator(this.paginator.pageSize);
  }

  genData(): User[] {

    const result: User[] = [];
    for (let i = 0; i < 10; i++) {
      result.push(new User(i, 'A' + i, 'B' + i, 'AA', 1 % 2 === 0, '', '', '2017/02/28'));
    }
    return result;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      for (const row of this.dataSource.data) {
        this.selection.select(row);
      }
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  openModal(element) {
    const diaLogRef = this.editModal.open(AppListCasesEditComponent, {
      data: element
    });
    const self = this;
    diaLogRef.afterClosed().subscribe(function (result) {
      for (let i = 0; i < self.users.length; i++) {
        const user = self.users[i];
        if (user.id === element.id) {
          self.users[i] = result;
          return;
        }
      }
    });
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
    for (const country of allCountryFilterList) {
      if (country.charAt(0).toUpperCase() === character) {
        countryFilterList.push(country);
      }
    }
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

  search(searchBox) {
    this.dataSource.filter = searchBox.value;
  }

  resetFilter() {
    this.selectedStatusFilter = 'All cases';
    this.selectedCountryFilterList = new Set<string>();
    this.hideCountryFilter();
    this.hideStatusFilter();
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
      for (const e of this.getCountryList()) {
        countrySelected.add(e);
      }
    } else {
      countrySelected = this.selectedCountryFilterList;
    }
    for (const e of data) {
      const country = e.country;
      const status = e.completed ? 'Completed' : 'Uncompleted';
      if (statusSelected.has(status) && countrySelected.has(country)) {
        filteredData.push(e);
      }
    }
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
}
