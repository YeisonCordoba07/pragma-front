import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateItemComponent } from './create-item.component';
import { CategoryService } from '../../services/category/category.service';
import { BrandService } from '../../services/brand/brand.service';
import { ItemService } from '../../services/item/item.service'; // Asegúrate de importar tu ItemService
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas para HttpClient
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

// Definiciones de los tipos de respuesta
interface CategoryResponse {
  content: { id: number; name: string }[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface BrandResponse {
  content: { id: number; name: string }[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Mocks de las respuestas
const mockCategories: CategoryResponse = {
  content: [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
  ],
  page: 0,
  size: 2,
  totalElements: 2,
  totalPages: 1,
};

const mockBrands: BrandResponse = {
  content: [
    { id: 1, name: 'Brand 1' },
    { id: 2, name: 'Brand 2' },
  ],
  page: 0,
  size: 2,
  totalElements: 2,
  totalPages: 1,
};

describe('CreateItemComponent', () => {
  let component: CreateItemComponent;
  let fixture: ComponentFixture<CreateItemComponent>;
  let categoryService: jest.Mocked<CategoryService>;
  let brandService: jest.Mocked<BrandService>;
  let itemService: jest.Mocked<ItemService>;

  beforeEach(async () => {
    categoryService = {
      getCategories: jest.fn(),
    } as unknown as jest.Mocked<CategoryService>;

    brandService = {
      getBrand: jest.fn(),
    } as unknown as jest.Mocked<BrandService>;

    itemService = {
      createItem: jest.fn(),
    } as unknown as jest.Mocked<ItemService>;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
      declarations: [CreateItemComponent],
      providers: [
        { provide: CategoryService, useValue: categoryService },
        { provide: BrandService, useValue: brandService },
        { provide: ItemService, useValue: itemService }, // Proveedor para ItemService
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateItemComponent);
    component = fixture.componentInstance;
  });

  it('should load categories on init', async () => {
    // @ts-ignore
    categoryService.getCategories.mockReturnValue(of(mockCategories));

    await component.loadCategories();

    expect(component.categoryData).toEqual(mockCategories.content);
    expect(categoryService.getCategories).toHaveBeenCalledWith(0, 100, true);
  });

  it('should load brands on init', async () => {
    // @ts-ignore
    brandService.getBrand.mockReturnValue(of(mockBrands));

    await component.loadBrands();

    expect(component.brandData).toEqual(mockBrands.content);
    expect(brandService.getBrand).toHaveBeenCalledWith(0, 100, true);
  });
});
