import { IShopItem } from 'src/app/shared/models/shop-item';

export interface IShopItemInOrder extends IShopItem {
  id: string;
  name: string;
  imageUrls:	[string];
  rating:	number;
  availableAmount:	number;
  price:	number;
  description:	string;
  isInCart:	boolean;
  isFavorite:	boolean;
  category: string;
  subCategory: string;
  numberInOrder?: string;
}
