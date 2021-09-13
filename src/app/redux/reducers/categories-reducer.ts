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
    const subCategories = categories[0].subCategories;
    const result = {
      ...state,
      categories,
      chosenCategoryName: categories[0].name,
      subcategoriesOfChosenCategory: subCategories,
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
  }),
  on(categoriesActions.changeChosenCategoryName, (state, { chosenCategoryName }) => {
    const subcategories = state.categories.find((category) => category.name === chosenCategoryName)?.subCategories;
    const result = {
      ...state,
      chosenCategoryName: chosenCategoryName,
      subcategoriesOfChosenCategory: subcategories ?  subcategories : state.subcategoriesOfChosenCategory,
    };
    return result;
  }));
