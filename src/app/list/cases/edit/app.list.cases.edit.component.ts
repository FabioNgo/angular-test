import {Component, Inject} from '@angular/core';
import {MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-list-cases-edit',
  templateUrl: './app.list.cases.edit.component.html',
  styleUrls: ['./app.list.cases.edit.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class AppListCasesEditComponent {
  public user: User;
  public editFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppListCasesEditComponent>,
    @Inject(MAT_DIALOG_DATA) user: User, formBuilder: FormBuilder) {
    this.user = user;
    this.editFormGroup = formBuilder.group({
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      phoneNumber: new FormControl(user.phoneNumber, Validators.required),
      birthDate: new FormControl({value: user.getBirthDate(), disabled: true}, Validators.required)
    });
  }

  onNoClick(): void {

  }
}
