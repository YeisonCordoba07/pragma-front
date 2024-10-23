import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectTagComponent } from './multi-select-tag.component';

describe('MultiSelectTagComponent', () => {
  let component: MultiSelectTagComponent;
  let fixture: ComponentFixture<MultiSelectTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
