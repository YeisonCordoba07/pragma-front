import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemComponent } from './create-item.component';
import {of, throwError} from "rxjs";
import {ItemService} from "../../services/item/item.service";
import {CategoryService} from "../../services/category/category.service";
import {BrandService} from "../../services/brand/brand.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CreateItemComponent', () => {
  let component: CreateItemComponent;
  let fixture: ComponentFixture<CreateItemComponent>;
  let mockItemService: any;
  let mockCategoryService: any;
  let mockBrandService: any;

  beforeEach(async () => {

    mockItemService = {
      createItem: jest.fn()
    };
    mockCategoryService = {
      getCategories: jest.fn().mockReturnValue(of({ content: [{ name: 'Electronics' }, { name: 'Books' }] }))
    };
    mockBrandService = {
      getBrand: jest.fn().mockReturnValue(of({ content: [{ name: 'Apple' }, { name: 'Samsung' }] }))
    };


    await TestBed.configureTestingModule({
      declarations: [ CreateItemComponent ],
      providers: [
        { provide: ItemService, useValue: mockItemService },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: BrandService, useValue: mockBrandService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load categories on init', async () => {
    await component.loadCategories();
    expect(mockCategoryService.getCategories).toHaveBeenCalled();
    expect(component.categoryData.length).toBe(2); // Dos categorías cargadas
  });

  it('should load brands on init', async () => {
    await component.loadBrands();
    expect(mockBrandService.getBrand).toHaveBeenCalled();
    expect(component.brandData.length).toBe(2); // Dos marcas cargadas
  });

  it('should show success toast on successful item creation', async () => {
    mockItemService.createItem.mockReturnValue(of({ status: 201 }));

    const formData = {
      name: 'Test Item',
      description: 'Test Description',
      quantity: 5,
      price: 100,
      categories: ['Electronics'],
      brandName: 'Apple'
    };

    await component.createItem(formData);

    expect(mockItemService.createItem).toHaveBeenCalledWith({
      name: 'Test Item',
      description: 'Test Description',
      quantity: 5,
      price: 100,
      categories: ['Electronics'],
      brandName: 'Apple'
    }, component.token);

    expect(component.typeToastMessage).toBe('success');
    expect(component.toastMessage).toBe('Articulo creado exitosamente');
    expect(component.showToast).toBeTruthy();
  });

  it('should show error toast on failed item creation', async () => {
    mockItemService.createItem.mockReturnValue(throwError(() => new Error('Error al enviar la solicitud')));

    const formData = {
      name: 'Test Item',
      description: 'Test Description',
      quantity: 5,
      price: 100,
      categories: ['Electronics'],
      brandName: 'Apple'
    };

    await component.createItem(formData);

    expect(component.typeToastMessage).toBe('error');
    expect(component.toastMessage).toBe('Error al enviar la solicitud');
    expect(component.showToast).toBeTruthy();
  });

  it('should hide toast after 5 seconds', () => {
    jest.useFakeTimers();
    component.showCustomToast('Test Toast');
    expect(component.showToast).toBeTruthy();

    jest.advanceTimersByTime(5000);
    expect(component.showToast).toBeFalsy();

    jest.useRealTimers();
  });






  describe('loadCategories', () => {
    it('should load categories successfully', async () => {
      const mockCategoriesResponse = { content: ['CategoryModels 1', 'CategoryModels 2'] };
      mockCategoryService.getCategories.mockReturnValue(of(mockCategoriesResponse));

      await component.loadCategories();

      expect(component.categoryData).toEqual(mockCategoriesResponse.content);
    });

    it('should handle error when loading categories', async () => {
      const error = 'Error loading categories';
      mockCategoryService.getCategories.mockReturnValue(throwError(() => new Error(error)));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await component.loadCategories();

      expect(consoleSpy).toHaveBeenCalledWith('Error al obtener brands:', new Error(error));
      consoleSpy.mockRestore();
    });
  });

  // Tests de carga de marcas
  describe('loadBrands', () => {
    it('should load brands successfully', async () => {
      const mockBrandsResponse = { content: ['Brand 1', 'Brand 2'] };
      mockBrandService.getBrand.mockReturnValue(of(mockBrandsResponse));

      await component.loadBrands();

      expect(component.brandData).toEqual(mockBrandsResponse.content);
    });

    it('should handle error when loading brands', async () => {
      const error = 'Error loading brands';
      mockBrandService.getBrand.mockReturnValue(throwError(() => new Error(error)));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await component.loadBrands();

      expect(consoleSpy).toHaveBeenCalledWith('Error al obtener brands:', new Error(error));
      consoleSpy.mockRestore();
    });
  });

  // Test de creación de artículo
  describe('createItem', () => {
    it('should create an item successfully and show a success toast', async () => {
      const mockFormData = {
        name: 'Test Item',
        description: 'Test Description',
        quantity: 10,
        price: 100,
        categories: ['Electronics'],
        brandName: 'Apple'
      };

      // Simula la respuesta exitosa
      mockItemService.createItem.mockReturnValue(of({ status: 201 }));

      const toastSpy = jest.spyOn(component, 'showCustomToast');

      await component.createItem(mockFormData);

      expect(component.typeToastMessage).toBe('success');
      expect(toastSpy).toHaveBeenCalledWith('Articulo creado exitosamente');
    });

    it('should handle error when creating an item and show an error toast', async () => {
      const mockFormData = {
        name: 'Test Item',
        description: 'Test Description',
        quantity: 10,
        price: 100,
        categories: ['Electronics'],
        brandName: 'Apple'
      };

      // Simula un error en la creación del item
      mockItemService.createItem.mockReturnValue(throwError(() => new Error('Error creating item')));

      const toastSpy = jest.spyOn(component, 'showCustomToast');

      await component.createItem(mockFormData);

      expect(component.typeToastMessage).toBe('error');
      expect(toastSpy).toHaveBeenCalledWith('Error al enviar la solicitud');
    });
  });

  // Test del metodo showCustomToast
  describe('showCustomToast', () => {
    it('should show and hide the toast after 5 seconds', () => {
      jest.useFakeTimers();
      component.showCustomToast('Test message');

      expect(component.showToast).toBe(true);
      expect(component.toastMessage).toBe('Test message');

      // Avanza el tiempo 5 segundos
      jest.advanceTimersByTime(5000);

      expect(component.showToast).toBe(false);
      jest.useRealTimers();
    });
  });
});
