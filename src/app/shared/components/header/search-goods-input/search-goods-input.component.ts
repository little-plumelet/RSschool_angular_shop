import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ShopItemsListSearchResultService } from 'src/app/commodities/services/shop-items-list-search-result.service';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { DEBOUNCE_TIME, INPUT_VALUE_MIN_LENGTH } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-search-goods-input',
  templateUrl: './search-goods-input.component.html',
  styleUrls: ['./search-goods-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchGoodsInputComponent implements OnInit, OnDestroy {
  searchInput = '';

  searchInput$ = new Subject<string>();

  subscriptions: Subscription[] = [];

  constructor(
    private httpRequestService: HttpRequestsService,
    private shopItemListSearchService: ShopItemsListSearchResultService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchInput$.pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
      ).subscribe(() => this.getGoods(this.searchInput)),
    );
  }

  setSearchQueryValue() {
    if (this.searchInput.length > INPUT_VALUE_MIN_LENGTH) {
      this.searchInput$.next(this.searchInput);
    }
  }

  getGoods(searchQuery: string) {
    this.subscriptions.push(
      this.httpRequestService.getGoods(searchQuery).subscribe((shopItemList) => {
        this.shopItemListSearchService.shopItemList$.next(shopItemList);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
