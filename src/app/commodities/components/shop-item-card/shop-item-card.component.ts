import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  chosenCategoryId = '';

  chosenSubCategoryId = '';

  chosenItemId = '';

  subscription: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private shopCartListservice: ShopItemListOfShopCartService,
    private httpRequestService: HttpRequestsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscription.push(this.httpRequestService.getUserInfo().subscribe());
    this.subscription.push(this.route.params.subscribe((params: Params) => {
      this.chosenCategoryId = params.categoryId;
      this.chosenSubCategoryId = params.subcategoryId;
      if (this.shopItem) {
        this.chosenItemId = this.shopItem.id;
      }
    }));
  }

  addToFavourite(id: string) {
    this.httpRequestService.addToFavouritList(id).subscribe();
    this.inFavourite = true;
    this.cdr.detectChanges();
  }

  removeFromFavourite(id: string) {
    this.httpRequestService.removeFromFavouriteList(id).subscribe();
    this.inFavourite = false;
    this.cdr.detectChanges();
  }

  addToCart(id: string) {
    this.subscription.push(this.httpRequestService.addToCart(id).subscribe());
    if (this.shopItem) {
      this.shopItem.isInCart = true;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
