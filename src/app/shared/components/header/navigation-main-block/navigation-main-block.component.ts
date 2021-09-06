import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/auth/services/authentification.service';
import { UserAuthToggleService } from 'src/app/shared/services/user-auth-toggle.service';

@Component({
  selector: 'app-navigation-main-block',
  templateUrl: './navigation-main-block.component.html',
  styleUrls: ['./navigation-main-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMainBlockComponent implements OnInit {
  searchInput = '';

  token$ = new Observable();

  constructor(
    private userAuthToggleService: UserAuthToggleService,
    private authentificationService: AuthentificationService,
  ) {}

  ngOnInit() {
    this.token$ = this.authentificationService.token$;
  }

  userProfileBlockToggle() {
    this.userAuthToggleService.userProfileBlockToggle();
  }
}
