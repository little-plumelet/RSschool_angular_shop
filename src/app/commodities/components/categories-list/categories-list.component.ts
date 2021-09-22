import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { changeChosenCategoryName } from 'src/app/redux/actions/categories-actions';
import { AppState } from 'src/app/redux/app-state.model';
import { ICONS_OF_CATEGORIES } from 'src/app/shared/constants/constants';
import { ICategory } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories$: Observable<ICategory[]> = new Observable();

  selectedCategoryName$: Observable<string> = new Observable();

  categoryId = '';

  categoryId$: Observable<ICategory[]> = new Observable();

  subscription: Subscription[] = [];

  icons = ICONS_OF_CATEGORIES;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.categories$ = this.store.select((state) => state.categoriesState.categories);
    this.selectedCategoryName$ = this.store.select((state) => state.categoriesState.chosenCategoryName);
    this.categoryId$ = this.store.select((state) => {
      return state.categoriesState.categories.filter(
        (category) => category.name === state.categoriesState.chosenCategoryName);
    });
    this.subscription.push(this.categoryId$.subscribe((categoryId) => {
      this.categoryId = categoryId[0]?.id;
      this.cdr.detectChanges();
    }));
  }

  changeChosenCategoryName(event: Event) {
    const target = event.target as HTMLElement;
    this.store.dispatch(changeChosenCategoryName({ chosenCategoryName: target.innerText }));
  }

  goToSubCategoryList() {
    this.router.navigate([`/catalog/${this.categoryId}`]);
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
