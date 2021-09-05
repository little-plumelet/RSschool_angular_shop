import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserProfileBlockToggleService } from 'src/app/shared/services/user-profile-block-toggle.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {

  showHideProfileBlock = false;

  constructor(public userProfileBlockToggleService:UserProfileBlockToggleService) {}

  onLogin() {}

  userProfileBlockToggle() {
    this.showHideProfileBlock = this.userProfileBlockToggleService.showHideProfileBlock.getValue();
    this.userProfileBlockToggleService.showHideProfileBlock.next(!this.showHideProfileBlock);
  }
}
