import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSortDirectionComponent } from './table-sort-direction.component';
import {By} from "@angular/platform-browser";

describe('TableSortDirectionComponent', () => {
  let component: TableSortDirectionComponent;
  let fixture: ComponentFixture<TableSortDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSortDirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSortDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the input title', () => {
    component.inputTitle = 'Sort By';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.sort-container__text')).nativeElement;
    expect(titleElement.textContent.trim()).toBe('Sort By:');
  });

  it('should emit ascendingChange and tableChange events on selection change', () => {
    const ascendingChangeSpy = jest.spyOn(component.ascendingChange, 'emit');
    const tableChangeSpy = jest.spyOn(component.tableChange, 'emit');

    component.onChangeAscending('category');
    expect(ascendingChangeSpy).toHaveBeenCalled();
    expect(tableChangeSpy).toHaveBeenCalledWith('category');
  });

  it('should populate the select options based on dataOption input', () => {
    component.dataOption = [
      { name: 'Option 1', value: 'option1' },
      { name: 'Option 2', value: 'option2' }
    ];
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('.styled-select option'));
    expect(options.length).toBe(2);
    expect(options[0].nativeElement.textContent).toBe('Option 1');
    expect(options[1].nativeElement.textContent).toBe('Option 2');
  });

  it('should emit tableChange event with correct value when an option is selected', () => {
    const tableChangeSpy = jest.spyOn(component.tableChange, 'emit');

    component.dataOption = [
      { name: 'Option A', value: 'A' },
      { name: 'Option B', value: 'B' }
    ];
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('.styled-select')).nativeElement;
    selectElement.value = selectElement.options[1].value; // Select "Option B"
    selectElement.dispatchEvent(new Event('change'));

    expect(tableChangeSpy).toHaveBeenCalledWith('B');
  });

  it('should emit tableChange with the correct value when onChangeTable is called', () => {
    // Espía el evento tableChange
    jest.spyOn(component.tableChange, 'emit');

    // Llama a onChangeTable con un valor de prueba
    const testValue = 'testOption';
    component.onChangeTable(testValue);

    // Verifica que el evento se emitió con el valor correcto
    expect(component.tableChange.emit).toHaveBeenCalledWith(testValue);
  });

});
