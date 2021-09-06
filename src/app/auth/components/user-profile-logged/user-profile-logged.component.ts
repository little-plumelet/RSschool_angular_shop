import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthToggleService } from 'src/app/shared/services/user-auth-toggle.service';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-user-profile-logged',
  templateUrl: './user-profile-logged.component.html',
  styleUrls: ['./user-profile-logged.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileLoggedComponent implements OnInit {

  token$ = new Observable();

  email$ = new Observable();

  constructor(
    private authentificationService: AuthentificationService,
    public userAuthToggleService: UserAuthToggleService,
  ) { }

  ngOnInit(): void {
    this.token$ = this.authentificationService.token$;
    this.email$ = this.authentificationService.email$;
  }

  userProfileBlockToggle() {
    this.userAuthToggleService.userProfileBlockToggle();
  }

  logOut() {
    this.authentificationService.logOut();
  }
}
