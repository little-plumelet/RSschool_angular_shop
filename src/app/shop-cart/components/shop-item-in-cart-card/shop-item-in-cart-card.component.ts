import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItem } from 'src/app/shared/models/shop-item';

const DELIVERY = {
  today: 'курьером сегодня',
  tomorrow: 'курьером завтра',
};

@Component({
  selector: 'app-shop-item-in-cart-card',
  templateUrl: './shop-item-in-cart-card.component.html',
  styleUrls: ['./shop-item-in-cart-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemInCartCardComponent implements OnInit, OnDestroy {
  @Input() shopItem?: IShopItem;

  subscription: Subscription[] = [];

  inputValue = 1;

  maxInputValue = 1;

  price = 0;

  totalPrice = 0;

  delivery = DELIVERY.today;

  chosenCategoryId = '';

  chosenSubCategoryId = '';

  chosenItemId = '';

  constructor(
    private httpRequestService: HttpRequestsService,
  ) { }

  ngOnInit(): void {
    if (this.shopItem) {
      this.maxInputValue = this.shopItem.availableAmount;
      this.price = this.shopItem.price;
      this.totalPrice = this.shopItem.price;
      this.chosenCategoryId = this.shopItem.category;
      this.chosenSubCategoryId = this.shopItem.subCategory;
      this.chosenItemId = this.shopItem.id;
    }
    this.deliveryDate();
  }

  plus() {
    this.inputValue++;
    if (this.inputValue > this.maxInputValue) {
      this.inputValue = this.maxInputValue;
    }
    this.totalPrice = this.price * this.inputValue;
  }

  minus() {
    this.inputValue--;
    if (this.inputValue < 1) {
      this.inputValue = 1;
    }
    this.totalPrice = this.price * this.inputValue;
  }

  deliveryDate() {
    const date = new Date();
    const time = date.getHours().toLocaleString();
    if (Number(time) >= 20 && Number(time) <= 24) {
      this.delivery = DELIVERY.tomorrow;
    } else {
      this.delivery = DELIVERY.today;
    }
  }

  removeFromCart(id: string) {
    this.subscription.push(this.httpRequestService.removeFromCart(id).subscribe());
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
