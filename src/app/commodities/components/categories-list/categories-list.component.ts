import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { chageChosenCategoryName } from 'src/app/redux/actions/categories-actions';
import { AppState } from 'src/app/redux/app-state.model';
import { ICategory } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent {
  categories$: Observable<ICategory[]>;

  selectedCategoryName$: Observable<string>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.categories$ = this.store.select((state) => state.categoriesState.categories);
    this.selectedCategoryName$ = this.store.select((state) => state.categoriesState.chosenCategoryName);
  }

  changeChosenCategoryName(event: Event) {
    const target = event.target as HTMLElement;
    this.store.dispatch(chageChosenCategoryName({ chosenCategoryName: target.innerText }));
  }

}
