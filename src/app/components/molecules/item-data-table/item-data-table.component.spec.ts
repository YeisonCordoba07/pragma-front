import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDataTableComponent } from './item-data-table.component';
import {By} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ItemDataTableComponent', () => {
  let component: ItemDataTableComponent;
  let fixture: ComponentFixture<ItemDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDataTableComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table with input data', () => {
    component.inputData = [
      {
        id: 1,
        name: 'Item 1',
        description: 'Description 1',
        quantity: 10,
        price: 100,
        brand: { name: 'Brand 1' },
        categories: [{ name: 'Category 1' }, { name: 'Category 2' }]
      }
    ];
    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));

    const firstRow = tableRows[0].nativeElement;
    expect(firstRow.textContent).toContain('Item 1');
    expect(firstRow.textContent).toContain('Description 1');
    expect(firstRow.textContent).toContain('Brand 1');
    expect(firstRow.textContent).toContain('Category 1');
    expect(firstRow.textContent).toContain('Category 2');
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

  it('should emit changeTable when selecting a different order option', () => {
    jest.spyOn(component.changeTable, 'emit');

    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.value = selectElement.options[2].value;  // 'Category'
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.changeTable.emit).toHaveBeenCalledWith('category');
  });
});
