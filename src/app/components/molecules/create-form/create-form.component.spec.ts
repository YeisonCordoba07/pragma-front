import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormComponent } from './create-form.component';
import {By} from "@angular/platform-browser";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
    component.inputForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(component.maxLengthName)]),
      description: new FormControl('', [Validators.maxLength(component.maxLengthDescription)])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the main title', () => {
    component.mainTitle = 'Crear Nuevo Item';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toBe('Crear Nuevo Item');
  });

  it('should disable the submit button if form is invalid', () => {
    component.inputForm.controls['name'].setValue(''); // Formulario inválido ya que 'name' es requerido
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('app-main-button')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable the submit button if form is valid', () => {
    component.inputForm.controls['name'].setValue('Nombre válido');
    component.inputForm.controls['description'].setValue('Descripción válida');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('app-main-button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should emit formSubmitted with form data on valid form submission', () => {
    // Espiar el evento formSubmitted
    const formSubmittedSpy = jest.spyOn(component.formSubmitted, 'emit');

    // Llenar el formulario con datos válidos
    component.inputForm.controls['name'].setValue('Nombre válido');
    component.inputForm.controls['description'].setValue('Descripción válida');

    // Simular el envío del formulario
    component.onSubmit();

    expect(formSubmittedSpy).toHaveBeenCalledWith({
      name: 'Nombre válido',
      description: 'Descripción válida',
    });
  });

  it('should reset the form after submission', () => {
    component.inputForm.controls['name'].setValue('Nombre válido');
    component.inputForm.controls['description'].setValue('Descripción válida');

    component.onSubmit();

    // Verificar que el formulario se ha reseteado
    expect(component.inputForm.controls['name'].value).toBeNull();
    expect(component.inputForm.controls['description'].value).toBeNull();
  });


});
