import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { UserAuthToggleService } from 'src/app/shared/services/user-auth-toggle.service';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  showHideProfileBlock = false;

  login = '';

  password = '';

  showHideLoginForm$ = new Observable();

  constructor(
    private userAuthToggleService: UserAuthToggleService,
    private authentificationService: AuthentificationService,
    private httpRequestService: HttpRequestsService,
    private router: Router,
  ){}

  ngOnInit() {
    this.showHideLoginForm$ = this.userAuthToggleService.showHideLoginForm$;
  }

  userLoginFormToggle(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('cover') || target.classList.contains('clear')) {
      this.userAuthToggleService.userLoginFormToggle();
    }
  }

  onSubmit() {
    if (this.login && this.password) {
      const login = this.login;
      this.httpRequestService.loginUser(this.login, this.password).subscribe((token) => {
        if (token.token) {
          this.authentificationService.login$.next(login);
          this.authentificationService.token$.next(token.token);
          localStorage.setItem('token', token.token);
          localStorage.setItem('login', login);
        }
      });
      this.login = '';
      this.password = '';
      this.router.navigate(['/']);
    }
  }
}
