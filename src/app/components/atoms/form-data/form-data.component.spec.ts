import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataComponent } from './form-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {FormsModule} from "@angular/forms";
import { By } from '@angular/platform-browser';


describe('FormDataComponent', () => {
  let component: FormDataComponent;
  let fixture: ComponentFixture<FormDataComponent>;


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ FormDataComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should show the title successfully', () => {
    component.datos = [{ id: 1, name: 'Categoría 1', description: 'Descripción 1' }];
    component.mainTitle = 'Lista de categorias';

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toBe('Lista de categorias');
  });

  it('should show the table when there is data', () => {
    component.datos = [
      { id: 1, name: 'Categoría 1', description: 'Descripción 1' }
    ];
    fixture.detectChanges();

    const tableElement = fixture.debugElement.query(By.css('table'));
    expect(tableElement).toBeTruthy();
  });

  it('should do not show the table when there is not data' , () => {
    component.datos = [];
    fixture.detectChanges();

    const tableElement = fixture.debugElement.query(By.css('table'));
    expect(tableElement).toBeFalsy();
  });

  it('should render the data successfully in the rows', () => {
    component.datos = [
      { id: 1, name: 'Categoría 1', description: 'Descripción 1' },
      { id: 2, name: 'Categoría 2', description: 'Descripción 2' }
    ];
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);

    const firstRow = rows[0].nativeElement;
    expect(firstRow.textContent).toContain('1');
    expect(firstRow.textContent).toContain('Categoría 1');
    expect(firstRow.textContent).toContain('Descripción 1');
  });

});
