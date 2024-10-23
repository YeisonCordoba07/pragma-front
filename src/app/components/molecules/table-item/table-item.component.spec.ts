import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableItemComponent } from './table-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MultiSelectTagComponent} from "../multi-select-tag/multi-select-tag.component";

describe('TableItemComponent', () => {
  let component: TableItemComponent;
  let fixture: ComponentFixture<TableItemComponent>;

  const mockCategories = [
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Clothing' }
  ];

  const mockBrands = [
    { name: 'Apple' },
    { name: 'Samsung' },
    { name: 'Sony' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableItemComponent, MultiSelectTagComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TableItemComponent);
    component = fixture.componentInstance;

    // Proveer datos simulados a las entradas del componente
    component.mainTitle = 'Test Title';
    component.categoryData = mockCategories;
    component.brandData = mockBrands;
    component.maxLengthName = 50;
    component.maxLengthDescription = 120;

    fixture.detectChanges(); // Detectar cambios para renderizar el template
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with all the required controls', () => {
    expect(component.formUser.contains('name')).toBeTruthy();
    expect(component.formUser.contains('description')).toBeTruthy();
    expect(component.formUser.contains('quantity')).toBeTruthy();
    expect(component.formUser.contains('price')).toBeTruthy();
    expect(component.formUser.contains('categories')).toBeTruthy();
    expect(component.formUser.contains('brandName')).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.formUser.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should validate category selection length between 1 and 3', () => {
    const control = component.formUser.get('categories');
    control?.setValue([]); // Ninguna categoría seleccionada
    expect(control?.valid).toBeFalsy();

    control?.setValue([mockCategories[0]]); // 1 categoría seleccionada
    expect(control?.valid).toBeTruthy();

    control?.setValue([mockCategories[0], mockCategories[1], mockCategories[2]]); // 3 categorías seleccionadas
    expect(control?.valid).toBeTruthy();

    control?.setValue([mockCategories[0], mockCategories[1], mockCategories[2], { name: 'Extra Category' }]); // 4 categorías (excede el máximo)
    expect(control?.valid).toBeFalsy();
  });

  it('should disable the submit button when form is invalid', () => {
    const button = fixture.debugElement.query(By.css('app-main-button'));
    expect(button.nativeElement.disabled).toBeTruthy();

    // Hacer el formulario válido
    component.formUser.patchValue({
      name: 'Test Name',
      description: 'Valid description',
      quantity: 5,
      price: 100,
      categories: [mockCategories[0]],
      brandName: 'Apple'
    });
    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should emit formSubmitted event on valid form submit', () => {
    jest.spyOn(component.formSubmitted, 'emit'); // Espía el evento emitido

    // Hacer el formulario válido
    component.formUser.patchValue({
      name: 'Test Name',
      description: 'Valid description',
      quantity: 5,
      price: 100,
      categories: [mockCategories[0]],
      brandName: 'Apple'
    });

    component.onSubmit(); // Simular el envío del formulario

    expect(component.formSubmitted.emit).toHaveBeenCalledWith({
      name: 'Test Name',
      description: 'Valid description',
      quantity: 5,
      price: 100,
      categories: [mockCategories[0]],
      brandName: 'Apple'
    });
  });

});
