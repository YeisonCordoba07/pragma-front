import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetCategoriesComponent } from './get-categories.component';
import { CategoryService } from '../../services/category/category.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('GetCategoriesComponent', () => {
  let component: GetCategoriesComponent;
  let fixture: ComponentFixture<GetCategoriesComponent>;
  let categoryServiceMock: any;

  beforeEach(async () => {
    // Crear un mock de CategoryService
    categoryServiceMock = {
      getCategories: jest.fn()
    };

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

  it('should load categories on initialization', async () => {
    // Mockear la respuesta del servicio de categorías
    const mockResponse = {
      content: [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }],
      page: 0,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };
    categoryServiceMock.getCategories.mockReturnValue(of(mockResponse));

    // Ejecutar el método ngOnInit
    await component.ngOnInit();

    // Verificar que los datos de las categorías se hayan cargado correctamente
    expect(component.categoryData).toEqual(mockResponse.content);
    expect(component.page).toBe(mockResponse.page);
    expect(component.size).toBe(mockResponse.size);
    expect(component.totalElements).toBe(mockResponse.totalElements);
    expect(component.totalPages).toBe(mockResponse.totalPages);
  });

  it('should go to the previous page when prevPage() is called', async () => {
    component.page = 1; // Establece una página mayor que 0

    const mockResponse = {
      content: [{ id: 3, name: 'Category 3' }],
      page: 0,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };
    categoryServiceMock.getCategories.mockReturnValue(of(mockResponse));

    // Llamar al método prevPage()
    component.prevPage();
    await fixture.whenStable();

    // Verificar que la página haya disminuido
    expect(component.page).toBe(0);
    expect(categoryServiceMock.getCategories).toHaveBeenCalled();
  });

  it('should not go to the previous page if already on the first page', () => {
    component.page = 0; // Establece la página en 0
    const loadCategoriesSpy = jest.spyOn(component, 'loadCategories');

    // Llamar al método prevPage()
    component.prevPage();

    // Verificar que no se haya llamado a loadCategories
    expect(loadCategoriesSpy).not.toHaveBeenCalled();
  });

  it('should go to the next page when nextPage() is called', async () => {
    component.page = 0;
    component.totalPages = 2;

    const mockResponse = {
      content: [{ id: 4, name: 'Category 4' }],
      page: 1,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };
    categoryServiceMock.getCategories.mockReturnValue(of(mockResponse));

    // Llamar al método nextPage()
    component.nextPage();
    await fixture.whenStable();

    // Verificar que la página haya incrementado
    expect(component.page).toBe(1);
    expect(categoryServiceMock.getCategories).toHaveBeenCalled();
  });

  it('should not go to the next page if already on the last page', () => {
    component.page = 1;
    component.totalPages = 2;
    const loadCategoriesSpy = jest.spyOn(component, 'loadCategories');

    // Llamar al método nextPage()
    component.nextPage();

    // Verificar que no se haya llamado a loadCategories
    expect(loadCategoriesSpy).not.toHaveBeenCalled();
  });

  it('should toggle ascending order when changeAscending() is called', async () => {
    const mockResponse = {
      content: [{ id: 5, name: 'Category 5' }],
      page: 0,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };
    categoryServiceMock.getCategories.mockReturnValue(of(mockResponse));

    // El valor inicial de ascending es true, se debe cambiar a false
    component.changeAscending();
    await fixture.whenStable();

    expect(component.ascending).toBe(false);
    expect(categoryServiceMock.getCategories).toHaveBeenCalled();

    // Llamar de nuevo para volver a true
    component.changeAscending();
    await fixture.whenStable();

    expect(component.ascending).toBe(true);
  });

  it('should call prevPage on leftClick event from app-data-table', () => {
    const prevPageSpy = jest.spyOn(component, 'prevPage');

    const dataTable = fixture.debugElement.query(By.css('app-data-table'));
    dataTable.triggerEventHandler('leftClick', null);

    expect(prevPageSpy).toHaveBeenCalled();
  });

  it('should call nextPage on rightClick event from app-data-table', () => {
    const nextPageSpy = jest.spyOn(component, 'nextPage');

    const dataTable = fixture.debugElement.query(By.css('app-data-table'));
    dataTable.triggerEventHandler('rightClick', null);

    expect(nextPageSpy).toHaveBeenCalled();
  });

  it('should call changeAscending on changeSort event from app-data-table', () => {
    const changeAscendingSpy = jest.spyOn(component, 'changeAscending');

    const dataTable = fixture.debugElement.query(By.css('app-data-table'));
    dataTable.triggerEventHandler('changeSort', null);

    expect(changeAscendingSpy).toHaveBeenCalled();
  });
});
