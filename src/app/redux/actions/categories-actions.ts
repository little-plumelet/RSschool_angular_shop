import { createAction, props } from '@ngrx/store';
import { ICategory } from 'src/app/shared/models/category';

export const getCategories = createAction(
  '[MAIN PAGE] GET CATEGORIES',
);

export const getCategoriesSuccessful = createAction(
  '[CATEGORIES EFFECT] SET FETCHED CATEGORIES',
  props<{ categories: ICategory[] }>(),
);

export const getCategoriesFailed = createAction(
  '[CATEGORIES EFFECT] FETCHED CATEGORIES FAILED',
  props<{ error: Error }>(),
);
