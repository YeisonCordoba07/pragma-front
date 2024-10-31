export interface CategoryModel {
  id: number;
  name: string;
  description: string;
}

export interface CategoryResponse {
  content: CategoryModel[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

