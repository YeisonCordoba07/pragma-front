export interface BrandModel {
  id: number;
  name: string;
  description: string;
}

export interface BrandResponse {
  content: BrandModel[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
