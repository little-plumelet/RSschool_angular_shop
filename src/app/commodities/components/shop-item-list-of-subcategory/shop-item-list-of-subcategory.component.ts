import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { AppState } from 'src/app/redux/app-state.model';
import { sortingOrder } from 'src/app/shared/constants/constants';
import { IShopItem } from 'src/app/shared/models/shop-item';

const UNSORTED = 'swap_vert';
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

  shopItemList$: Subject<IShopItem[]> = new Subject();

  shopItemList: IShopItem[] = [];

  sortPrice = true;

  sortPopularity = true;

  sortOrderPrice = sortingOrder.unsorted;

  sortOrderPopularity = sortingOrder.unsorted;

  iconPriceContent = UNSORTED;

  iconPopularityContent = UNSORTED;

  constructor(
    private route: ActivatedRoute,
    private httpRequestService: HttpRequestsService,
    private store:Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.chosenCategoryName$ = this.store.select((state) => state.categoriesState.chosenCategoryName);
    this.subscription.push(this.route.params.subscribe((params: Params) => {
      this.subscription.push(this.httpRequestService.getGoodsOfSubcategory(
        params.categoryId, params.subcategoryId,
      ).subscribe((shopItems) => {
        this.shopItemList$.next(shopItems);
        this.shopItemList = shopItems;
      }));
      this.chosenSubCategoryName$ = this.store.select((state) => {
        return state.categoriesState.subcategoriesOfChosenCategory.filter(
          (subcategory) => subcategory.id === params.subcategoryId,
        )[0]?.name;
      });
    }));

  }

  sortByPrice(sortingDirection: string) {
    this.shopItemList = this.shopItemList.slice().sort((a, b): number => {
      if (Number(a.price) > Number(b.price)) {
        return ((sortingDirection === sortingOrder.dsc) ? -1 : 1);
      }
      return ((sortingDirection === sortingOrder.asc) ? -1 : 1);
    });

    this.shopItemList = Array.from(this.shopItemList);
    this.shopItemList$.next(this.shopItemList);
  }

  sortByPopularity(sortingDirection: string) {
    this.shopItemList = this.shopItemList.slice().sort((a, b): number => {
      if (Number(a.rating) > Number(b.rating)) {
        return ((sortingDirection === sortingOrder.dsc) ? -1 : 1);
      }
      return ((sortingDirection === sortingOrder.asc) ? -1 : 1);
    });

    this.shopItemList = Array.from(this.shopItemList);
    this.shopItemList$.next(this.shopItemList);
  }

  sortByPriceOrder() {
    this.sortOrderPopularity = sortingOrder.unsorted;
    switch (this.sortOrderPrice) {
      case 'unsorted':
        this.sortOrderPrice = sortingOrder.dsc;
        break;
      case 'discending':
        this.sortOrderPrice = sortingOrder.asc;
        break;
      default:
        this.sortOrderPrice = sortingOrder.dsc;
    }
    this.sortByPrice(this.sortOrderPrice);
  }

  sortByPopularityOrder() {
    this.sortOrderPrice = sortingOrder.unsorted;
    switch (this.sortOrderPopularity) {
      case 'unsorted':
        this.sortOrderPopularity = sortingOrder.dsc;
        break;
      case 'discending':
        this.sortOrderPopularity = sortingOrder.asc;
        break;
      default:
        this.sortOrderPopularity = sortingOrder.dsc;
    }
    this.sortByPopularity(this.sortOrderPopularity);
  }


  toggleIcon(key: keyof ShopItemListOfSubcategoryComponent) {
    switch (this[key]) {
      case UNSORTED:
        (this[key] as string) = 'arrow_downward';
        break;
      case 'arrow_downward':
        (this[key] as string) = 'arrow_upward';
        break;
      default:
        (this[key] as string) = 'arrow_downward';
        break;
    }

    if (key === 'iconPriceContent') this.iconPopularityContent = UNSORTED;
    else this.iconPriceContent = UNSORTED;
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
