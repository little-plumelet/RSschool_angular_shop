import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderWaitingPageComponent } from './pages/order-waiting-page/order-waiting-page.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { OrderListItemComponent } from './components/order-list-item/order-list-item.component';
import { OrderEditPageComponent } from './pages/order-edit-page/order-edit-page.component';
import { FormEditOrderComponent } from './components/form-edit-order/form-edit-order.component';
import { FormsModule } from '@angular/forms';
import { FormEditShopItemsOfOrderComponent } from './components/form-edit-shop-items-of-order/form-edit-shop-items-of-order.component';
import { FormEditShopItemComponent } from './components/form-edit-shop-item/form-edit-shop-item.component';



@NgModule({
  declarations: [
    OrderWaitingPageComponent,
    OrderListComponent,
    OrderListItemComponent,
    OrderEditPageComponent,
    FormEditOrderComponent,
    FormEditShopItemsOfOrderComponent,
    FormEditShopItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    OrderWaitingPageComponent,
  ],
})
export class OrdersModule { }
