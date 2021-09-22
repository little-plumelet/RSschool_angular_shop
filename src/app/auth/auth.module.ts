import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { UserProfileNotLoggedComponent } from './components/user-profile-not-logged/user-profile-not-logged.component';
import { UserProfileLoggedComponent } from './components/user-profile-logged/user-profile-logged.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginFormComponent,
    UserProfileNotLoggedComponent,
    UserProfileLoggedComponent,
    RegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    LoginFormComponent,
    UserProfileNotLoggedComponent,
    UserProfileLoggedComponent,
  ],
})
export class AuthModule { }
