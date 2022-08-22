import { Category } from "./category.model";

export interface Prestation {
  id: number;
  name: string;
  price: number;
  duration: number; // minutes
  description: string;
  category: Category;
}