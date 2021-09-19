import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItem } from 'src/app/shared/models/shop-item';

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
    private httpRequestService: HttpRequestsService,
  ) {}

  ngOnInit() {
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
  }

  removeFromFavourite(id: string) {
    console.log('removeFromFavourite', id);
    this.httpRequestService.removeFromFavouriteList(id).subscribe();
  }

  addToCart(id: string) {
    this.subscription.push(this.httpRequestService.addToCart(id).subscribe());
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
