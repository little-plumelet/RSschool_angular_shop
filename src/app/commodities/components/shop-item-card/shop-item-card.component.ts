import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IShopItem } from 'src/app/shared/models/shop-item';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './shop-item-card.component.html',
  styleUrls: ['./shop-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCardComponent {
  @Input() shopItem?: IShopItem;
}
