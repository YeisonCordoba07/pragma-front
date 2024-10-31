import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBrandComponent } from './create-brand.component';
import { BrandService } from '../../services/brand/brand.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateBrandComponent', () => {
  let component: CreateBrandComponent;
  let fixture: ComponentFixture<CreateBrandComponent>;
  let brandServiceMock: any;

  beforeEach(async () => {
    brandServiceMock = {
      createBrand: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateBrandComponent],
      providers: [
        { provide: BrandService, useValue: brandServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignorar otros componentes en pruebas
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.formBrand).toBeDefined();
    expect(component.formBrand.get('name')).toBeTruthy();
    expect(component.formBrand.get('description')).toBeTruthy();
  });

  it('should show a success toast when a brand is created successfully', async () => {
    const mockResponse = { status: 201 };
    brandServiceMock.createBrand.mockReturnValue(of(mockResponse));

    await component.createBrand({ name: 'Test Brand', description: 'Test Description' });

    expect(component.showToast).toBe(true);
    expect(component.toastMessage).toBe('Marca creada exitosamente');
    expect(component.typeToastMessage).toBe('success');
  });

  it('should show an error toast when brand creation fails', async () => {
    brandServiceMock.createBrand.mockReturnValue(throwError(() => new Error('Error')));

    await component.createBrand({ name: 'Test Brand', description: 'Test Description' });

    expect(component.showToast).toBe(true);
    expect(component.toastMessage).toBe('Error al enviar la solicitud');
    expect(component.typeToastMessage).toBe('error');
  });

  it('should call the createBrand method of the brandService when form is submitted', async () => {
    const mockResponse = { status: 201 };
    brandServiceMock.createBrand.mockReturnValue(of(mockResponse));

    await component.createBrand({ name: 'Test Brand', description: 'Test Description' });

    expect(brandServiceMock.createBrand).toHaveBeenCalledWith({
      name: 'Test Brand',
      description: 'Test Description'
    });
  });

  it('should have a form with validators', () => {
    const nameControl = component.name;
    const descriptionControl = component.description;

    nameControl.setValue('');
    expect(nameControl.valid).toBeFalsy();

    descriptionControl.setValue('');
    expect(descriptionControl.valid).toBeFalsy();
  });

  it('should set showToast to false after 5 seconds', fakeAsync(() => {
    component.showCustomToast('Test message'); // Llama al metodo para mostrar el toast
    expect(component.showToast).toBe(true); // Verifica que showToast sea verdadero inicialmente

    tick(5000); // Simula el paso de 5 segundos

    expect(component.showToast).toBe(false); // Verifica que showToast se haya vuelto falso
  }));

});
