import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { StoreModule } from '@ngrx/store';
import { categoriesReducer } from '../redux/reducers/categories-reducer';
import { SubcategoriesListComponent } from './components/subcategories-list/subcategories-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ShopItemListOfRandomCategoryComponent } from './components/shop-item-list-of-random-category/shop-item-list-of-random-category.component';
import { SwiperModule } from 'swiper/angular';
import { ShopItemsOfSubcategoryPageComponent } from './pages/shop-items-of-subcategory-page/shop-items-of-subcategory-page.component';
import { ShopItemCardComponent } from './components/shop-item-card/shop-item-card.component';
import { RouterModule } from '@angular/router';
import { ShopItemListOfSubcategoryComponent } from './components/shop-item-list-of-subcategory/shop-item-list-of-subcategory.component';
import { ShopItemCardDetailedComponent } from './components/shop-item-card-detailed/shop-item-card-detailed.component';
import { SubcategoryPageComponent } from './pages/subcategory-page/subcategory-page.component';

@NgModule({
  declarations: [
    CatalogPageComponent,
    CategoriesListComponent,
    SubcategoriesListComponent,
    HomePageComponent,
    ShopItemListOfRandomCategoryComponent,
    ShopItemsOfSubcategoryPageComponent,
    ShopItemCardComponent,
    ShopItemListOfSubcategoryComponent,
    ShopItemCardDetailedComponent,
    SubcategoryPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('categoriesState', categoriesReducer),
    SwiperModule,
    RouterModule,
  ],
  exports: [
    CatalogPageComponent,
    SwiperModule,
  ],
})
export class CommoditiesModule { }
