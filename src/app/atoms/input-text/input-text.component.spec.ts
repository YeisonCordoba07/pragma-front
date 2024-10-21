import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl,  ReactiveFormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTextComponent ],
      imports: [ ReactiveFormsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
// Verifica que el texto del label es el esperado
  it('should display the correct label text', () => {
    component.textLabel = 'Nombre';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(labelElement.textContent).toBe('Nombre');
  });

  // Verifica que el campo de texto tiene el tipo correcto
  it('should set the input type correctly', () => {
    component.type = 'email';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.type).toBe('email');
  });



  // Verifica que el mensaje de error "requerido" aparece correctamente
  it('should show "required" error message if control is invalid and touched', () => {
    component.control.setErrors({ required: true });
    component.control.markAsTouched(); // Marca el control como tocado
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.query(By.css('.error small')).nativeElement;
    expect(errorMessageElement.textContent.trim()).toBe(`${component.textLabel} no puede estar vacio`);
  });

  // Verifica que el mensaje de error "maxlength" aparece correctamente
  it('should show "maxlength" error message if control exceeds max length', () => {
    component.control.setErrors({ maxlength: true });
    component.control.markAsTouched(); // Marca el control como tocado
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.query(By.css('.error small')).nativeElement;
    expect(errorMessageElement.textContent.trim()).toBe(`${component.textLabel} debe tener menos de ${component.maxInputLength} caracteres`);
  });

  // Verifica que no se muestra ningún mensaje de error cuando el control es válido
  it('should not display error messages if control is valid', () => {
    component.control.setErrors(null); // Control válido
    component.control.markAsTouched(); // Marca el control como tocado
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(By.css('.error small'));
    expect(errorMessages.length).toBe(0); // No debería haber mensajes de error
  });
});
