import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken } from 'src/app/auth/models/token';
import { IUserRegister } from 'src/app/auth/models/user-register';
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
    return result;
  }

  getHomePageGoods() {
    const index = getRandomIntInclusive(0, HOME_PAGE_GOODS.length - 1);
    return this.http.get<IShopItem[]>(
      `${BASE_URL}/goods/category/${HOME_PAGE_GOODS[index].categoryId}/${HOME_PAGE_GOODS[index].subcategoryId}`,
    );
  }

  getShopItemById(id: string) {
    return this.http.get<IShopItem>(`${BASE_URL}/goods/item/${id}`);
  }

  registerUser(user: IUserRegister) {
    const httpParams = new HttpParams()
      .set(' firstName', user.firstName)
      .set('lastName', user.lastName)
      .set('login', user.login)
      .set('password', user.password);
    return this.http.post<IToken>(`${BASE_URL}/users/register`, httpParams );
  }

  loginUser(login: string, password: string) {
    const body = {
      login,
      password,
    };
    return this.http.post<IToken>(`${BASE_URL}/users/login`, body);
  }

  addToFavouritList(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const options = {
      headers: headers,
    };
    const body = {
      id: id,
    };
    return this.http.post(`${BASE_URL}/users/favorites/`, body, options);
  }
}
