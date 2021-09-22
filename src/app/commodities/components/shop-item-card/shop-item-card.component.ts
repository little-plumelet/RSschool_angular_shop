import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItem } from 'src/app/shared/models/shop-item';
import { ShopItemListOfShopCartService } from 'src/app/shop-cart/services/shop-item-list-of-shop-cart.service';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './shop-item-card.component.html',
  styleUrls: ['./shop-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCardComponent implements OnInit, OnDestroy {
  @Input() shopItem?: IShopItem;

  @Input() inFavourite?: boolean;

  inCart: boolean = false;

  chosenCategoryId = '';

  chosenSubCategoryId = '';

  chosenItemId = '';

  subscription: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private shopCartListservice: ShopItemListOfShopCartService,
    private httpRequestService: HttpRequestsService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {

    //this.subscription.push(this.httpRequestService.getUserInfo().subscribe());

    this.subscription.push(this.route.params.subscribe((params: Params) => {
      this.chosenCategoryId = params.categoryId;
      this.chosenSubCategoryId = params.subcategoryId;
      if (this.shopItem) {
        this.chosenItemId = this.shopItem.id;
      }
    }));
    if (localStorage.getItem('token')) {
      this.subscription.push(this.httpRequestService.getUserInfo().subscribe((userInfo) => {
        userInfo.favorites.forEach((favouriteItem) => {
          if (favouriteItem === this.shopItem?.id) {
            this.inFavourite = true;
            this.cdr.detectChanges();
          }
        });
        userInfo.cart.forEach((itemInCart) => {
          if (itemInCart === this.shopItem?.id) {
            this.inCart = true;
            this.cdr.detectChanges();
          }
        });
      }));
    }
  }

  addToFavourite(id: string) {
    if (localStorage.getItem('token')) {
      this.httpRequestService.addToFavouritList(id).subscribe();
      this.inFavourite = true;
      this.cdr.detectChanges();
    } else {
      this.router.navigate(['/register-prompt']);
    }
  }

  removeFromFavourite(id: string) {
    this.httpRequestService.removeFromFavouriteList(id).subscribe();
    this.inFavourite = false;
    this.cdr.detectChanges();
  }

  addToCart(id: string) {
    if (localStorage.getItem('token')) {
      this.subscription.push(this.httpRequestService.addToCart(id).subscribe());
      if (this.shopItem) {
        this.shopItem.isInCart = true;
        this.inCart = true;
        this.cdr.detectChanges();
      }
    } else {
      this.router.navigate(['/register-prompt']);
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
