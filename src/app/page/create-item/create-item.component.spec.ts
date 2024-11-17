import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { CreateItemComponent } from './create-item.component';
import { CategoryService } from '../../services/category/category.service';
import { BrandService } from '../../services/brand/brand.service';
import { ItemService } from '../../services/item/item.service'; // Asegúrate de importar tu ItemService
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas para HttpClient
import {of, throwError} from 'rxjs';
import {FormBuilder, FormControl} from '@angular/forms';
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










  it('should return the form control for name', () => {
    const control = component.name;
    expect(control).toBe(component.formItem.get('name'));
  });

  it('should return the form control for description', () => {
    const control = component.description;
    expect(control).toBe(component.formItem.get('description'));
  });

  it('should return the form control for quantity', () => {
    const control = component.quantity;
    expect(control).toBe(component.formItem.get('quantity'));
  });

  it('should return the form control for price', () => {
    const control = component.price;
    expect(control).toBe(component.formItem.get('price'));
  });

  it('should return the form control for categories', () => {
    const control = component.categories;
    expect(control).toBe(component.formItem.get('categories'));
  });

  it('should return the form control for brandName', () => {
    const control = component.brandName;
    expect(control).toBe(component.formItem.get('brandName'));
  });





  it('should call loadCategories and loadBrands on init', () => {
    const loadCategoriesSpy = jest.spyOn(component, 'loadCategories');
    const loadBrandsSpy = jest.spyOn(component, 'loadBrands');

    component.ngOnInit();

    expect(loadCategoriesSpy).toHaveBeenCalled();
    expect(loadBrandsSpy).toHaveBeenCalled();
  });





  it('should create an item and show success toast', async () => {
    const newItem = {
      name: 'Item Test',
      description: 'Test Description',
      quantity: 10,
      price: 100,
      categories: ['Category1'],
      brandName: 'BrandTest',
    };

    component.formItem.setValue(newItem);
    itemService.createItem = jest.fn().mockReturnValue(of({ status: 201 }));

    await component.createItem(newItem);

    expect(itemService.createItem).toHaveBeenCalledWith(newItem);
    expect(component.typeToastMessage).toBe('success');
    expect(component.showToast).toBe(true);
  });

  it('should show error toast on createItem failure', async () => {
    const newItem = {
      name: 'Item Test',
      description: 'Test Description',
      quantity: 10,
      price: 100,
      categories: ['Category1'],
      brandName: 'BrandTest',
    };
    component.formItem.setValue(newItem);
    itemService.createItem = jest.fn().mockReturnValue(throwError(() => new Error('Error')));

    await component.createItem(newItem);

    expect(itemService.createItem).toHaveBeenCalledWith(newItem);
    expect(component.typeToastMessage).toBe('error');
    expect(component.showToast).toBe(true);
  });

  it('should set showToast to false after 5 seconds', fakeAsync(() => {
    component.showCustomToast('Test message'); // Llama al metodo para mostrar el toast
    expect(component.showToast).toBe(true); // Verifica que showToast sea verdadero inicialmente

    tick(5000); // Simula el paso de 5 segundos

    expect(component.showToast).toBe(false); // Verifica que showToast se haya vuelto falso
  }));




  it('should return null when the array length is less than or equal to the max value', () => {
    const control = new FormControl([1, 2, 3]);
    const validator = component.maxArrayLength(3);

    expect(validator(control)).toBeNull();  // Null significa que el valor es válido
  });

  it('should return an error object when the array length exceeds the max value', () => {
    const control = new FormControl([1, 2, 3, 4]);
    const validator = component.maxArrayLength(3);

    expect(validator(control)).toEqual({ maxlength: true });
  });

  it('should return null when the array is empty', () => {
    const control = new FormControl([]);
    const validator = component.maxArrayLength(3);

    expect(validator(control)).toBeNull();  // Null ya que un array vacío es considerado válido
  });

});
