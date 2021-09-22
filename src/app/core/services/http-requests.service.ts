import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IToken } from 'src/app/auth/models/token';
import { IOrderData, IUserInfo } from 'src/app/auth/models/user-info';
import { IUserRegister } from 'src/app/auth/models/user-register';
import { ShopItemListOfFavouriteService } from 'src/app/commodities/services/shop-item-list-of-favourite.service';
import { OrdersListService } from 'src/app/orders/services/orders-list.service';
import { BASE_URL, HOME_PAGE_GOODS } from 'src/app/shared/constants/constants';
import { ICategory } from 'src/app/shared/models/category';
import { IShopItem } from 'src/app/shared/models/shop-item';
import { IOrderDetails } from 'src/app/shop-cart/models/order-details';
import { IOrderItem } from 'src/app/shop-cart/models/order-item';
import { OrderFinishService } from 'src/app/shop-cart/services/order-finish.service';
import { OrderItemListService } from 'src/app/shop-cart/services/order-item-list.service';
import { ShopItemListOfShopCartService } from 'src/app/shop-cart/services/shop-item-list-of-shop-cart.service';

function getRandomIntInclusive(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {

  constructor(
    private http: HttpClient,
    private shopItemListofFavouriteService: ShopItemListOfFavouriteService,
    private shopItemListOfShopCartService: ShopItemListOfShopCartService,
    private orderItemListService: OrderItemListService,
    private orderFinishService: OrderFinishService,
    private ordersListService: OrdersListService,
  ) {}

  getCategories() {
    return this.http.get<ICategory[]>(`${BASE_URL}/categories`);
  }

  getGoods(searchQuery: string) {
    return this.http.get<IShopItem[]>(`${BASE_URL}/goods/search?text=${searchQuery}`);
  }

  getGoodsOfSubcategory(categoryId: string, subCategoryId: string, count: string) {
    const result = this.http.get<IShopItem[]>(`${BASE_URL}/goods/category/${categoryId}/${subCategoryId}?start=0&count=${count}` );
    return result;
  }

  getHomePageGoods() {
    const index = getRandomIntInclusive(0, HOME_PAGE_GOODS.length - 1);
    return this.http.get<IShopItem[]>(
      `${BASE_URL}/goods/category/${HOME_PAGE_GOODS[index].categoryId}/${HOME_PAGE_GOODS[index].subcategoryId}`,
    );
  }

  getShopItemById(id: string) {
    return this.http.get<IShopItem>(`${BASE_URL}/goods/item/${id}`)
      .pipe(
        map((shopItem) => shopItem),
        catchError((error) => {
          console.log('Error is caught!', error);
          return throwError(error);
        }),
      );
  }

  registerUser(user: IUserRegister) {
    const httpParams = new HttpParams()
      .set('firstName', user.firstName)
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
    return this.http.post<IToken>(`${BASE_URL}/users/login`, body).pipe(
      map((token) => token),
      catchError((error) => {
        if (Number(error.status) === 401) {
          console.log('Error! User token is missing!');
        } else {
          console.log('Error is caught!', error);
        }
        return EMPTY;
      }),
    );
  }

  getUserInfo() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const options = {
      headers: headers,
    };
    return this.http.get<IUserInfo>(`${BASE_URL}/users/userInfo/`, options).pipe(
      map((userInfo) => userInfo),
      catchError((error) => {
        if (Number(error.status) === 401) {
          console.log('Error! User token is missing!', error);
        } else {
          console.log('Error is caught!', error);
        }
        return throwError(error);
      }),
    );
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
    return this.http.post(`${BASE_URL}/users/favorites/`, body, options).pipe(
      map(() => {}),
      catchError((error) => {
        if (Number(error.status) === 401) {
          console.log('Error! User token is missing!', error);
        } else {
          console.log('Error is caught!', error);
        }
        return throwError(error);
      }),
    );
  }

  removeFromFavouriteList(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const httpParams = new HttpParams()
      .set('id', id);
    const options = {
      headers: headers,
      params: httpParams,
    };

    return this.http.delete(`${BASE_URL}/users/favorites/`, options)
      .pipe(
        map(() => {
          const newShopItemList = this.shopItemListofFavouriteService.shopItemListOfFavourite$.value.filter(
            (shopItem) => shopItem.id != id,
          );
          this.shopItemListofFavouriteService.shopItemListOfFavourite$.next(newShopItemList);
        }),
        catchError((error) => {
          if (Number(error.status) === 401) {
            console.log('Error! User token is missing!', error);
          } else {
            console.log('Error is caught!', error);
          }
          return throwError(error);
        }),
      );
  }

  addToCart(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const options = {
      headers: headers,
    };
    const body = {
      id: id,
    };
    return this.http.post(`${BASE_URL}/users/cart/`, body, options).pipe(
      map(() => {}),
      catchError((error) => {
        if (Number(error.status) === 401) {
          console.log('Error! User token is missing!', error);
        } else {
          console.log('Error is caught!', error);
        }
        return throwError(error);
      }),
    );
  }

  removeFromCart(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const httpParams = new HttpParams()
      .set('id', id);
    const options = {
      headers: headers,
      params: httpParams,
    };

    return this.http.delete(`${BASE_URL}/users/cart/`, options)
      .pipe(
        map(() => {
          const newShopItemList = this.shopItemListOfShopCartService.shopItemListInCart$.value.filter(
            (shopItem) => shopItem.id != id,
          );
          this.shopItemListOfShopCartService.shopItemListInCart$.next(newShopItemList);
        }),
        catchError((error) => {
          if (Number(error.status) === 401) {
            console.log('Error! User token is missing!', error);
          } else {
            console.log('Error is caught!', error);
          }
          return throwError(error);
        }),
      );
  }

  postOrder(orderDetails: IOrderDetails) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    let orderList: IOrderItem[] = [];
    this.orderItemListService.orderItemList$.subscribe((orderItemList) => {
      orderList = orderItemList;
    });
    this.shopItemListOfShopCartService.shopItemListInCart$.next([]);
    const body = {
      items: orderList,
      details: orderDetails,
    };
    const options = {
      headers: headers,
    };

    return this.http.post(`${BASE_URL}/users/order`, body, options).pipe(
      map(() => {
        orderList = [];
        this.orderItemListService.orderItemList$.next(orderList);
        this.orderFinishService.orderFinish$.next(true);
      }),
      catchError((error) => {
        if (Number(error.status) === 401) {
          console.log('Error! User token is missing!', error);
        } else {
          console.log('Error is caught!', error);
        }
        return throwError(error);
      }),
    );
  }

  deleteOrder(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const httpParams = new HttpParams()
      .set('id', id);
    const options = {
      headers: headers,
      params: httpParams,
    };
    console.log(' this.ordersListService.ordersList$.value',  this.ordersListService.ordersList$.value);
    return this.http.delete(`${BASE_URL}/users/order/`, options)
      .pipe(
        map(() => {
          const newOrderItemList = this.ordersListService.ordersList$.value.filter(
            (orderItem) => orderItem.id != id,
          );
          this.ordersListService.ordersList$.next(newOrderItemList);
        }),
        catchError((error) => {
          if (Number(error.status) === 401) {
            console.log('Error! User token is missing!', error);
          } else {
            console.log('Error is caught!', error);
          }
          return throwError(error);
        }),
      );
  }

  editOrder(orderData: IOrderData) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const options = {
      headers: headers,
    };

    return this.http.put(`${BASE_URL}/users/order`, orderData, options).pipe(
      map(() => {
        //orderList = [];
        this.orderItemListService.orderItemList$.next(orderData.items.slice());
        this.orderFinishService.orderFinish$.next(true);
      }),
      catchError((error) => {
        if (Number(error.status) === 401) {
          console.log('Error! User token is missing!', error);
        } else {
          console.log('Error is caught!', error);
        }
        return throwError(error);
      }),
    );
  }
}
