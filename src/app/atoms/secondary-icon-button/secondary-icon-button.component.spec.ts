import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryIconButtonComponent } from './secondary-icon-button.component';

describe('SecondaryIconButtonComponent', () => {
  let component: SecondaryIconButtonComponent;
  let fixture: ComponentFixture<SecondaryIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryIconButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
