import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryIconButtonComponent } from './primary-icon-button.component';

describe('IconButtonComponent', () => {
  let component: PrimaryIconButtonComponent;
  let fixture: ComponentFixture<PrimaryIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryIconButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
