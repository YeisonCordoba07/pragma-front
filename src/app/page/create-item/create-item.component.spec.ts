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
});
