import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItem } from 'src/app/shared/models/shop-item';
import { ShopItemListOfFavouriteService } from '../../services/shop-item-list-of-favourite.service';

@Component({
  selector: 'app-shop-item-list-of-favourite',
  templateUrl: './shop-item-list-of-favourite.component.html',
  styleUrls: ['./shop-item-list-of-favourite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemListOfFavouriteComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  shopItemList$: Subject<IShopItem[]> = new Subject();

  shopItem$: Observable<IShopItem> = new Observable();

  shopItemList: IShopItem[] = [];

  inFavourite = true;

  constructor(
    private httpRequestService: HttpRequestsService,
    private shopItemListOfFavouriteService: ShopItemListOfFavouriteService,
  ) { }

  ngOnInit(): void {
    this.shopItemList$ = this.shopItemListOfFavouriteService.shopItemListOfFavourite$;
    if (localStorage.getItem('token')) {
      this.httpRequestService.getUserInfo().subscribe((userInfo) => {
        userInfo.favorites.map((itemId) => {
          this.shopItem$ = this.httpRequestService.getShopItemById(itemId);
          this.subscription.push(this.shopItem$.subscribe((shopItem) => {
            this.shopItemList.push(shopItem);
            this.shopItemListOfFavouriteService.shopItemListOfFavourite$.next(this.shopItemList);
          }));
        });
        this.shopItemList = [];
      });
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
