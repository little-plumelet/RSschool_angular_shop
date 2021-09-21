import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrderData } from 'src/app/auth/models/user-info';

@Injectable({
  providedIn: 'root',
})
export class OrdersListService {

  ordersList$ = new BehaviorSubject<IOrderData[]>([]);
}
