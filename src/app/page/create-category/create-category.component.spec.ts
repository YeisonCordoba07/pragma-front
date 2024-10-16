import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './create-category.component';


import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';  // Si u
import { CategoryService } from 'src/app/services/category/category.service';
import { of, throwError } from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

class MockCategoryService {
  createCategory = jest.fn();
}


describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryService: MockCategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCategoryComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [{ provide: CategoryService, useClass: MockCategoryService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as unknown as MockCategoryService; // Hacemos un tipo de conversión aquí
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
    component.updateCategoryValues('name', 'a'.repeat(51));
    expect(component.nameError).toBe('El nombre no puede tener más de 50 caracteres.');
  });

  it('should set nameError when name length is 0', () => {
    component.updateCategoryValues('name', '');
    expect(component.nameError).toBe('El nombre no puede estar vacio.');
  });

  it('should not set nameError when name is valid', () => {
    component.updateCategoryValues('name', 'Valid Name');
    expect(component.nameError).toBe('');
    expect(component.categoryName).toBe('Valid Name');
  });



  it('should set descriptionError when description exceeds 90 characters', () => {
    component.updateCategoryValues('description', 'a'.repeat(91));
    expect(component.descriptionError).toBe('La descripción no puede tener más de 90 caracteres.');
  });
  it('should set descriptionError when name length is 0', () => {
    component.updateCategoryValues('description', '');
    expect(component.nameError).toBe('La descripción no puede estar vacia.');
  });

  it('should not set descriptionError when description is valid', () => {
    component.updateCategoryValues('description', 'Valid Description');
    expect(component.descriptionError).toBe('');
    expect(component.categoryDescription).toBe('Valid Description');
  });



  it('should call createCategory service when form is valid', () => {
    component.updateCategoryValues('name', 'Valid Name');
    component.updateCategoryValues('description', 'Valid Description');

    categoryService.createCategory.mockReturnValue(of({ status: 201 })); // Simular respuesta exitosa

    component.createCategory();

    expect(categoryService.createCategory).toHaveBeenCalledWith(
      { name: 'Valid Name', description: 'Valid Description' },
      component['token']
    );
  });

  it('should set categoryStatus on successful creation', async () => {
    component.updateCategoryValues('name', 'Valid Name');
    component.updateCategoryValues('description', 'Valid Description');

    categoryService.createCategory.mockReturnValue(of({ status: 201 })); // Simular respuesta exitosa

    await component.createCategory();

    expect(component.categoryStatus).toBe('Categoria creada exitosamente');
  });

  it('should set categoryStatus on unsuccessful creation', async () => {
    component.updateCategoryValues('name', 'Valid Name');
    component.updateCategoryValues('description', 'Valid Description');

    categoryService.createCategory.mockReturnValue(of({ status: 400 })); // Simular respuesta de error

    await component.createCategory();

    expect(component.categoryStatus).toBe('... al crear categoria');
  });

  it('should set categoryStatus on error', async () => {
    component.updateCategoryValues('name', 'Valid Name');
    component.updateCategoryValues('description', 'Valid Description');

    categoryService.createCategory.mockReturnValue(throwError(() => new Error('Error'))); // Simular error

    await component.createCategory();

    expect(component.categoryStatus).toBe('Error al enviar la solicitud');
  });
});
