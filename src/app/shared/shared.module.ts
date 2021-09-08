import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { InformationBlockComponent } from './components/header/information-block/information-block.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { NavigationMainBlockComponent } from './components/header//navigation-main-block/navigation-main-block.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModule } from '../auth/auth.module';
import { NavigationCategoriesBlockComponent } from './components/header/navigation-categories-block/navigation-categories-block.component';
import { StoreModule } from '@ngrx/store';
import { categoriesReducer } from '../redux/reducers/categories-reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from '../redux/effects/categories-effects';
import { SearchGoodsInputComponent } from './components/header/search-goods-input/search-goods-input.component';



@NgModule({
  declarations: [
    HeaderComponent,
    InformationBlockComponent,
    NavigationMainBlockComponent,
    FooterComponent,
    NavigationCategoriesBlockComponent,
    SearchGoodsInputComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AuthModule,
    StoreModule.forFeature('categoriesState', categoriesReducer),
    EffectsModule.forFeature([CategoriesEffects]),
  ],
  exports: [
    CommonModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule { }
