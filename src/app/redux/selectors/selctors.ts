import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, ICategoriesState } from '../app-state.model';

export const selectCategoriesState = createFeatureSelector<AppState, ICategoriesState>('categoriesState');

export const selectSubcategories = createSelector(
  selectCategoriesState,
  (categoriesState) => categoriesState.chosenSubcategory,
);
