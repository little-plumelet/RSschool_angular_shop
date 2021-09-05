import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [
    LoginFormComponent,
  ],
})
export class AuthModule { }
