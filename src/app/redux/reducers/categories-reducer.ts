import { createReducer, on } from '@ngrx/store';
import * as categoriesActions from '../actions/categories-actions';
import { INITIAL_STATE } from 'src/app/shared/constants/constants';

export const categoriesReducer = createReducer(INITIAL_STATE.categoriesState,
  on(categoriesActions.getCategoriesFailed, (state, { error }) => {
    const result = {
      ...state,
      error,
      loading: false,
      loaded: false,
    };
    return result;
  }),
  on(categoriesActions.getCategoriesSuccessful, (state, { categories }) => {
    const result = {
      ...state,
      categories,
      loading: false,
      loaded: true,
    };
    return result;
  }),
  on(categoriesActions.getCategories, (state) => {
    const result = {
      ...state,
      loading: true,
    };
    return result;
  }));
