import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetCategoriesComponent } from './get-categories.component';
import { CategoryService } from '../../services/category/category.service';
import {of, throwError} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('GetCategoriesComponent', () => {
  let component: GetCategoriesComponent;
  let fixture: ComponentFixture<GetCategoriesComponent>;
  let categoryServiceMock: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    // Crear un mock de CategoryService
    categoryServiceMock = {
      getCategories: jest.fn()
    } as unknown as jest.Mocked<CategoryService>;

    await TestBed.configureTestingModule({
      declarations: [GetCategoriesComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  describe('Método loadCategories', () => {
    it('debería cargar los datos de las categorías correctamente', async () => {
      const mockResponse = {
        content: [
          { id: 1, name: 'Categoría 1', description: 'Descripción 1' },
          { id: 2, name: 'Categoría 2', description: 'Descripción 2' }
        ],
        page: 0,
        size: 5,
        totalElements: 10,
        totalPages: 2
      };
      categoryServiceMock.getCategories.mockReturnValue(of(mockResponse));

      await component.loadCategories();

      expect(component.categoryData).toEqual(mockResponse.content);
      expect(component.page).toBe(mockResponse.page);
      expect(component.size).toBe(mockResponse.size);
      expect(component.totalElements).toBe(mockResponse.totalElements);
      expect(component.totalPages).toBe(mockResponse.totalPages);
    });

    it('debería manejar errores al cargar las categorías', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      categoryServiceMock.getCategories.mockReturnValueOnce(throwError(() => new Error('Error al obtener categorías')));

      await component.loadCategories();

      expect(consoleSpy).toHaveBeenCalledWith('Error al obtener las categorías:', expect.any(Error));
      expect(component.categoryData).toEqual([]);
      consoleSpy.mockRestore();
    });
  });

  describe('Métodos de paginación', () => {
    beforeEach(() => {
      component.page = 1;
      component.totalPages = 3;
    });

    it('debería disminuir la página en prevPage y cargar datos', async () => {
      const loadCategoriesSpy = jest.spyOn(component, 'loadCategories').mockImplementation();
      component.prevPage();

      expect(component.page).toBe(0);
      expect(loadCategoriesSpy).toHaveBeenCalled();
      loadCategoriesSpy.mockRestore();
    });

    it('debería aumentar la página en nextPage y cargar datos', async () => {
      const loadCategoriesSpy = jest.spyOn(component, 'loadCategories').mockImplementation();
      component.nextPage();

      expect(component.page).toBe(2);
      expect(loadCategoriesSpy).toHaveBeenCalled();
      loadCategoriesSpy.mockRestore();
    });

    it('no debería disminuir la página por debajo de 0 en prevPage', async () => {
      component.page = 0;
      const loadCategoriesSpy = jest.spyOn(component, 'loadCategories').mockImplementation();

      component.prevPage();

      expect(component.page).toBe(0);
      expect(loadCategoriesSpy).not.toHaveBeenCalled();
      loadCategoriesSpy.mockRestore();
    });

    it('no debería aumentar la página más allá de totalPages - 1 en nextPage', async () => {
      component.page = component.totalPages - 1;
      const loadCategoriesSpy = jest.spyOn(component, 'loadCategories').mockImplementation();

      component.nextPage();

      expect(component.page).toBe(component.totalPages - 1);
      expect(loadCategoriesSpy).not.toHaveBeenCalled();
      loadCategoriesSpy.mockRestore();
    });
  });

  describe('Método changeAscending', () => {
    it('debería cambiar el valor de ascending y recargar las categorías', () => {
      const loadCategoriesSpy = jest.spyOn(component, 'loadCategories').mockImplementation();
      const initialAscending = component.ascending;

      component.changeAscending();

      expect(component.ascending).toBe(!initialAscending);
      expect(loadCategoriesSpy).toHaveBeenCalled();
      loadCategoriesSpy.mockRestore();
    });
  });

});
