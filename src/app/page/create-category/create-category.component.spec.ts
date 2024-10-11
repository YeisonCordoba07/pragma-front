import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './create-category.component';


import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importa esto
import { ReactiveFormsModule } from '@angular/forms';  // Si u
import { CategoryService } from 'src/app/services/category.service';


describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCategoryComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [CategoryService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
