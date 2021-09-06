import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { UserProfileNotLoggedComponent } from './components/user-profile-not-logged/user-profile-not-logged.component';
import { UserProfileLoggedComponent } from './components/user-profile-logged/user-profile-logged.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    UserProfileNotLoggedComponent,
    UserProfileLoggedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [
    LoginFormComponent,
    UserProfileNotLoggedComponent,
    UserProfileLoggedComponent,
  ],
})
export class AuthModule { }
