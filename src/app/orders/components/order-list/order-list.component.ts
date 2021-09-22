import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IOrderData } from 'src/app/auth/models/user-info';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { OrdersListService } from '../../services/orders-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit, OnDestroy {

  ordersList$: Subject<IOrderData[]> = new Subject();

  subscriptions: Subscription[] = [];

  constructor(
    private httpRequestService: HttpRequestsService,
    public ordersListService: OrdersListService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.ordersList$ = this.ordersListService.ordersList$;
      this.subscriptions.push(this.ordersList$.subscribe());
      this.subscriptions.push(this.ordersListService.ordersList$.subscribe());
      this.subscriptions.push(this.httpRequestService.getUserInfo().subscribe((userInfo) => {
        this.ordersListService.ordersList$.next(userInfo.orders);
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((element) => element.unsubscribe());
  }

}
