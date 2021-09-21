import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrderData } from 'src/app/auth/models/user-info';
import { IShopItemInOrder } from '../../models/shop-item-in-order';
import { OrdersListService } from '../../services/orders-list.service';

@Component({
  selector: 'app-form-edit-shop-item',
  templateUrl: './form-edit-shop-item.component.html',
  styleUrls: ['./form-edit-shop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEditShopItemComponent implements OnInit {
  @Input() shopItem?: IShopItemInOrder;

  inputValue = 1;

  maxInputValue = 1;

  price = 0;

  totalPrice = 0;

  subscriptions: Subscription[] = [];

  constructor(
    private ordersListService: OrdersListService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.shopItem) {
      this.inputValue = Number(this.shopItem.numberInOrder);
      this.maxInputValue = this.shopItem.availableAmount + Number(this.shopItem.numberInOrder);
    }
  }

  plus() {
    this.inputValue++;
    if (this.inputValue > this.maxInputValue) {
      this.inputValue = this.maxInputValue;
    }
    this.totalPrice = this.price * this.inputValue;
    this.updateOrderList();
  }

  minus() {
    this.inputValue--;
    if (this.inputValue < 1) {
      this.inputValue = 1;
    }
    this.totalPrice = this.price * this.inputValue;
    this.updateOrderList();
  }

  updateOrderList() {
    this.subscriptions.push(this.route.params.subscribe((params: Params) => {
      const currentOrder = this.ordersListService.ordersList$.value.filter((order) => order.id === params.orderId);
      currentOrder[0].items.forEach((item) => {
        if (item.id === this.shopItem?.id) {
          item.amount = String(this.inputValue);
        }
      });
      const updatedOrder: IOrderData[] = this.ordersListService.ordersList$.value.filter((order) => order.id !== params.orderId);
      updatedOrder.push(currentOrder[0]);
      this.ordersListService.ordersList$.next(updatedOrder.slice());
    }));
  }

}
