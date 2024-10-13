import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoriesComponent } from './get-categories.component';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import { By } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";


describe('GetCategoriesComponent', () => {
  let component: GetCategoriesComponent;
  let fixture: ComponentFixture<GetCategoriesComponent>;
  let mockCategoryService: CategoryService;

  beforeEach(async () => {
    mockCategoryService = {
      getCategories: jest.fn()
    } as unknown as CategoryService;



    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ GetCategoriesComponent ],
      providers: [{ provide: CategoryService, useValue: mockCategoryService  }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load categories on init', async () => {
    const mockResponse = {
      content: [{ id: 1, name: 'Categoria 1', description: 'Descripción 1' }],
      page: 0,
      size: 5,
      totalElements: 1,
      totalPages: 1
    };

    jest.spyOn(mockCategoryService, 'getCategories').mockReturnValue(of(mockResponse));

    await component.loadCategories();

    expect(component.categories.length).toBe(1);
    expect(component.categories[0].name).toBe('Categoria 1');
    expect(component.page).toBe(0);
    expect(component.totalPages).toBe(1);
  });

  it('should log error when loading categories fails', async () => {
    jest.spyOn(mockCategoryService, 'getCategories').mockReturnValue(throwError(() => new Error('API Error')));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    await component.loadCategories();

    expect(consoleSpy).toHaveBeenCalledWith('Error al obtener las categorías:', expect.any(Error));
  });

  it('should go to the next page if available', async () => {
    component.page = 0;
    component.totalPages = 2;

    const mockResponse = { content: [], page: 1, size: 5, totalElements: 10, totalPages: 2 };
    jest.spyOn(mockCategoryService, 'getCategories').mockReturnValue(of(mockResponse));

    component.nextPage();

    expect(component.page).toBe(1);
  });

  it('should not go to the next page if on the last page', () => {
    component.page = 1;
    component.totalPages = 2;

    component.nextPage();

    expect(component.page).toBe(1); // No debe cambiar
  });

  it('should go to the previous page if available', () => {
    component.page = 1;
    component.prevPage();

    expect(component.page).toBe(0);
  });

  it('should not go to the previous page if on the first page', () => {
    component.page = 0;
    component.prevPage();

    expect(component.page).toBe(0); // No debe cambiar
  });

  it('should toggle ascending and reload categories', () => {
    jest.spyOn(component, 'loadCategories');

    component.ascending = true;
    component.changeAscending();

    expect(component.ascending).toBe(false);
    expect(component.loadCategories).toHaveBeenCalled();
  });

});
