import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { ADDRESS_MAX, FIO_MAX, INPUT_MIN, TOOLTIP_CONTENT } from 'src/app/shared/constants/constants';
import { IOrderDetails } from '../../models/order-details';
import { OrderFinishService } from '../../services/order-finish.service';



@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent implements OnInit, OnDestroy {
  fio = '';

  phoneNumber = '';

  address = '';

  time = '';

  comment = '';

  subscriptions: Subscription[] = [];

  showToolTip$ = new Subject<boolean>();

  toolTipContent = '';

  constructor(
    private httpRequestServer: HttpRequestsService,
    public orderFinishService: OrderFinishService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.showToolTip$.next(false);
    this.subscriptions.push(this.showToolTip$.subscribe());
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
      const details: IOrderDetails = {
        name: this.fio,
        address: this.address,
        phone: this.phoneNumber,
        timeToDeliver: this.time,
        comment: this.comment,
      };
      this.subscriptions.push(this.httpRequestServer.postOrder(details).subscribe());
      this.clearInputs();
    }
  }

  hideToolTip() {
    this.showToolTip$.next(false);
  }

  hideToolTipOrder() {
    this.orderFinishService.orderFinish$.next(false);
    this.router.navigate(['/orders-waiting-list']);
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

  clearInputs() {
    this.fio = '';
    this.phoneNumber = '';
    this.address = '';
    this.time = '';
    this.comment = '';
  }

  ngOnDestroy() {
    this.subscriptions.forEach((element) => element.unsubscribe());
  }
}
