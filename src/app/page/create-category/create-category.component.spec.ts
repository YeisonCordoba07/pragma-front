import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCategoryComponent } from './create-category.component';


import { CategoryService } from 'src/app/services/category/category.service';
import { of, throwError } from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";



describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryServiceMock: any;

  beforeEach(async () => {

    categoryServiceMock = {
      createCategory: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [ CreateCategoryComponent ],
      providers: [{ provide: CategoryService, useValue: categoryServiceMock  }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verificar que el toast se muestra con el mensaje correcto y se oculta después de 5 segundos
  it('should show and hide toast with correct message', () => {
    jest.useFakeTimers(); // Simular temporizador

    // Llamar al metodo showCustomToast con un mensaje
    component.showCustomToast('Categoría creada exitosamente');

    expect(component.toastMessage).toBe('Categoría creada exitosamente');
    expect(component.showToast).toBe(true);

    // Adelantar el temporizador
    jest.advanceTimersByTime(5000);
    expect(component.showToast).toBe(false);

    jest.useRealTimers();
  });

  // Verificar que createCategory se ejecute correctamente y muestre un toast de éxito
  it('should create category and show success toast', async () => {
    const formData = { name: 'Nueva Categoría', description: 'Descripción de la categoría' };

    // Simular que la petición devuelve un estado 201
    const mockResponse = { status: 201 };
    categoryServiceMock.createCategory.mockReturnValue(of(mockResponse));

    // Llamar al método createCategory
    await component.createCategory(formData);

    // Verificar que se llamó al método createCategory del servicio
    expect(categoryServiceMock.createCategory).toHaveBeenCalledWith(formData, component['token']);

    // Verificar que el tipo de mensaje del toast es "success" y se muestra
    expect(component.typeToastMessage).toBe('success');
    expect(component.toastMessage).toBe('Categoría creada exitosamente');
    expect(component.showToast).toBe(true);
  });

  // Verificar que createCategory maneja el error correctamente y muestra un toast de error
  it('should handle error and show error toast', async () => {
    const formData = { name: 'Nueva Categoría', description: 'Descripción de la categoría' };

    // Simular un error en la petición
    categoryServiceMock.createCategory.mockReturnValue(throwError(() => new Error('Error de red')));

    // Llamar al metodo createCategory
    await component.createCategory(formData);

    // Verificar que se llamó al metodo createCategory del servicio
    expect(categoryServiceMock.createCategory).toHaveBeenCalledWith(formData, component['token']);

    // Verificar que el tipo de mensaje del toast es "error" y se muestra
    expect(component.typeToastMessage).toBe('error');
    expect(component.toastMessage).toBe('Error al enviar la solicitud');
    expect(component.showToast).toBe(true);
  });

  // Verificar que el componente interactúa con el app-create-form correctamente
  it('should call createCategory when formSubmitted is triggered', () => {
    const formData = { name: 'Nueva Categoría', description: 'Descripción de la categoría' };

    // Espiar el metodo createCategory
    jest.spyOn(component, 'createCategory');

    // Simular la emisión del evento formSubmitted desde el app-create-form
    const createFormElement = fixture.debugElement.query(By.css('app-create-form'));
    createFormElement.triggerEventHandler('formSubmitted', formData);

    // Verificar que se llamó al metodo createCategory con los datos correctos
    expect(component.createCategory).toHaveBeenCalledWith(formData);
  });
});
