import { ICategory } from "../shared/models/category";

export interface ICategoriesState {
  categories: ICategory[];
  loading: boolean;
  loaded: boolean;
  error: Error | null;
};

export interface AppState {
  categoriesState: ICategoriesState;
}
