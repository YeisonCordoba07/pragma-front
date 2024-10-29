import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataComponent } from './table-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {FormsModule} from "@angular/forms";
import { By } from '@angular/platform-browser';



describe('TableDataComponent', () => {
  let component: TableDataComponent;
  let fixture: ComponentFixture<TableDataComponent>;


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ TableDataComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the main title', () => {
    component.mainTitle = 'Test Title';
    component.inputData = [{}];
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.data-container__title')).nativeElement;
    expect(titleElement.textContent).toBe('Test Title');
  });

  it('should not display the table if inputData is empty', () => {
    component.inputData = [];
    fixture.detectChanges();
    const dataContainer = fixture.debugElement.query(By.css('.data-container'));
    expect(dataContainer).toBeFalsy();
  });

  it('should display the table headers', () => {
    component.columnHeaders = ['ID', 'Name', 'Description'];
    component.inputData = [{}]; // Add a dummy object to avoid empty table
    fixture.detectChanges();
    const headers = fixture.debugElement.queryAll(By.css('.data-container__table-header'));
    expect(headers.length).toBe(3);
    expect(headers[0].nativeElement.textContent).toBe('ID');
    expect(headers[1].nativeElement.textContent).toBe('Name');
    expect(headers[2].nativeElement.textContent).toBe('Description');
  });

  it('should emit changeSort when changeAscending is called', () => {
    const changeSortSpy = jest.spyOn(component.changeSort, 'emit');
    component.changeAscending();
    expect(changeSortSpy).toHaveBeenCalled();
  });

  it('should emit changeTable with correct value when onChangeTable is called', () => {
    const changeTableSpy = jest.spyOn(component.changeTable, 'emit');
    component.onChangeTable('category');
    expect(changeTableSpy).toHaveBeenCalledWith('category');
  });

  it('should emit leftClick when prevPage is called', () => {
    const leftClickSpy = jest.spyOn(component.leftClick, 'emit');
    component.prevPage();
    expect(leftClickSpy).toHaveBeenCalled();
  });

  it('should emit rightClick when nextPage is called', () => {
    const rightClickSpy = jest.spyOn(component.rightClick, 'emit');
    component.nextPage();
    expect(rightClickSpy).toHaveBeenCalled();
  });

  it('should display sort direction components if orderOptions are provided', () => {
    component.orderOptions = [{ name: 'Ascending', value: true }];
    component.inputData = [{}];
    fixture.detectChanges();
    const sortDirection = fixture.debugElement.queryAll(By.css('app-table-sort-direction'));
    expect(sortDirection.length).toBe(1); // Only one app-table-sort-direction should be shown
  });


});
