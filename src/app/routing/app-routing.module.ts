import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../commodities/pages/home-page/home-page.component';
import { CatalogPageComponent } from '../commodities/pages/catalog-page/catalog-page.component';
import { ShopItemsOfSubcategoryPageComponent } from '../commodities/pages/shop-items-of-subcategory-page/shop-items-of-subcategory-page.component';
import { ShopItemCardDetailedComponent } from '../commodities/components/shop-item-card-detailed/shop-item-card-detailed.component';
import { SubcategoryPageComponent } from '../commodities/pages/subcategory-page/subcategory-page.component';
import { RegistrationFormComponent } from '../auth/components/registration-form/registration-form.component';
import { FavouritesPageComponent } from '../commodities/pages/favourites-page/favourites-page.component';
import { ShopCartPageComponent } from '../shop-cart/pages/shop-cart-page/shop-cart-page.component';
import { OrderFormComponent } from '../shop-cart/components/order-form/order-form.component';
import { OrderWaitingPageComponent } from '../orders/pages/order-waiting-page/order-waiting-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'catalog/:categoryId', component: SubcategoryPageComponent },
  { path: 'catalog/:categoryId/:subcategoryId', component: ShopItemsOfSubcategoryPageComponent },
  { path: 'catalog/:categoryId/:subcategoryId/:itemId', component: ShopItemCardDetailedComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'favourite', component: FavouritesPageComponent },
  { path: 'shop-cart', component: ShopCartPageComponent },
  { path: 'form-order', component: OrderFormComponent },
  { path: 'orders-waiting-list', component: OrderWaitingPageComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
