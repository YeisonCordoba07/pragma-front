export interface ItemModel {
  id: number;
  name: string;
  description: string;
  brand: string;
  category: string;
  quantity: number;
}

export interface ItemResponse {
  content: ItemModel[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
