import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  email = '';

  password = '';

  showHideLoginForm$ = new Observable();

  constructor(
    private userAuthToggleService: UserAuthToggleService,
    private authentificationService: AuthentificationService,
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
    let token = '';
    if (this.email && this.password) {
      token = this.email + this.password;
      localStorage.setItem('token', token);
      localStorage.setItem('token_email', this.email);
      this.authentificationService.email$.next(this.email);
      this.authentificationService.token$.next(token);
      this.email = '';
      this.password = '';
    }
  }
}
