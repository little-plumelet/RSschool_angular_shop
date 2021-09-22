import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { changeChosenCategoryName, changeInCatalog, getCategories } from 'src/app/redux/actions/categories-actions';
import { AppState } from 'src/app/redux/app-state.model';
import { ISubcategory } from 'src/app/shared/models/subcategory';

@Component({
  selector: 'app-navigation-categories-block',
  templateUrl: './navigation-categories-block.component.html',
  styleUrls: ['./navigation-categories-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationCategoriesBlockComponent implements OnInit, OnDestroy {
  subCategories$: Observable<ISubcategory[]> = new Observable();

  categoryId = '';

  categoryName = '';

  subcategoryId = '';

  subscription: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store.dispatch(getCategories());
    this.subCategories$ = this.store.select((state) => state.categoriesState.categories.map(
      (category) => category.subCategories[0]),
    );
  }

  onClick(event: Event) {
    const target = event.target as HTMLElement;
    this.subscription.push(
      this.store.select((state) => state.categoriesState.categories).subscribe((categories) => {
        const categoryItem = categories.filter((category) => category.subCategories.find(
          (subcategory) => subcategory.name === target.innerHTML));
        this.categoryId = categoryItem[0].id;
        this.categoryName = categoryItem[0].name;
        this.subcategoryId = categoryItem[0].subCategories.filter((subcategory) => subcategory.name === (event.target as HTMLElement).innerHTML)[0].id;
        this.cdr.detectChanges();
      }));
    this.store.dispatch(changeChosenCategoryName({ chosenCategoryName:  this.categoryName }));
    this.store.dispatch(changeInCatalog({ inCatalog: false }));
    this.router.navigate([`/catalog/${this.categoryId}/${this.subcategoryId}`]);
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
}
