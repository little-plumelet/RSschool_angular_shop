import { IOrderDetails } from 'src/app/shop-cart/models/order-details';
import { IOrderItem } from 'src/app/shop-cart/models/order-item';

export interface IOrderData {
  items: IOrderItem[],
  details: IOrderDetails,
  id: string,
}

export interface IUserInfo {
  firstName:	string;
  lastName:	string;
  cart: string[];
  favorites:	string[];
  orders:	IOrderData[];
}
