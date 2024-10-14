import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataComponent } from './form-data.component';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import {FormsModule} from "@angular/forms";


describe('FormDataComponent', () => {
  let component: FormDataComponent;
  let fixture: ComponentFixture<FormDataComponent>;
  let mockCategoryService: CategoryService;

  beforeEach(async () => {
    mockCategoryService = {
      getCategories: jest.fn()
    } as unknown as CategoryService;



    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ FormDataComponent ],
      providers: [{ provide: CategoryService, useValue: mockCategoryService  }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
