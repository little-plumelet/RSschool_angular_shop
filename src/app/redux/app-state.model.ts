import { ICategory } from '../shared/models/category';
import { ISubcategory } from '../shared/models/subcategory';

export interface ICategoriesState {
  categories: ICategory[];
  chosenCategoryName: string;
  chosenSubcategory: ISubcategory[];
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export interface AppState {
  categoriesState: ICategoriesState;
}
