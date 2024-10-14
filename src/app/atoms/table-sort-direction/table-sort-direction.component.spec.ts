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

  it('should call onChangeAscending when select changes', () => {
    jest.spyOn(component, 'onChangeAscending'); // Espía el metodo onChangeAscending
    const select = fixture.debugElement.query(By.css('select')).nativeElement;

    select.dispatchEvent(new Event('change')); // Simula un cambio en el select
    fixture.detectChanges();

    expect(component.onChangeAscending).toHaveBeenCalled(); // Verifica si se llamó
  });

  it('should emit ascendingChange event when onChangeAscending is called', () => {
    jest.spyOn(component.ascendingChange, 'emit'); // Espía el metodo emit del EventEmitter

    component.onChangeAscending(); // Llama directamente la función
    fixture.detectChanges();

    expect(component.ascendingChange.emit).toHaveBeenCalled(); // Verifica si se emitió el evento
  });

});
