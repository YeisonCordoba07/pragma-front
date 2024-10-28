import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuxComponent } from './create-aux.component';

describe('CreateAuxComponent', () => {
  let component: CreateAuxComponent;
  let fixture: ComponentFixture<CreateAuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
