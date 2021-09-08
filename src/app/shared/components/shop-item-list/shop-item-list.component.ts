import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IShopItem } from 'src/app/shared/models/shop-item';
import { ShopItemsListSearchResultService } from '../../../commodities/services/shop-items-list-search-result.service';

@Component({
  selector: 'app-shop-item-list',
  templateUrl: './shop-item-list.component.html',
  styleUrls: ['./shop-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemListComponent implements OnInit {

  shopItemList$ = new Observable<IShopItem[]>();

  constructor(
    private shopItemListSearchService: ShopItemsListSearchResultService,
  ) { }

  ngOnInit(): void {
    this.shopItemList$ = this.shopItemListSearchService.shopItemList$;
  }

}
