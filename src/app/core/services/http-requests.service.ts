import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, HOME_PAGE_GOODS } from 'src/app/shared/constants/constants';
import { ICategory } from 'src/app/shared/models/category';
import { IShopItem } from 'src/app/shared/models/shop-item';

function getRandomIntInclusive(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<ICategory[]>(`${BASE_URL}/categories`);
  }

  getGoods(searchQuery: string) {
    return this.http.get<IShopItem[]>(`${BASE_URL}/goods/search?text=${searchQuery}`);
  }

  getGoodsOfSubcategory(categoryId: string, subCategoryId: string) {
    const result = this.http.get<IShopItem[]>(`${BASE_URL}/goods/category/${categoryId}/${subCategoryId}`);
    console.log('result', result);
    return result;
  }

  getHomePageGoods() {
    const index = getRandomIntInclusive(0, HOME_PAGE_GOODS.length - 1);
    return this.http.get<IShopItem[]>(
      `${BASE_URL}/goods/category/${HOME_PAGE_GOODS[index].categoryId}/${HOME_PAGE_GOODS[index].subcategoryId}`,
    );
  }
}
