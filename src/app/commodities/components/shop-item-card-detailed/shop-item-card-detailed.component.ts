import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { AppState } from 'src/app/redux/app-state.model';
import { IShopItem } from 'src/app/shared/models/shop-item';

@Component({
  selector: 'app-shop-item-card-detailed',
  templateUrl: './shop-item-card-detailed.component.html',
  styleUrls: ['./shop-item-card-detailed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCardDetailedComponent implements OnInit, OnDestroy {
  shopItem$: Observable<IShopItem> = new Observable();

  shopItem: IShopItem | null = null;

  subscription: Subscription[] = [];

  chosenCategoryName$: Observable<string> = new Observable();

  chosenSubCategoryName$: Observable<string> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private httpRequestService: HttpRequestsService,
    private store: Store<AppState>,
    // private router: Router,
    private cdr:ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.chosenCategoryName$ = this.store.select((state) => state.categoriesState.chosenCategoryName);
    this.subscription.push(this.route.params.subscribe((params: Params) => {
      this.shopItem$ = this.httpRequestService.getShopItemById(params.itemId);
      this.chosenSubCategoryName$ = this.store.select((state) => {
        return state.categoriesState.subcategoriesOfChosenCategory.filter(
          (subcategory) => subcategory.id === params.subcategoryId,
        )[0].name;
      });
    }));
    this.subscription.push(this.shopItem$.subscribe((shopItem) => {
      this.shopItem = shopItem;
      this.cdr.detectChanges();
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
