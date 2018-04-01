import {async, ComponentFixture, TestBed, TestModuleMetadata} from '@angular/core/testing';
import {AppLoginComponent} from './app.login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {States} from '../utilities/States';

describe('AppLoginComponent', () => {
  let component: AppLoginComponent;
  let fixture: ComponentFixture<AppLoginComponent>;
  beforeEach(async(() => {
    const appRoutes: Routes = [
      {path: 'login', component: AppLoginComponent},
      {
        path: 'list',
        component: AppLoginComponent,
      },
    ];
    const meta: TestModuleMetadata = {
      declarations: [
        AppLoginComponent,
      ],
      imports: [
        ReactiveFormsModule,
        RouterModule.forRoot(
          appRoutes,
        ),
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    };
    TestBed.configureTestingModule(meta).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoginComponent);
    States.LogOut();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeDefined();
  });
  it(`should have logged in`, async(() => {
    const app = fixture.debugElement.componentInstance;
    app.usernameFormControl.value = 'test@nv.com';
    app.passwordFormControl.value = 'tested';
    app.login();
    expect(States.isLoggedIn()).toBe(true);
  }));
  it(`should not log in with username is 'test' and password is 'tested'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    app.usernameFormControl.value = 'test';
    app.passwordFormControl.value = 'tested';
    app.login();
    expect(States.isLoggedIn()).toBe(false);
  }));
  it(`should not log in with username is 'test@nv.com' and password is 'test'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    app.usernameFormControl.value = 'test@nv.com';
    app.passwordFormControl.value = 'test';
    app.login();
    expect(States.isLoggedIn()).toBe(false);
  }));
  it(`should have error message`, async(() => {
    const app = fixture.debugElement.componentInstance;
    app.usernameFormControl.value = 'test@nv.com';
    app.passwordFormControl.value = 'test';
    app.login();
    expect(app.loginErrorMess).toContain('wrong');
  }));
});
