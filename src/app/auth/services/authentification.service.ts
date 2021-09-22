import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  token = '';

  login = '';

  token$ = new BehaviorSubject('');

  login$ = new BehaviorSubject('');

  constructor() {
    if (localStorage.getItem('token') && localStorage.getItem('login')) {
      this.token = String(localStorage.getItem('token'));
      this.login = String(localStorage.getItem('login'));
      this.token$.next(this.token);
      this.login$.next(this.login);
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    this.token = '';
    this.login = '';
    this.token$.next(this.token);
    this.login$.next(this.login);
  }
}
