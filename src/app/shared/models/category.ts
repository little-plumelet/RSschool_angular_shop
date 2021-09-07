import { ISubcategory } from "./subcategory";

export interface ICategory {
  id: string;
  name: string;
  subcategories: ISubcategory[];
}
