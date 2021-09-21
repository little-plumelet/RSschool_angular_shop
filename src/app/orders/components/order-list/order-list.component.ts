import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IOrderData, IUserInfo } from 'src/app/auth/models/user-info';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit, OnDestroy {

  ordersList$: Observable<IUserInfo> = new Observable();

  ordersData: IOrderData[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private httpRequestService: HttpRequestsService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push((this.ordersList$ = this.httpRequestService.getUserInfo()).subscribe((userInfo) => {
      this.ordersData = userInfo.orders;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((element) => element.unsubscribe());
  }

}
