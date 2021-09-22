import { ICategory } from '../shared/models/category';
import { ISubcategory } from '../shared/models/subcategory';

export interface ICategoriesState {
  categories: ICategory[];
  chosenCategoryName: string;
  subcategoriesOfChosenCategory: ISubcategory[];
  inCatalog: boolean;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export interface AppState {
  categoriesState: ICategoriesState;
}
