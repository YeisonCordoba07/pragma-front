import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SelectElementComponent } from './select-element.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SelectElementComponent', () => {
  let component: SelectElementComponent;
  let fixture: ComponentFixture<SelectElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SelectElementComponent],
      schemas: [NO_ERRORS_SCHEMA] // Ignorar otros componentes en pruebas
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectElementComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(); // Inicializar el control del formulario
    component.inputId = 'testSelect';
    component.inputData = [
      { name: 'Opción 1' },
      { name: 'Opción 2' },
      { name: 'Opción 3' }
    ];
    component.inputLabel = 'Selecciona una opción';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize input data correctly', () => {
    expect(component.inputData.length).toBe(3);
    expect(component.inputData[0].name).toBe('Opción 1');
  });

  it('should render the label correctly', () => {
    const labelElement: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent).toContain('Selecciona una opción');
  });


  it('should not display error message when control is valid', () => {
    component.control.setValue('Opción 1'); // Selecciona una opción válida
    fixture.detectChanges();

    const errorMessage: HTMLElement = fixture.nativeElement.querySelector('.custom-select__error-container');
    expect(errorMessage).toBeFalsy();
  });

  it('should bind the select control correctly', () => {
    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    selectElement.value = 'Opción 1'; // Simular selección
    selectElement.dispatchEvent(new Event('change')); // Disparar el evento de cambio

    expect(component.control.value).toBe('Opción 1');
  });
});
