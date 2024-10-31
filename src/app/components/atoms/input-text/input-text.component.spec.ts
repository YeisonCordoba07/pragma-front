import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputTextComponent } from './input-text.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [InputTextComponent],
      schemas: [NO_ERRORS_SCHEMA] // Ignorar otros componentes en pruebas
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;

    // Inicializar propiedades del componente
    component.control = new FormControl();
    component.inputId = 'testInput';
    component.textLabel = 'Nombre';
    component.type = 'text';
    component.maxInputLength = 50;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label correctly', () => {
    const labelElement: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent).toContain('Nombre');
  });


  it('should bind the input control correctly', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Nuevo Nombre'; // Simular entrada
    inputElement.dispatchEvent(new Event('input')); // Disparar el evento de entrada

    expect(component.control.value).toBe('Nuevo Nombre');
  });
});
