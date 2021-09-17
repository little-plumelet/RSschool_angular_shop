import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { UserAuthToggleService } from 'src/app/shared/services/user-auth-toggle.service';
import { IUserRegister } from '../../models/user-register';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  firstName = '';

  lastName = '';

  login = '';

  password = '';

  showHideRegistrationForm$ = new Observable();

  subscription: Subscription[] = [];

  constructor(
    private userAuthToggleService: UserAuthToggleService,
    private authTokenService: AuthentificationService,
    private httpService: HttpRequestsService,
  ) { }

  onSubmit() {
    const userRegister: IUserRegister = {
      firstName: this.firstName,
      lastName: this.lastName,
      login: this.login,
      password: this.password,
    };

    console.log('userRegister.login = ', userRegister.login);
    this.subscription.push(this.httpService.registerUser(userRegister).subscribe((token) => {
      this.authTokenService.token$.next(token.token);
      this.authTokenService.login$.next(userRegister.login);
      localStorage.setItem('token', token.token);
      localStorage.setItem('login', userRegister.login);
    }));
  }

}
