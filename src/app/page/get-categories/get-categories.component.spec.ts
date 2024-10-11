import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoriesComponent } from './get-categories.component';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";


describe('GetCategoriesComponent', () => {
  let component: GetCategoriesComponent;
  let fixture: ComponentFixture<GetCategoriesComponent>;
  let categoryServiceMock: any;

  beforeEach(async () => {
    categoryServiceMock = {
      getCategories: jest.fn().mockReturnValue(of({
        content: [
          { id: 1, name: 'Category 1', description: 'Description 1' },
          { id: 2, name: 'Category 2', description: 'Description 2' },
        ],
        page: 0,
        size: 10,
        totalElements: 2,
        totalPages: 1,
      })),
    };



    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ GetCategoriesComponent ],
      providers: [{ provide: CategoryService, useValue: categoryServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render the select element for sorting', () => {
    component.categories = [
      { id: 1, name: 'Category 1', description: 'Description 1' }
    ]; // Asigna categorías para activar el *ngIf
    fixture.detectChanges(); // Refresca la vista para que la plantilla se renderice correctamente

    const selectElement = fixture.debugElement.query(By.css('#orderSelect'));
    expect(selectElement).toBeTruthy(); // Verifica si el select existe
    expect(selectElement.nativeElement.options.length).toBe(2); // Ascendente y Descendente
  });


  it('should render a table with categories', () => {
    component.categories = [
      { id: 1, name: 'Category 1', description: 'Description 1' },
      { id: 2, name: 'Category 2', description: 'Description 2' },
    ];
    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(2);

    const firstRowColumns = tableRows[0].queryAll(By.css('td'));
    expect(firstRowColumns[0].nativeElement.textContent).toContain('1');
    expect(firstRowColumns[1].nativeElement.textContent).toContain('Category 1');
    expect(firstRowColumns[2].nativeElement.textContent).toContain('Description 1');
  });

  it('should disable the prev button on the first page', () => {
    component.page = 0;
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(By.css('.right-button')).nativeElement;
    expect(prevButton.disabled).toBe(true);
  });

  it('should disable the next button on the last page', () => {
    component.page = 0;
    component.totalPages = 1;
    fixture.detectChanges();

    const nextButton = fixture.debugElement.query(By.css('.left-button')).nativeElement;
    expect(nextButton.disabled).toBe(true);
  });
/*

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
