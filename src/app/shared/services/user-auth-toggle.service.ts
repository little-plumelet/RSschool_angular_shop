import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthToggleService {
  showHideProfileBlock = false;

  showHideLoginForm = false;

  showHideRegistrationForm = false;

  showHideProfileBlock$ = new BehaviorSubject(false);

  showHideLoginForm$ = new BehaviorSubject(false);

  showHideRegistrationForm$ = new BehaviorSubject(false);

  userProfileBlockToggle() {
    this.showHideProfileBlock = this.showHideProfileBlock$.getValue();
    this.showHideProfileBlock$.next(!this.showHideProfileBlock);
  }

  userLoginFormToggle() {
    this.showHideLoginForm = this.showHideLoginForm$.getValue();
    this.showHideLoginForm$.next(!this.showHideLoginForm);
  }

  userRegistrationFormToggle() {
    this.showHideRegistrationForm = this.showHideRegistrationForm$.getValue();
    this.showHideRegistrationForm$.next(!this.showHideRegistrationForm);
  }
}
