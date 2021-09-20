import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
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
export class RegistrationFormComponent implements OnInit {
  firstName = '';

  lastName = '';

  login = '';

  password = '';

  showHideRegistrationForm$ = new Observable();

  subscription: Subscription[] = [];

  showToolTip$ = new Subject<boolean>();

  constructor(
    private userAuthToggleService: UserAuthToggleService,
    private authTokenService: AuthentificationService,
    private httpService: HttpRequestsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.showToolTip$.next(false);
    this.subscription.push(this.showToolTip$.subscribe());
  }

  onSubmit() {
    const userRegister: IUserRegister = {
      firstName: this.firstName,
      lastName: this.lastName,
      login: this.login,
      password: this.password,
    };

    if (!userRegister.firstName.length || !userRegister.lastName.length || !userRegister.login.length || !userRegister.password.length) {
      this.showToolTip$.next(true);

    } else {
      this.subscription.push(this.httpService.registerUser(userRegister).subscribe((token) => {
        this.authTokenService.token$.next(token.token);
        this.authTokenService.login$.next(userRegister.login);
        localStorage.setItem('token', token.token);
        localStorage.setItem('login', userRegister.login);
      }));
      this.router.navigate(['/']);
    }
  }

  hideToolTip() {
    this.showToolTip$.next(false);
  }

}
