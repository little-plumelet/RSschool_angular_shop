import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCategories } from 'src/app/redux/actions/categories-actions';
import { AppState } from 'src/app/redux/app-state.model';
import { ISubcategory } from 'src/app/shared/models/subcategory';

@Component({
  selector: 'app-navigation-categories-block',
  templateUrl: './navigation-categories-block.component.html',
  styleUrls: ['./navigation-categories-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationCategoriesBlockComponent {
  categories$: Observable<ISubcategory[]>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch(getCategories());
    this.categories$ = this.store.select(
      (state) => state.categoriesState.categories.map(
        (category) => category.subCategories[0],
      ),
    );
  }
}
