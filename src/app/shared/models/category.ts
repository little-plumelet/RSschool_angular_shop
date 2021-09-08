import { ISubcategory } from './subcategory';

export interface ICategory {
  id: string;
  name: string;
  subCategories: ISubcategory[];
}
