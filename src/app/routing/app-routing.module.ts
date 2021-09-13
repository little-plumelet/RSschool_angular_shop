import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../commodities/pages/home-page/home-page.component';
import { CatalogPageComponent } from '../commodities/pages/catalog-page/catalog-page.component';
import { ShopItemsOfSubcategoryPageComponent } from '../commodities/pages/shop-items-of-subcategory-page/shop-items-of-subcategory-page.component';
import { ShopItemCardDetailedComponent } from '../commodities/components/shop-item-card-detailed/shop-item-card-detailed.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'catalog/:categoryId/:subcategoryId', component: ShopItemsOfSubcategoryPageComponent },
  { path: 'catalog/:categoryId/:subcategoryId/:itemId', component: ShopItemCardDetailedComponent },
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
