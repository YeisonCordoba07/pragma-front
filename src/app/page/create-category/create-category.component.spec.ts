import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './create-category.component';
import { CategoryService } from 'src/app/services/category/category.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryServiceMock: any;

  beforeEach(async () => {
    categoryServiceMock = {
      createCategory: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignorar otros componentes en pruebas
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.formCategory).toBeDefined();
    expect(component.formCategory.get('name')).toBeTruthy();
    expect(component.formCategory.get('description')).toBeTruthy();
  });

  it('should show a success toast when a category is created successfully', async () => {
    const mockResponse = { status: 201 };
    categoryServiceMock.createCategory.mockReturnValue(of(mockResponse));

    await component.createCategory({ name: 'Test Category', description: 'Test Description' });

    expect(component.showToast).toBe(true);
    expect(component.toastMessage).toBe('Categoría creada exitosamente');
    expect(component.typeToastMessage).toBe('success');
  });

  it('should show an error toast when category creation fails', async () => {
    categoryServiceMock.createCategory.mockReturnValue(throwError(() => new Error('Error')));

    await component.createCategory({ name: 'Test Category', description: 'Test Description' });

    expect(component.showToast).toBe(true);
    expect(component.toastMessage).toBe('Error al enviar la solicitud');
    expect(component.typeToastMessage).toBe('error');
  });

  it('should call the createCategory method of the categoryService when form is submitted', async () => {
    const mockResponse = { status: 201 };
    categoryServiceMock.createCategory.mockReturnValue(of(mockResponse));

    await component.createCategory({ name: 'Test Category', description: 'Test Description' });

    expect(categoryServiceMock.createCategory).toHaveBeenCalledWith({
      name: 'Test Category',
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
