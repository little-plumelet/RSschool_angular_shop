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

@NgModule({
  declarations: [
    CatalogPageComponent,
    CategoriesListComponent,
    SubcategoriesListComponent,
    HomePageComponent,
    ShopItemListOfRandomCategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('categoriesState', categoriesReducer),
    SwiperModule,
  ],
  exports: [
    CatalogPageComponent,
    SwiperModule,
  ],
})
export class CommoditiesModule { }
