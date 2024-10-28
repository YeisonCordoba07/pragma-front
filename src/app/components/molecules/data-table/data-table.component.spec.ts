import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Option} from "src/types/Option";



describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    // Asignar datos iniciales a las propiedades
    component.inputData = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    component.mainTitle = 'Tabla de Datos';
    component.page = 0;
    component.size = 5;
    component.totalElements = 10;
    component.totalPages = 2;
    component.ascending = true;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should emit leftClick when prevPage is called', () => {
    jest.spyOn(component.leftClick, 'emit');
    component.prevPage();
    expect(component.leftClick.emit).toHaveBeenCalled();
  });

  it('should emit rightClick when nextPage is called', () => {
    jest.spyOn(component.rightClick, 'emit');
    component.nextPage();
    expect(component.rightClick.emit).toHaveBeenCalled();
  });

  it('should emit changeSort when changeAscending is called', () => {
    jest.spyOn(component.changeSort, 'emit');
    component.changeAscending();
    expect(component.changeSort.emit).toHaveBeenCalled();
  });

  it('should have correct order options', () => {
    const expectedOrderOptions: Option[] = [
      { name: '↑ Ascendente', value: true },
      { name: '↓ Descendente', value: false },
    ];
    expect(component.orderOptions).toEqual(expectedOrderOptions);
  });
});
