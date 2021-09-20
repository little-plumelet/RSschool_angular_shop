import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root',
})
export class OrderItemListService {

  orderItemList$ = new BehaviorSubject<IOrderItem[]>([]);

}
