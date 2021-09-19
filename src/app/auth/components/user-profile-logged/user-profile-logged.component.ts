import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthToggleService } from 'src/app/shared/services/user-auth-toggle.service';
import { ShopItemListOfShopCartService } from 'src/app/shop-cart/services/shop-item-list-of-shop-cart.service';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-user-profile-logged',
  templateUrl: './user-profile-logged.component.html',
  styleUrls: ['./user-profile-logged.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileLoggedComponent implements OnInit {

  token$ = new Observable();

  login$ = new Observable();

  constructor(
    private authentificationService: AuthentificationService,
    public userAuthToggleService: UserAuthToggleService,
    private shopItemListOfCartService: ShopItemListOfShopCartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.token$ = this.authentificationService.token$;
    this.login$ = this.authentificationService.login$;
  }

  userProfileBlockToggle() {
    this.userAuthToggleService.userProfileBlockToggle();
  }

  logOut() {
    this.authentificationService.logOut();
    this.shopItemListOfCartService.shopItemListInCart$.next([]);
    this.router.navigate(['/']);
  }
}
