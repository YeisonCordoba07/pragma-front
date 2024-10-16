import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrandComponent } from './create-brand.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of, throwError} from "rxjs";
import {BrandService} from "../../services/brand/brand.service";


class MockBrandService {
  createBrand = jest.fn();
}

describe('CreateBrandComponent', () => {
  let component: CreateBrandComponent;
  let fixture: ComponentFixture<CreateBrandComponent>;
  let brandService: MockBrandService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBrandComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [{ provide: BrandService, useClass: MockBrandService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBrandComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService) as unknown as MockBrandService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




  it('should display toast with the correct message and hide after 5 seconds', () => {
    jest.useFakeTimers(); // Activa los temporizadores simulados de Jest

    const testMessage = 'Test Toast Message';

    // Llamamos al método
    component.showCustomToast(testMessage);

    // Verificamos que el mensaje de toast y el estado de visibilidad sean correctos inicialmente
    expect(component.toastMessage).toBe(testMessage);
    expect(component.showToast).toBe(true);

    // Avanzamos los temporizadores 5 segundos (5000 ms)
    jest.advanceTimersByTime(5000);

    // Verificamos que el toast se haya ocultado después de 5 segundos
    expect(component.showToast).toBe(false);

    jest.useRealTimers(); // Restauramos los temporizadores reales
  });


  it('should set nameError when name exceeds 50 characters', () => {
    component.updateBrandValues('name', 'a'.repeat(51));
    expect(component.nameError).toBe('El nombre no puede tener más de 50 caracteres.');
  });

  it('should set nameError when name length is 0', () => {
    component.updateBrandValues('name', '');
    expect(component.nameError).toBe('El nombre no puede estar vacio.');
  });

  it('should not set nameError when name is valid', () => {
    component.updateBrandValues('name', 'Valid Name');
    expect(component.nameError).toBe('');
    expect(component.brandName).toBe('Valid Name');
  });



  it('should set descriptionError when description exceeds 121 characters', () => {
    component.updateBrandValues('description', 'a'.repeat(121));
    expect(component.descriptionError).toBe('La descripción no puede tener más de 120 caracteres.');
  });
  it('should set descriptionError when name length is 0', () => {
    component.updateBrandValues('description', '');
    expect(component.nameError).toBe('La descripción no puede estar vacia.');
  });

  it('should not set descriptionError when description is valid', () => {
    component.updateBrandValues('description', 'Valid Description');
    expect(component.descriptionError).toBe('');
    expect(component.brandDescription).toBe('Valid Description');
  });



  it('should call createCategory service when form is valid', () => {
    component.updateBrandValues('name', 'Valid Name');
    component.updateBrandValues('description', 'Valid Description');

    brandService.createBrand.mockReturnValue(of({ status: 201 })); // Simular respuesta exitosa

    component.createBrand();

    expect(brandService.createBrand).toHaveBeenCalledWith(
      { name: 'Valid Name', description: 'Valid Description' },
      component['token']
    );
  });

  it('should set categoryStatus on successful creation', async () => {
    component.updateBrandValues('name', 'Valid Name');
    component.updateBrandValues('description', 'Valid Description');

    brandService.createBrand.mockReturnValue(of({ status: 201 })); // Simular respuesta exitosa

    await component.createBrand();

    expect(component.brandStatus).toBe('Marca creada exitosamente');
  });

  it('should set brandStatus on unsuccessful creation', async () => {
    component.updateBrandValues('name', 'Valid Name');
    component.updateBrandValues('description', 'Valid Description');

    brandService.createBrand.mockReturnValue(of({ status: 400 })); // Simular respuesta de error

    await component.createBrand();

    expect(component.brandStatus).toBe('... al crear marca');
  });

  it('should set categoryStatus on error', async () => {
    component.updateBrandValues('name', 'Valid Name');
    component.updateBrandValues('description', 'Valid Description');

    brandService.createBrand.mockReturnValue(throwError(() => new Error('Error'))); // Simular error

    await component.createBrand();

    expect(component.brandStatus).toBe('Error al enviar la solicitud');
  });
});
