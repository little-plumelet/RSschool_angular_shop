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

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'catalog/:categoryId', component: SubcategoryPageComponent },
  { path: 'catalog/:categoryId/:subcategoryId', component: ShopItemsOfSubcategoryPageComponent },
  { path: 'catalog/:categoryId/:subcategoryId/:itemId', component: ShopItemCardDetailedComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'favourite', component: FavouritesPageComponent },
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
