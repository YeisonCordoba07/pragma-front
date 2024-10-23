import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MultiSelectTagComponent} from './multi-select-tag.component';
import {FormsModule} from "@angular/forms";

describe('MultiSelectTagComponent', () => {
  let component: MultiSelectTagComponent;
  let fixture: ComponentFixture<MultiSelectTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSelectTagComponent],
      imports: [FormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MultiSelectTagComponent);
    component = fixture.componentInstance;
    component.inputData = [
      {name: 'Marca 1'},
      {name: 'Marca 2'},
      {name: 'Marca 3'},
      {name: 'Marca 4'}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba por defecto del valor máximo
  it('should have a default maxSelectedItems value of 3', () => {
    expect(component.maxSelectedItems).toBe(3);
  });

  // Prueba al establecer un nuevo valor para maxSelectedItems
  it('should update maxSelectedItems when a new value is set', () => {
    component.maxSelectedItems = 5;
    expect(component.maxSelectedItems).toBe(5);
  });

  it('should toggle dropdown open state', () => {
    component.toggleDropdown();
    expect(component.dropdownOpen).toBe(true);
    component.toggleDropdown();
    expect(component.dropdownOpen).toBe(false);
  });

  it('should toggle dropdown when arrow is clicked', () => {
    const dropdownToggle = fixture.nativeElement.querySelector('.multi-select-dropdown__arrow');
    dropdownToggle.click();
    fixture.detectChanges();

    expect(component.dropdownOpen).toBe(true); // El dropdown debe estar abierto

    dropdownToggle.click();
    fixture.detectChanges();

    expect(component.dropdownOpen).toBe(false); // El dropdown debe estar cerrado
  });

  it('should select an item and update selectedItems', () => {
    component.toggleSelection('Marca 1');
    expect(component.selectedItems).toContain('Marca 1');

    // Intenta seleccionar el mismo item
    component.toggleSelection('Marca 1');
    expect(component.selectedItems).not.toContain('Marca 1');
  });

  it('should not select more than 3 items', () => {
    component.toggleSelection('Marca 1');
    component.toggleSelection('Marca 2');
    component.toggleSelection('Marca 3');
    component.toggleSelection('Marca 4'); // Este no debe añadirse

    expect(component.selectedItems.length).toBe(3);
  });


  it('should call onChange when item is selected or removed', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');

    component.toggleSelection('Marca 1');
    expect(onChangeSpy).toHaveBeenCalledWith(['Marca 1']);

    component.removeItem('Marca 1');
    expect(onChangeSpy).toHaveBeenCalledWith([]);
  });


  it('should return true if an item is selected', () => {
    component.toggleSelection('Marca 1');
    expect(component.isSelected('Marca 1')).toBe(true);
  });

  it('should return false if an item is not selected', () => {
    expect(component.isSelected('Marca 2')).toBe(false);
  });

  it('should register onChange callback', () => {
    const mockOnChangeFn = jest.fn();
    component.registerOnChange(mockOnChangeFn); // Registra la función

    // Verifica que la función onChange se haya asignado correctamente
    expect(component.onChange).toBe(mockOnChangeFn);
  });

  it('should register onTouched callback', () => {
    const mockOnTouchedFn = jest.fn();
    component.registerOnTouched(mockOnTouchedFn); // Registra la función

    // Verifica que la función onTouched se haya asignado correctamente
    expect(component.onTouched).toBe(mockOnTouchedFn);
  });

  it('should call onTouched when the component is touched', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy); // Registra el espía

    component.onTouched(); // Simula que el componente ha sido tocado

    expect(onTouchedSpy).toHaveBeenCalled(); // Verifica que se llamó el espía
  });



  it('should write value to selectedItems', () => {
    const testValues = ['Marca 1', 'Marca 2'];
    component.writeValue(testValues);

    expect(component.selectedItems).toEqual(testValues); // Debe igualar
  });




});
