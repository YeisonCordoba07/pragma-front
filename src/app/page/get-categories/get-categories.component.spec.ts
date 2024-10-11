import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoriesComponent } from './get-categories.component';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

class MockCategoryService {
  getCategories = jest.fn(); // Simulamos el metodo del servicio
}


describe('GetCategoriesComponent', () => {
  let component: GetCategoriesComponent;
  let fixture: ComponentFixture<GetCategoriesComponent>;
  let categoryService: MockCategoryService;

  beforeEach(async () => {




    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GetCategoriesComponent ],
      providers: [{ provide: CategoryService, useClass: MockCategoryService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCategoriesComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as unknown as MockCategoryService;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should load categories on init', () => {
    const mockCategoriesResponse = {
      content: [
        { id: 1, name: 'Category 1', description: 'Description 1' },
        { id: 2, name: 'Category 2', description: 'Description 2' },
      ],
      page: 0,
      size: 5,
      totalElements: 10,
      totalPages: 2,
    };

    // Simulamos la respuesta del servicio
    jest.spyOn(categoryService, 'getCategories').mockReturnValue(of(mockCategoriesResponse));

    component.ngOnInit(); // Simulamos el ciclo de vida de Angular

    expect(component.categories.length).toBe(2); // Verificamos que se cargaron las categorías
    expect(component.page).toBe(0);
    expect(component.size).toBe(5);
    expect(component.totalElements).toBe(10);
    expect(component.totalPages).toBe(2);
  });

  it('should move to the next page', () => {
    component.totalPages = 2;
    component.page = 0;

    const mockCategoriesResponse = {
      content: [{ id: 3, name: 'Category 3', description: 'Description 3' }],
      page: 1,
      size: 5,
      totalElements: 10,
      totalPages: 2,
    };

    jest.spyOn(categoryService, 'getCategories').mockReturnValue(of(mockCategoriesResponse));

    component.nextPage();

    expect(component.page).toBe(1);
    expect(categoryService.getCategories).toHaveBeenCalledWith(1, 5, component['token']);
  });

  it('should not move to the next page if on last page', () => {
    component.page = 1;
    component.totalPages = 2;

    component.nextPage();

    expect(component.page).toBe(1); // La página no debería cambiar
    expect(categoryService.getCategories).not.toHaveBeenCalled(); // No se debería llamar a la API
  });

  it('should move to the previous page', () => {
    component.page = 1;

    const mockCategoriesResponse = {
      content: [{ id: 1, name: 'Category 1', description: 'Description 1' }],
      page: 0,
      size: 5,
      totalElements: 10,
      totalPages: 2,
    };

    jest.spyOn(categoryService, 'getCategories').mockReturnValue(of(mockCategoriesResponse));

    component.prevPage();

    expect(component.page).toBe(0);
    expect(categoryService.getCategories).toHaveBeenCalledWith(0, 5, component['token']);
  });

  it('should not move to the previous page if on first page', () => {
    component.page = 0;

    component.prevPage();

    expect(component.page).toBe(0); // La página no debería cambiar
    expect(categoryService.getCategories).not.toHaveBeenCalled(); // No se debería llamar a la API
  });*/
});
