import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeInCatalog } from 'src/app/redux/actions/categories-actions';
import { AppState } from 'src/app/redux/app-state.model';
import { selectSubcategories } from 'src/app/redux/selectors/selctors';
import { ISubcategory } from 'src/app/shared/models/subcategory';

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoriesListComponent {
  chosenCategoryName$: Observable<string> = new Observable();

  chosenCategory$: Observable<ISubcategory[]> = new Observable();

  chosenCategoryId$: Observable<string> = new Observable();

  constructor(
    private store:Store<AppState>,
  ) {
    this.chosenCategory$ = this.store.select(selectSubcategories);
    this.chosenCategoryName$ = this.store.select((state) => state.categoriesState.chosenCategoryName);
    this.chosenCategoryId$ = this.store.select((state) => state.categoriesState.categories.filter(
      (category) => category.name === state.categoriesState.chosenCategoryName)[0]?.id);
  }

  onClick() {
    this.store.dispatch(changeInCatalog({ inCatalog: false }));
  }
}
