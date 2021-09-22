import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShopCartPageComponent } from './pages/shop-cart-page/shop-cart-page.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { ShopItemInCartCardComponent } from './components/shop-item-in-cart-card/shop-item-in-cart-card.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShopCartPageComponent,
    ShopCartComponent,
    ShopItemInCartCardComponent,
    OrderFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
  ],
})
export class ShopCartModule { }
