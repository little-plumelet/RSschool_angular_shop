import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfileBlockToggleService } from 'src/app/shared/services/user-profile-block-toggle.service';

@Component({
  selector: 'app-navigation-main-block',
  templateUrl: './navigation-main-block.component.html',
  styleUrls: ['./navigation-main-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMainBlockComponent implements OnInit, OnDestroy {
  searchInput = '';

  showHideProfileBlock = false;

  subscription = new Subscription();

  constructor(private userProfileBlockToggleService: UserProfileBlockToggleService) {}

  ngOnInit() {
    this.subscription = this.userProfileBlockToggleService.showHideProfileBlock.subscribe();
  }

  userProfileBlockToggle() {
    this.showHideProfileBlock = this.userProfileBlockToggleService.showHideProfileBlock.getValue();
    this.userProfileBlockToggleService.showHideProfileBlock.next(!this.showHideProfileBlock);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
