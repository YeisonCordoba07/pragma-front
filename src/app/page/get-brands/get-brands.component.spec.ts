import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBrandsComponent } from './get-brands.component';

describe('GetBrandsComponent', () => {
  let component: GetBrandsComponent;
  let fixture: ComponentFixture<GetBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
