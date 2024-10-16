import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryService } from '../../services/category/category.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetCategoriesComponent } from './get-categories.component';

describe('SecondPageComponent', () => {
  let component: GetCategoriesComponent;
  let fixture: ComponentFixture<GetCategoriesComponent>;
  let mockCategoryService: any;

  beforeEach(async () => {
    mockCategoryService = {
      getCategories: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ GetCategoriesComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService }
      ]
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
      content: [
        { id: 1, name: 'Category 1', description: 'Description 1' },
        { id: 2, name: 'Category 2', description: 'Description 2' }
      ],
      page: 0,
      size: 5,
      totalElements: 2,
      totalPages: 1
    };

    mockCategoryService.getCategories.mockReturnValue(of(mockResponse));

    await component.ngOnInit();

    expect(component.categoryData.length).toBe(2);
    expect(component.page).toBe(0);
    expect(component.size).toBe(5);
    expect(component.totalElements).toBe(2);
    expect(component.totalPages).toBe(1);
  });

  it('should call categoryService.getCategories with the correct parameters', async () => {
    const mockResponse = {
      content: [],
      page: 0,
      size: 5,
      totalElements: 0,
      totalPages: 0
    };
    mockCategoryService.getCategories.mockReturnValue(of(mockResponse));

    await component.loadCategories();

    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(0, 5, component.token, true);
  });

  it('should go to the next page if available', async () => {
    const mockResponse = {
      content: [],
      page: 0,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };
    mockCategoryService.getCategories.mockReturnValue(of(mockResponse));

    await component.loadCategories();
    component.nextPage();

    expect(component.page).toBe(1); // Página siguiente
    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(1, 5, component.token, true);
  });

  it('should not go to the next page if already on the last page', async () => {
    const mockResponse = {
      content: [],
      page: 1,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };
    mockCategoryService.getCategories.mockReturnValue(of(mockResponse));

    await component.loadCategories();
    component.page = 1; // Establecer en la última página
    component.nextPage();

    expect(component.page).toBe(1); // No debería incrementar
  });

  it('should go to the previous page if not on the first page', async () => {
    const mockResponse = {
      content: [],
      page: 1,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };
    mockCategoryService.getCategories.mockReturnValue(of(mockResponse));

    await component.loadCategories();
    component.prevPage();

    expect(component.page).toBe(0); // Página anterior
    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(0, 5, component.token, true);
  });

  it('should toggle ascending order when changeAscending is called', async () => {
    component.ascending = true;
    component.changeAscending();

    expect(component.ascending).toBe(false);
    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(0, 5, component.token, false);

    component.changeAscending();

    expect(component.ascending).toBe(true);
    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(0, 5, component.token, true);
  });



  it('should log an error if no response is received from the API (response is null)', async () => {
    mockCategoryService.getCategories.mockReturnValue(of(null));

    const consoleErrorSpy = jest.spyOn(console, 'error');
    await component.loadCategories();

    expect(consoleErrorSpy).toHaveBeenCalledWith('No se recibieron datos de la API.');

    consoleErrorSpy.mockRestore();
  });

  it('should log an error if no response is received from the API (response is undefined)', async () => {
    mockCategoryService.getCategories.mockReturnValue(of(undefined));

    const consoleErrorSpy = jest.spyOn(console, 'error');

    await component.loadCategories();

    // Verifica que se haya llamado a console.error
    expect(consoleErrorSpy).toHaveBeenCalledWith('No se recibieron datos de la API.');

    // Limpia el espia de console.error
    consoleErrorSpy.mockRestore();
  });

});
