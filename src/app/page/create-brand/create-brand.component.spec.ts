import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrandComponent } from './create-brand.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of, throwError} from "rxjs";
import {BrandService} from "../../services/brand/brand.service";
import {By} from "@angular/platform-browser";


describe('CreateBrandComponent', () => {
  let component: CreateBrandComponent;
  let fixture: ComponentFixture<CreateBrandComponent>;
  let mockBrandService: any;

  beforeEach(async () => {
    mockBrandService = {
      createBrand: jest.fn()
    };


    await TestBed.configureTestingModule({
      declarations: [ CreateBrandComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: BrandService, useValue: mockBrandService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




  // Test para el método showCustomToast
  it('should show and hide the toast message', () => {
    jest.useFakeTimers(); // Para controlar el setTimeout

    component.showCustomToast('Test message');
    expect(component.toastMessage).toBe('Test message');
    expect(component.showToast).toBe(true);

    jest.advanceTimersByTime(5000); // Avanza el tiempo para ocultar el toast
    expect(component.showToast).toBe(false);

    jest.useRealTimers();
  });

  // Verifica que se llame al servicio de crear marca y se maneje el éxito
  it('should call createBrand and handle success response', async () => {
    const formData = { name: 'Marca Test', description: 'Descripción de la marca' };
    const mockResponse = { status: 201 };
    mockBrandService.createBrand.mockReturnValue(of(mockResponse)); // Simula una respuesta exitosa

    await component.createBrand(formData);
    expect(mockBrandService.createBrand).toHaveBeenCalledWith(formData, component.token);
    expect(component.typeToastMessage).toBe('success');
    expect(component.toastMessage).toBe('Marca creada exitosamente');
  });

  // Verifica que se llame al servicio de crear marca y se maneje el error
  it('should call createBrand and handle error response', async () => {
    const formData = { name: 'Marca Test', description: 'Descripción de la marca' };
    mockBrandService.createBrand.mockReturnValue(throwError(() => new Error('Error de red'))); // Simula un error

    await component.createBrand(formData);
    expect(mockBrandService.createBrand).toHaveBeenCalledWith(formData, component.token);
    expect(component.typeToastMessage).toBe('error');
    expect(component.toastMessage).toBe('Error al enviar la solicitud');
  });




  // Verifica que el toast no se muestra cuando showToast es false
  it('should not display the toast when showToast is false', () => {
    component.showToast = false;
    fixture.detectChanges(); // Actualiza la vista

    const toastElement = fixture.debugElement.query(By.css('app-toast'));
    expect(toastElement).toBeFalsy(); // Verifica que el componente app-toast no esté en el DOM
  });

});
