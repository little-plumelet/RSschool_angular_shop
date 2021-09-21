import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderWaitingPageComponent } from './pages/order-waiting-page/order-waiting-page.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { OrderListItemComponent } from './components/order-list-item/order-list-item.component';



@NgModule({
  declarations: [
    OrderWaitingPageComponent,
    OrderListComponent,
    OrderListItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    OrderWaitingPageComponent,
  ],
})
export class OrdersModule { }
