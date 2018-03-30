import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AppLoginComponent} from './login/app.login.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
  ],
  imports: [
    BrowserModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
