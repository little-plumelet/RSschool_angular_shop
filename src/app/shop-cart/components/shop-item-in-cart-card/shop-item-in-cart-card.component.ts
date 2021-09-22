import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItem } from 'src/app/shared/models/shop-item';
import { IOrderItem } from '../../models/order-item';
import { OrderItemListService } from '../../services/order-item-list.service';

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

  @Output() newPrice = new EventEmitter();


  subscription: Subscription[] = [];

  inputValue = 1;

  maxInputValue = 1;

  price = 0;

  totalPrice = 0;

  delivery = DELIVERY.today;

  chosenCategoryId = '';

  chosenSubCategoryId = '';

  chosenItemId = '';

  orderList: IOrderItem[] = [];

  constructor(
    private httpRequestService: HttpRequestsService,
    private orderItemListService: OrderItemListService,
  ) { }

  ngOnInit(): void {
    if (this.shopItem) {
      this.maxInputValue = this.shopItem.availableAmount;
      this.price = this.shopItem.price;
      this.totalPrice = this.shopItem.price;
      this.chosenCategoryId = this.shopItem.category;
      this.chosenSubCategoryId = this.shopItem.subCategory;
      this.chosenItemId = this.shopItem.id;
      this.subscription.push(this.orderItemListService.orderItemList$.subscribe((orderList) => {
        this.orderList = orderList;
      }));
      this.orderList.push({ id: this.shopItem.id, amount: String(this.inputValue) });
      this.orderItemListService.orderItemList$.next(this.orderList.slice());
    }
    this.deliveryDate();
  }

  plus() {
    this.inputValue++;
    if (this.inputValue > this.maxInputValue) {
      this.inputValue = this.maxInputValue;
    }
    this.totalPrice = this.price * this.inputValue;
    this.orderList.forEach((item) => {
      if (item.id === this.chosenItemId) {
        item.amount = String(this.inputValue);
      }
    });
    this.orderItemListService.orderItemList$.next(this.orderList.slice());
  }

  minus() {
    this.inputValue--;
    if (this.inputValue < 1) {
      this.inputValue = 1;
    }
    this.totalPrice = this.price * this.inputValue;
    this.orderList.forEach((item) => {
      if (item.id === this.chosenItemId) {
        item.amount = String(this.inputValue);
      }
    });
    this.orderItemListService.orderItemList$.next(this.orderList.slice());
  }

  updateOrderList() {
    this.orderList.map((orderItem) => {
      if (orderItem.id === this.chosenItemId) {
        orderItem.amount = String(this.inputValue);
      }
    });
    this.orderItemListService.orderItemList$.next(this.orderList.slice());
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
    this.orderList = this.orderList.filter((orderItem) => orderItem.id !== this.chosenItemId);
    this.orderItemListService.orderItemList$.next(this.orderList.slice());
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
