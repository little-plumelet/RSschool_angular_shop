import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItem } from 'src/app/shared/models/shop-item';
import { OrderItemListService } from '../../services/order-item-list.service';
import { ShopItemListOfShopCartService } from '../../services/shop-item-list-of-shop-cart.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCartComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  shopItemListInCart$: Subject<IShopItem[]> = new Subject();

  shopItem$: Observable<IShopItem> = new Observable();

  shopItemListInCart: IShopItem[] = [];

  totalPrice = 0;

  constructor(
    private shopItemListOfShopCartService: ShopItemListOfShopCartService,
    private orderItemListService: OrderItemListService,
    private httpRequestService: HttpRequestsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.shopItemListInCart$ = this.shopItemListOfShopCartService.shopItemListInCart$;
    this.subscription.push(this.shopItemListInCart$.subscribe());
    this.subscription.push(this.orderItemListService.orderItemList$.subscribe());
    this.subscription.push(this.shopItemListOfShopCartService.shopItemListInCart$.subscribe());
    this.getItemsFromCart();
  }

  getItemsFromCart() {
    this.httpRequestService.getUserInfo().subscribe((userInfo) => {
      userInfo.cart.map((itemId) => {
        this.shopItem$ = this.httpRequestService.getShopItemById(itemId);
        this.subscription.push(this.shopItem$.subscribe((shopItem) => {
          this.shopItemListInCart.push(shopItem);
          this.shopItemListOfShopCartService.shopItemListInCart$.next(this.shopItemListInCart);
        }));
      });
      this.subscription.push(this.orderItemListService.orderItemList$.subscribe((orderItems) => {
        this.totalPrice = 0;
        orderItems.forEach((orderItem) => {
          const item = this.shopItemListInCart.find((itemInCart) => orderItem.id === itemInCart.id);
          if (item) this.totalPrice += Number(orderItem.amount) * item.price;
        });
        this.cdr.detectChanges();
      }));
      this.shopItemListInCart = [];
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }

}
