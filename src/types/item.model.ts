import {CategoryModel} from "./category.model";
import {BrandModel} from "./brand.model";

export interface ItemModel {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  brand: BrandModel;
  categories: CategoryModel[];

}

export interface ItemResponse {
  content: ItemModel[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
