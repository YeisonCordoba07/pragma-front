import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBrandsComponent } from './get-brands.component';
import {of} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrandService} from "../../services/brand/brand.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('GetBrandsComponent', () => {
  let component: GetBrandsComponent;
  let fixture: ComponentFixture<GetBrandsComponent>;
  let mockBrandService: any;

  beforeEach(async () => {

    mockBrandService = {
      getBrand: jest.fn()
    };
    await TestBed.configureTestingModule({
      declarations: [ GetBrandsComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BrandService, useValue: mockBrandService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load brands on init', async () => {
    const mockResponse = {
      content: [
        { id: 1, name: 'Brand 1', description: 'Description 1' },
        { id: 2, name: 'Brand 2', description: 'Description 2' }
      ],
      page: 0,
      size: 5,
      totalElements: 2,
      totalPages: 1
    };

    mockBrandService.getBrand.mockReturnValue(of(mockResponse));

    await component.ngOnInit();

    expect(component.brandData.length).toBe(2);
    expect(component.page).toBe(0);
    expect(component.size).toBe(5);
    expect(component.totalElements).toBe(2);
    expect(component.totalPages).toBe(1);
  });

  it('should call brandService.getBrands with the correct parameters', async () => {
    const mockResponse = {
      content: [],
      page: 0,
      size: 5,
      totalElements: 0,
      totalPages: 0
    };
    mockBrandService.getBrand.mockReturnValue(of(mockResponse));

    await component.loadBrands();

    expect(mockBrandService.getBrand).toHaveBeenCalledWith(0, 5, component.token, true);
  });

  it('should go to the next page if available', async () => {
    const mockResponse = {
      content: [],
      page: 0,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };
    mockBrandService.getBrand.mockReturnValue(of(mockResponse));

    await component.loadBrands();
    component.nextPage();

    expect(component.page).toBe(1); // Página siguiente
    expect(mockBrandService.getBrand).toHaveBeenCalledWith(1, 5, component.token, true);
  });

  it('should not go to the next page if already on the last page', async () => {
    const mockResponse = {
      content: [],
      page: 1,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };
    mockBrandService.getBrand.mockReturnValue(of(mockResponse));

    await component.loadBrands();
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
    mockBrandService.getBrand.mockReturnValue(of(mockResponse));

    await component.loadBrands();
    component.prevPage();

    expect(component.page).toBe(0); // Página anterior
    expect(mockBrandService.getBrand).toHaveBeenCalledWith(0, 5, component.token, true);
  });

  it('should toggle ascending order when changeAscending is called', async () => {
    component.ascending = true;
    component.changeAscending();

    expect(component.ascending).toBe(false);
    expect(mockBrandService.getBrand).toHaveBeenCalledWith(0, 5, component.token, false);

    component.changeAscending();

    expect(component.ascending).toBe(true);
    expect(mockBrandService.getBrand).toHaveBeenCalledWith(0, 5, component.token, true);
  });



  it('should log an error if no response is received from the API (response is null)', async () => {
    mockBrandService.getBrand.mockReturnValue(of(null));

    const consoleErrorSpy = jest.spyOn(console, 'error');
    await component.loadBrands();

    expect(consoleErrorSpy).toHaveBeenCalledWith('No se recibieron datos de la API.');

    consoleErrorSpy.mockRestore();
  });

  it('should log an error if no response is received from the API (response is undefined)', async () => {
    mockBrandService.getBrand.mockReturnValue(of(undefined));

    const consoleErrorSpy = jest.spyOn(console, 'error');

    await component.loadBrands();

    // Verifica que se haya llamado a console.error
    expect(consoleErrorSpy).toHaveBeenCalledWith('No se recibieron datos de la API.');

    // Limpia el espia de console.error
    consoleErrorSpy.mockRestore();
  });
});
