import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { IOrderData } from 'src/app/auth/models/user-info';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItemInOrder } from '../../models/shop-item-in-order';

@Component({
  selector: 'app-form-edit-shop-items-of-order',
  templateUrl: './form-edit-shop-items-of-order.component.html',
  styleUrls: ['./form-edit-shop-items-of-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEditShopItemsOfOrderComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion = new MatAccordion();

  @Input() orderItem?: IOrderData;

  panelOpenState = false;

  shopItemArrayInOrder: IShopItemInOrder[] = [];

  subscription: Subscription[] = [];

  constructor(
    private httpRequestService: HttpRequestsService,
  ) { }

  ngOnInit(): void {
    this.orderItem?.items.map((item) => {
      // let price = 0;
      this.subscription.push(this.httpRequestService.getShopItemById(item.id).subscribe((shopItem) => {
        const shopItemNew = shopItem as IShopItemInOrder;
        shopItemNew.numberInOrder = item.amount;
        this.shopItemArrayInOrder.push(shopItemNew);
        //price = Number(shopItem.price);
        //this.totalPrice += Number(item.amount) * price;
      }));
    });
  }

}
