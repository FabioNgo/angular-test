import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppLoginComponent} from './login/app.login.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AppListComponent} from './list/app.list.component';
import {AppListCasesComponent} from './list/cases/app.list.cases.component';
import {MyPaginatorComponent} from './utilities/mypaginator/app.utilities.mypaginator.component';
import {AppListCasesEditComponent} from './list/cases/edit/app.list.cases.edit.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

const appRoutes: Routes = [
  {path: 'login', component: AppLoginComponent},
  {
    path: 'list',
    component: AppListComponent,
    children: [
      {
        path: 'cases',
        component: AppListCasesComponent
      }
    ]
  },

];

@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    AppListComponent,
    AppListCasesComponent,
    MyPaginatorComponent,
    AppListCasesEditComponent
  ],
  entryComponents: [
    AppListCasesEditComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule,
    MatToolbarModule, MatDividerModule, MatListModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule, MatGridListModule,
    MatTableModule, MatCheckboxModule, MatButtonToggleModule, MatChipsModule, MatPaginatorModule, MatDialogModule, MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
