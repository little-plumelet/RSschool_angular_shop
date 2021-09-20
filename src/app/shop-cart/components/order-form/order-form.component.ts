import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IOrderDetails } from '../../models/order-details';
import { OrderFinishService } from '../../services/order-finish.service';

const TOOLTIP_CONTENT = {
  empty: 'заполните все поля',
  fio: 'поле ФИО должно быть не менее 3 знаков и не более 50',
  address: 'поле Адрес должно быть не менее 3 знаков и не более 200',
  phone: 'поле Номер телефона должно начинаться со знака "+" и содержать только цифры',
  time: 'поле Время ...',
};
const INPUT_MIN = 3;
const FIO_MAX = 50;
const ADDRESS_MAX = 250;

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
      console.log(this.toolTipContent);
      this.showToolTip$.next(true);
    } else if (this.address.length < INPUT_MIN || this.address.length > ADDRESS_MAX) {
      this.toolTipContent = TOOLTIP_CONTENT.address;
      this.showToolTip$.next(true);
    } else if (!(/^\+[0-9]+$/.test(this.phoneNumber))) {
      this.toolTipContent = TOOLTIP_CONTENT.phone;
      this.showToolTip$.next(true);
    } else {
      const details: IOrderDetails = {
        name: this.fio,
        address: this.address,
        phone: this.phoneNumber,
        timeToDeliver: this.time,
        comment: this.comment,
      };

      this.subscriptions.push(this.httpRequestServer.postOrder(details).subscribe());
    }
  }

  hideToolTip() {
    this.showToolTip$.next(false);
  }

  hideToolTipOrder() {
    this.orderFinishService.orderFinish$.next(false);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((element) => element.unsubscribe());
  }
}
