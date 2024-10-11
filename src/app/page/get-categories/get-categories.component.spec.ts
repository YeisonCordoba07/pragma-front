import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoriesComponent } from './get-categories.component';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetCategoriesComponent', () => {
  let component: GetCategoriesComponent;
  let fixture: ComponentFixture<GetCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GetCategoriesComponent ],
      providers: [CategoryService]
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
