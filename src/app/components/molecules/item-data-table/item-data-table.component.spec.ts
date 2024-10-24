import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDataTableComponent } from './item-data-table.component';

describe('ItemDataTableComponent', () => {
  let component: ItemDataTableComponent;
  let fixture: ComponentFixture<ItemDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
