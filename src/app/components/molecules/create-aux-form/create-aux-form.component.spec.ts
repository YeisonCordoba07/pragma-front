import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuxFormComponent } from './create-aux-form.component';

describe('CreateAuxFormComponent', () => {
  let component: CreateAuxFormComponent;
  let fixture: ComponentFixture<CreateAuxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAuxFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAuxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
