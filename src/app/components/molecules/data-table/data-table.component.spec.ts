import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


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
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit leftClick event when prevPage is called', () => {
    const leftClickSpy = jest.spyOn(component.leftClick, 'emit');
    component.prevPage();
    expect(leftClickSpy).toHaveBeenCalled();
  });

  it('should emit rightClick event when nextPage is called', () => {
    const rightClickSpy = jest.spyOn(component.rightClick, 'emit');
    component.nextPage();
    expect(rightClickSpy).toHaveBeenCalled();
  });

  it('should emit changeSort event when changeAscending is called', () => {
    const changeSortSpy = jest.spyOn(component.changeSort, 'emit');
    component.changeAscending();
    expect(changeSortSpy).toHaveBeenCalled();
  });

  it('should display correct pagination text', () => {
    component.page = 1;
    component.totalPages = 5;
    component.totalElements = 25;
    fixture.detectChanges();

    const paginationText = fixture.nativeElement.querySelector('.pagination').textContent;
    expect(paginationText).toContain('2 de 5');
    expect(paginationText).toContain('(Total de elementos: 25)');
  });
});
