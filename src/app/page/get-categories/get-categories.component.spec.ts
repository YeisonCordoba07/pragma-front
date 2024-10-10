import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoriesComponent } from './get-categories.component';

describe('GetCategoriesComponent', () => {
  let component: GetCategoriesComponent;
  let fixture: ComponentFixture<GetCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
