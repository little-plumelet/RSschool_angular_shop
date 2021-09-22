import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserAuthToggleService } from 'src/app/shared/services/user-auth-toggle.service';

@Component({
  selector: 'app-user-profile-not-logged',
  templateUrl: './user-profile-not-logged.component.html',
  styleUrls: ['./user-profile-not-logged.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileNotLoggedComponent {

  showHideProfileBlock = false;

  constructor(public userAuthToggleService:UserAuthToggleService) {}

  userProfileBlockToggle() {
    this.userAuthToggleService.userProfileBlockToggle();
  }

  userLoginFormToggle() {
    this.userAuthToggleService.userLoginFormToggle();
  }
}
