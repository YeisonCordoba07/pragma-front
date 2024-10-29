import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TableItemComponent } from './table-item.component';
import { By } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {MultiSelectTagComponent} from "../../atoms/multi-select-tag/multi-select-tag.component";

describe('TableItemComponent', () => {
  let component: TableItemComponent;
  let fixture: ComponentFixture<TableItemComponent>;
  let formElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableItemComponent, MultiSelectTagComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableItemComponent);
    component = fixture.componentInstance;
    formElement = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formUser).toBeDefined();
    const formValues = component.formUser.value;
    expect(formValues).toEqual({
      name: '',
      description: '',
      quantity: 0,
      price: 0.0,
      categories: [],
      brandName: '',
    });
  });

  it('should mark name as required and maxLength', () => {
    const nameControl = component.formUser.get('name');
    nameControl?.setValue('');
    expect(nameControl?.hasError('required')).toBe(true);
    nameControl?.setValue('A very long name that exceeds the maximum length allowed for the field');
    expect(nameControl?.hasError('maxlength')).toBe(true);
  });


  it('should validate quantity to be greater than or equal to 1', () => {
    const quantityControl = component.formUser.get('quantity');
    quantityControl?.setValue(0);
    expect(quantityControl?.hasError('min')).toBe(true);
  });

  it('should validate price to be greater than or equal to 1.0', () => {
    const priceControl = component.formUser.get('price');
    priceControl?.setValue(0.0);
    expect(priceControl?.hasError('min')).toBe(true);
  });

  it('should validate categories array length between 1 and 3', () => {
    const categoriesControl = component.formUser.get('categories');
    categoriesControl?.setValue([]);
    expect(categoriesControl?.hasError('minlength')).toBe(true);
    categoriesControl?.setValue([1, 2, 3, 4]);
    expect(categoriesControl?.hasError('maxlength')).toBe(true);
  });

  it('should validate that brandName is required', () => {
    const brandControl = component.formUser.get('brandName');
    brandControl?.setValue('');
    expect(brandControl?.hasError('required')).toBe(true);
  });

  it('should emit formSubmitted when the form is valid and submitted', () => {
    jest.spyOn(component.formSubmitted, 'emit');

    component.formUser.setValue({
      name: 'Test Name',
      description: 'Test Description',
      quantity: 2,
      price: 10.0,
      categories: [1],
      brandName: 'Brand',
    });

    formElement.triggerEventHandler('ngSubmit', null);

    expect(component.formSubmitted.emit).toHaveBeenCalledWith({
      name: 'Test Name',
      description: 'Test Description',
      quantity: 2,
      price: 10.0,
      categories: [1],
      brandName: 'Brand',
    });
  });

  it('should reset the form after submission', () => {
    component.formUser.setValue({
      name: 'Test Name',
      description: 'Test Description',
      quantity: 2,
      price: 10.0,
      categories: [1],
      brandName: 'Brand',
    });

    component.onSubmit();

    expect(component.formUser.value).toEqual({
      name: '',
      description: '',
      quantity: 0,
      price: 0.0,
      categories: [],
      brandName: '',
    });
  });
});
