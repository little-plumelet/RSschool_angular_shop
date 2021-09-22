import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrderData } from 'src/app/auth/models/user-info';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItemInOrder } from '../../models/shop-item-in-order';
import { OrdersListService } from '../../services/orders-list.service';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListItemComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion = new MatAccordion();

  @Input() orderItem?: IOrderData;

  panelOpenState = false;

  totalPrice = 0;

  shopItemArray: IShopItemInOrder[] = [];

  subscription: Subscription[] = [];

  constructor(
    private httpRequestService: HttpRequestsService,
    private ordersListService: OrdersListService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.orderItem?.items.map((item) => {
      let price = 0;
      this.subscription.push(this.httpRequestService.getShopItemById(item.id).subscribe((shopItem) => {
        const shopItemNew = shopItem as IShopItemInOrder;
        shopItemNew.numberInOrder = item.amount;
        this.shopItemArray.push(shopItemNew);
        price = Number(shopItem.price);
        this.totalPrice += Number(item.amount) * price;
      }));
    });
  }

  deleteOrder() {
    if (this.orderItem)
      this.subscription.push(this.httpRequestService.deleteOrder(this.orderItem?.id).subscribe());
  }

  editOrder() {
    this.router.navigate(['/order-edit', this.orderItem?.id]);
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }

}
