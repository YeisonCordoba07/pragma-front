import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormComponent } from './create-form.component';
import {By} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CreateFormComponent', () => {
  let component: CreateFormComponent;
  let fixture: ComponentFixture<CreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormComponent ],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize the form as invalid', () => {
    expect(component.inputForm.invalid).toBeTruthy();
  });

  // Verificar que los campos del formulario se inicializan correctamente
  it('should initialize the form controls', () => {
    const nameControl = component.inputForm.get('name');
    const descriptionControl = component.inputForm.get('description');

    expect(nameControl).toBeTruthy();
    expect(descriptionControl).toBeTruthy();
  });

  // Verificar que el botón de "Guardar" esté deshabilitado si el formulario es inválido
  it('should disable save button when form is invalid', () => {
    const buttonElement = fixture.debugElement.query(By.css('app-main-button')).nativeElement;
    expect(buttonElement.disabled).toBe(true);
  });

  // Verificar que el formulario se vuelve válido cuando los campos se llenan correctamente
  it('should validate form when inputs are filled correctly', () => {
    component.inputForm.controls['name'].setValue('Nueva Categoría');
    component.inputForm.controls['description'].setValue('Descripción de la categoría');
    expect(component.inputForm.valid).toBeTruthy();
  });

  // Verificar que el botón de "Guardar" esté habilitado cuando el formulario es válido
  it('should enable save button when form is valid', () => {
    component.inputForm.controls['name'].setValue('Nueva Categoría');
    component.inputForm.controls['description'].setValue('Descripción de la categoría');
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('app-main-button')).nativeElement;
    expect(buttonElement.disabled).toBe(false);
  });

  // Verificar que se emite el evento 'formSubmitted' cuando el formulario es válido y se envía
  it('should emit formSubmitted when form is submitted', () => {
    const formData = {
      name: 'Nueva Categoría',
      description: 'Descripción de la categoría'
    };

    // Llenar el formulario
    component.inputForm.controls['name'].setValue(formData.name);
    component.inputForm.controls['description'].setValue(formData.description);

    // Espiar el evento emitido
    jest.spyOn(component.formSubmitted, 'emit');

    // Ejecutar el metodo onSubmit()
    component.onSubmit();

    // Verificar que se emitió el evento con los datos correctos
    expect(component.formSubmitted.emit).toHaveBeenCalledWith(formData);
  });

  // Verificar que no se emita el evento si el formulario es inválido
  it('should not emit formSubmitted when form is invalid', () => {
    jest.spyOn(component.formSubmitted, 'emit');

    // Ejecutar el metodo onSubmit() sin completar el formulario
    component.onSubmit();

    // Verificar que no se emitió el evento
    expect(component.formSubmitted.emit).not.toHaveBeenCalled();
  });


});
