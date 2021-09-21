import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { IOrderData } from 'src/app/auth/models/user-info';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { ADDRESS_MAX, FIO_MAX, INPUT_MIN, TOOLTIP_CONTENT } from 'src/app/shared/constants/constants';
import { IShopItem } from 'src/app/shared/models/shop-item';
import { OrderFinishService } from 'src/app/shop-cart/services/order-finish.service';
import { OrderItemListService } from 'src/app/shop-cart/services/order-item-list.service';
import { OrdersListService } from '../../services/orders-list.service';

@Component({
  selector: 'app-form-edit-order',
  templateUrl: './form-edit-order.component.html',
  styleUrls: ['./form-edit-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEditOrderComponent implements OnInit {
  orderData: IOrderData | null = null;

  fio = '';

  phoneNumber = '';

  address = '';

  time = '';

  comment = '';

  shopItemArray: IShopItem[] = [];

  subscriptions: Subscription[] = [];

  showToolTip$ = new Subject<boolean>();

  toolTipContent = '';

  orderId = '';

  constructor(
    private httpRequestService: HttpRequestsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private ordersListService: OrdersListService,
    private orderItemListService: OrderItemListService,
    private router: Router,
    public orderFinishService: OrderFinishService,
  ) {

  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe((params: Params) => {
      this.orderId = params.orderId;
      this.subscriptions.push(this.httpRequestService.getUserInfo().subscribe((userInfo) => {
        this.orderData = userInfo.orders.filter((order) => order.id === params.orderId)[0];
        this.fio = this.orderData.details.name;
        this.phoneNumber =  this.orderData.details.phone;
        this.time = this.orderData.details.timeToDeliver.slice(0, this.orderData.details.timeToDeliver.indexOf(' '));
        this.address = this.orderData.details.address;
        if (this.orderData.details.comment) {
          this.comment = this.orderData.details.comment;
        }
        this.cdr.detectChanges();
      }));
    }));
  }

  clearInputs() {
    this.fio = '';
    this.phoneNumber = '';
    this.address = '';
    this.time = '';
    this.comment = '';
  }

  onSubmit() {
    if (!this.fio.length || !this.phoneNumber.length || !this.address.length || !this.time.length) {
      this.showToolTip$.next(true);
      this.toolTipContent = TOOLTIP_CONTENT.empty;
    } else if (this.fio.length < INPUT_MIN || this.fio.length > FIO_MAX) {
      this.toolTipContent = TOOLTIP_CONTENT.fio;
      this.showToolTip$.next(true);
    } else if (this.address.length < INPUT_MIN || this.address.length > ADDRESS_MAX) {
      this.toolTipContent = TOOLTIP_CONTENT.address;
      this.showToolTip$.next(true);
    } else if (!(/^\+[0-9]+$/.test(this.phoneNumber))) {
      this.toolTipContent = TOOLTIP_CONTENT.phone;
      this.showToolTip$.next(true);
    } else {
      this.deliveryDate();
      if (this.orderData) {
        this.orderData.details = {
          name: this.fio,
          address: this.address,
          phone: this.phoneNumber,
          timeToDeliver: this.time,
          comment: this.comment,
        };
        this.orderData.items = this.ordersListService.ordersList$.value.filter((order) => order.id === this.orderId)[0].items;
        this.subscriptions.push(this.httpRequestService.deleteOrder(this.orderId).subscribe());
        this.orderItemListService.orderItemList$.next(this.orderData.items.slice());
        this.subscriptions.push(this.httpRequestService.postOrder(this.orderData.details).subscribe());

        this.clearInputs();
      }
    }
  }

  deliveryDate() {
    const date = new Date();
    const time = date.getHours().toLocaleString();
    let trimmedDate = '';

    if ((Number(time) >= 20 && Number(time) <= 24) || (Number(time) > Number(this.time.split(':')[0]))) {
      date.setDate(date.getDate() + 1);
      trimmedDate = this.trimDate(date);
      this.time += '  ' + trimmedDate;
    } else {
      trimmedDate = this.trimDate(date);
      this.time += '  ' + trimmedDate;
    }
  }

  trimDate(date: Date): string {
    let trimmedDate = '';

    trimmedDate = date.toLocaleString();
    trimmedDate = trimmedDate.substring(0, trimmedDate.indexOf(','));
    return trimmedDate;
  }

  hideToolTip() {
    this.showToolTip$.next(false);
  }

  hideToolTipOrder() {
    this.orderFinishService.orderFinish$.next(false);
    this.router.navigate(['/orders-waiting-list']);
  }
}
