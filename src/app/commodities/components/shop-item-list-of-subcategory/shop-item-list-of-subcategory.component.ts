import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { AppState } from 'src/app/redux/app-state.model';
import { IShopItem } from 'src/app/shared/models/shop-item';

@Component({
  selector: 'app-shop-item-list-of-subcategory',
  templateUrl: './shop-item-list-of-subcategory.component.html',
  styleUrls: ['./shop-item-list-of-subcategory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemListOfSubcategoryComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  chosenCategoryName$: Observable<string> = new Observable();

  chosenSubCategoryName$: Observable<string> = new Observable();

  shopItemList$: Observable<IShopItem[]> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private httpRequestService: HttpRequestsService,
    private store:Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.chosenCategoryName$ = this.store.select((state) => state.categoriesState.chosenCategoryName);
    this.subscription.push(this.route.params.subscribe((params: Params) => {
      this.shopItemList$ = this.httpRequestService.getGoodsOfSubcategory(
        params.categoryId, params.subcategoryId,
      );
      this.chosenSubCategoryName$ = this.store.select((state) => {
        return state.categoriesState.subcategoriesOfChosenCategory.filter(
          (subcategory) => subcategory.id === params.subcategoryId,
        )[0]?.name;
      });
    }));

  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
