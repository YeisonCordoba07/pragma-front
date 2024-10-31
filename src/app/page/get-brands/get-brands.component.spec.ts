import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetBrandsComponent } from './get-brands.component';
import { BrandService } from '../../services/brand/brand.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('GetBrandsComponent', () => {
  let component: GetBrandsComponent;
  let fixture: ComponentFixture<GetBrandsComponent>;
  let brandServiceMock: jest.Mocked<BrandService>;

  beforeEach(async () => {
    // Mock de BrandService
    brandServiceMock = {
      getBrand: jest.fn(),
    } as unknown as jest.Mocked<BrandService>;

    await TestBed.configureTestingModule({
      declarations: [GetBrandsComponent],
      providers: [
        { provide: BrandService, useValue: brandServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Método loadBrands', () => {
    it('debería cargar los datos de las marcas correctamente', async () => {
      const mockResponse = {
        content: [
          { id: 1, name: 'Marca 1', description: 'Descripción 1' },
          { id: 2, name: 'Marca 2', description: 'Descripción 2' }
        ],
        page: 0,
        size: 5,
        totalElements: 10,
        totalPages: 2
      };
      brandServiceMock.getBrand.mockReturnValue(of(mockResponse));

      await component.loadBrands();

      expect(component.brandData).toEqual(mockResponse.content);
      expect(component.page).toBe(mockResponse.page);
      expect(component.size).toBe(mockResponse.size);
      expect(component.totalElements).toBe(mockResponse.totalElements);
      expect(component.totalPages).toBe(mockResponse.totalPages);
    });

  });

  describe('Métodos de paginación', () => {
    beforeEach(() => {
      component.page = 1;
      component.totalPages = 3;
    });

    it('debería disminuir la página en prevPage y cargar datos', async () => {
      const loadBrandsSpy = jest.spyOn(component, 'loadBrands').mockImplementation();
      component.prevPage();

      expect(component.page).toBe(0);
      expect(loadBrandsSpy).toHaveBeenCalled();
      loadBrandsSpy.mockRestore();
    });

    it('debería aumentar la página en nextPage y cargar datos', async () => {
      const loadBrandsSpy = jest.spyOn(component, 'loadBrands').mockImplementation();
      component.nextPage();

      expect(component.page).toBe(2);
      expect(loadBrandsSpy).toHaveBeenCalled();
      loadBrandsSpy.mockRestore();
    });

    it('no debería disminuir la página por debajo de 0 en prevPage', async () => {
      component.page = 0;
      const loadBrandsSpy = jest.spyOn(component, 'loadBrands').mockImplementation();

      component.prevPage();

      expect(component.page).toBe(0);
      expect(loadBrandsSpy).not.toHaveBeenCalled();
      loadBrandsSpy.mockRestore();
    });

    it('no debería aumentar la página más allá de totalPages - 1 en nextPage', async () => {
      component.page = component.totalPages - 1;
      const loadBrandsSpy = jest.spyOn(component, 'loadBrands').mockImplementation();

      component.nextPage();

      expect(component.page).toBe(component.totalPages - 1);
      expect(loadBrandsSpy).not.toHaveBeenCalled();
      loadBrandsSpy.mockRestore();
    });
  });

  describe('Método changeAscending', () => {
    it('debería cambiar el valor de ascending y recargar las marcas', () => {
      const loadBrandsSpy = jest.spyOn(component, 'loadBrands').mockImplementation();
      const initialAscending = component.ascending;

      component.changeAscending();

      expect(component.ascending).toBe(!initialAscending);
      expect(loadBrandsSpy).toHaveBeenCalled();
      loadBrandsSpy.mockRestore();
    });
  });
});
