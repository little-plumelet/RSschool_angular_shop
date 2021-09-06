import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  token = '';

  email = '';

  token$ = new BehaviorSubject('');

  email$ = new BehaviorSubject('');

  constructor() {
    if (localStorage.getItem('token') && localStorage.getItem('token_email')) {
      this.token = String(localStorage.getItem('token'));
      this.email = String(localStorage.getItem('token_email'));
      this.token$.next(this.token);
      this.email$.next(this.email);
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_email');
    this.token = '';
    this.email = '';
    this.token$.next(this.token);
    this.email$.next(this.email);
  }
}
