import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { changeChosenCategoryName } from 'src/app/redux/actions/categories-actions';
import { AppState } from 'src/app/redux/app-state.model';
import { IShopItem } from 'src/app/shared/models/shop-item';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-shop-item-card-detailed',
  templateUrl: './shop-item-card-detailed.component.html',
  styleUrls: ['./shop-item-card-detailed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCardDetailedComponent implements OnInit, OnDestroy {
  pagination: any = true;

  thumbsSwiper: any;

  shopItem$: Observable<IShopItem> = new Observable();

  shopItem: IShopItem | null = null;

  subscription: Subscription[] = [];

  categoryName = '';

  subcategoryName = '';

  inFavourite: boolean = false;

  inCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpRequestService: HttpRequestsService,
    private store: Store<AppState>,
    private cdr:ChangeDetectorRef,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.subscription.push(this.route.params.subscribe((params: Params) => {
      this.shopItem$ = this.httpRequestService.getShopItemById(params.itemId);
      this.subscription.push(this.shopItem$.subscribe((shopItem) => {
        if (shopItem) {
          this.shopItem = shopItem;
          this.subscription.push(this.store.select((state) => {
            const categoryItem = state.categoriesState.categories.filter((category) => category.id === shopItem.category);
            this.categoryName = categoryItem[0].name;
            categoryItem[0].subCategories.forEach((subcategory) => {
              if (subcategory.id === shopItem.subCategory) {
                this.subcategoryName = subcategory.name;
              }
            });
          }).subscribe());
          this.store.dispatch(changeChosenCategoryName({ chosenCategoryName:  this.categoryName }));
          this.cdr.detectChanges();
        }
        const swiperWrappers = document.querySelectorAll('.swiper-wrapper');
        swiperWrappers.forEach((swiperWrapper) => swiperWrapper?.setAttribute('style', 'display: flex; align-items: center;'));
      }));
    }));

    this.subscription.push(this.httpRequestService.getUserInfo().subscribe((userInfo) => {
      userInfo.favorites.forEach((favouriteItem) => {
        if (favouriteItem === this.shopItem?.id) {
          this.inFavourite = true;
          this.cdr.detectChanges();
        }
      });
      userInfo.cart.forEach((itemInCart) => {
        if (itemInCart === this.shopItem?.id) {
          this.inCart = true;
          this.cdr.detectChanges();
        }
      });
    }));
  }

  addToFavourite(id: string) {
    this.subscription.push(this.httpRequestService.addToFavouritList(id).subscribe());
    this.inFavourite = true;
    this.cdr.detectChanges();
  }

  removeFromFavourite(id: string) {
    this.subscription.push(this.httpRequestService.removeFromFavouriteList(id).subscribe());
    this.inFavourite = false;
    this.cdr.detectChanges();
  }

  addToCart(id: string) {
    this.subscription.push(this.httpRequestService.addToCart(id).subscribe());
    this.inCart = true;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
