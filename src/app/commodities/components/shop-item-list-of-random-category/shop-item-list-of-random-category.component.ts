import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { IShopItem } from 'src/app/shared/models/shop-item';
import { ShopItemListForHomePageService } from '../../services/shop-item-list-for-home-page.service';

@Component({
  selector: 'app-shop-item-list-of-random-category',
  templateUrl: './shop-item-list-of-random-category.component.html',
  styleUrls: ['./shop-item-list-of-random-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemListOfRandomCategoryComponent implements OnInit {
  currentPosition = 0;

  shopItemListRandom$ = new Observable<IShopItem[]>();

  shopItemListElements: HTMLElement[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private httpRequestService: HttpRequestsService,
    private shopItemListForHomePage: ShopItemListForHomePageService,
  ) {}

  ngOnInit(): void {
    this.shopItemListRandom$ = this.shopItemListForHomePage.shopItemListForHomePage$;
    this.getGoodsForHomePage();
    document.querySelectorAll('.shop-slider__item').forEach((element) => {
      this.shopItemListElements.push(element as HTMLElement);
    });
    console.log('array of elements =', this.shopItemListElements);
  }

  getGoodsForHomePage() {
    this.subscriptions.push(
      this.httpRequestService.getHomePageGoods().subscribe((shopItemList) => {
        this.shopItemListForHomePage.shopItemListForHomePage$.next(shopItemList);
      }),
    );
  }

  slide(position: number) {
    this.shopItemListElements = [];
    document.querySelectorAll('.shop-slider__item').forEach((element) => {
      this.shopItemListElements.push(element as HTMLElement);
    });

    console.log('array of elements =', this.shopItemListElements);
    this.shopItemListElements.forEach((element) => element.style.transform = `translateX(${position}%)`);
  }

  setPosition(event: Event) {
    console.log(event.target);
    if ((event.target as HTMLElement).classList.contains('arrow-right')) {
      this.currentPosition += 100;
      console.log(this.currentPosition);
      this.slide(this.currentPosition);
    } else if ((event.target as HTMLElement).classList.contains('arrow-left')) {
      this.currentPosition -= 100;
      this.slide(this.currentPosition);
    }
  }
}
