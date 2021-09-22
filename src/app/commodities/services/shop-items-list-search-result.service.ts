import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IShopItem } from 'src/app/shared/models/shop-item';

@Injectable({
  providedIn: 'root',
})
export class ShopItemsListSearchResultService {

  shopItemList$ = new BehaviorSubject<IShopItem[]>([]);
}
