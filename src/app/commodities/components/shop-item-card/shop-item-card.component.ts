import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IShopItem } from 'src/app/shared/models/shop-item';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './shop-item-card.component.html',
  styleUrls: ['./shop-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCardComponent implements OnInit, OnDestroy {
  @Input() shopItem?: IShopItem;

  chosenCategoryId = '';

  chosenSubCategoryId = '';

  chosenItemId = '';

  subscription: Subscription[] = [];


  constructor(
    private route: ActivatedRoute,
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

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
