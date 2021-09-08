import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { StoreModule } from '@ngrx/store';
import { categoriesReducer } from '../redux/reducers/categories-reducer';
import { SubcategoriesListComponent } from './components/subcategories-list/subcategories-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';



@NgModule({
  declarations: [
    CatalogPageComponent,
    CategoriesListComponent,
    SubcategoriesListComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('categoriesState', categoriesReducer),
  ],
  exports: [
    CatalogPageComponent,
  ],
})
export class CommoditiesModule { }
