import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectElementComponent } from './select-element.component';

describe('SelectElementComponent', () => {
  let component: SelectElementComponent;
  let fixture: ComponentFixture<SelectElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
