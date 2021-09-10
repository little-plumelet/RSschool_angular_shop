import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItem } from 'src/app/shared/models/shop-item';
import { ShopItemListForHomePageService } from '../../services/shop-item-list-for-home-page.service';

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
  selector: 'app-shop-item-list-of-random-category',
  templateUrl: './shop-item-list-of-random-category.component.html',
  styleUrls: ['./shop-item-list-of-random-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemListOfRandomCategoryComponent implements OnInit, OnDestroy {
  // @ViewChild("swiperRef", { static: false }) swiperRef?: SwiperComponent;
  pagination: any = true;

  stars:number[] = [];

  shopItemListRandom$ = new Observable<IShopItem[]>();

  subscriptions: Subscription[] = [];

  constructor(
    private httpRequestService: HttpRequestsService,
    private shopItemListForHomePage: ShopItemListForHomePageService,
  ) {}

  ngOnInit(): void {
    this.shopItemListRandom$ = this.shopItemListForHomePage.shopItemListForHomePage$;
    this.getGoodsForHomePage();
    this.subscriptions.push(this.shopItemListRandom$.subscribe(() => {
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      swiperWrapper?.setAttribute('style', 'display: flex; align-items: center;');
    }));
  }

  getGoodsForHomePage() {
    this.subscriptions.push(
      this.httpRequestService.getHomePageGoods().subscribe((shopItemList) => {
        this.shopItemListForHomePage.shopItemListForHomePage$.next(shopItemList);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
