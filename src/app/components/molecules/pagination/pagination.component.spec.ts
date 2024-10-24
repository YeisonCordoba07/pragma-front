import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {By} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct page number, total pages, and total elements', () => {
    component.page = 1;
    component.totalPages = 5;
    component.totalElements = 100;
    fixture.detectChanges();

    const paginationText = fixture.debugElement.query(By.css('.pagination')).nativeElement.textContent;
    expect(paginationText).toContain('2 de 5');
    expect(paginationText).toContain('Total de elementos: 100');
  });

  it('should emit leftClick event when prevPage is called', () => {
    jest.spyOn(component.leftClick, 'emit');

    const leftButton = fixture.debugElement.query(By.css('app-icon-button:first-child'));
    leftButton.triggerEventHandler('onClick', null);

    expect(component.leftClick.emit).toHaveBeenCalled();
  });

  it('should emit rightClick event when nextPage is called', () => {
    jest.spyOn(component.rightClick, 'emit');

    const rightButton = fixture.debugElement.query(By.css('app-icon-button:last-child'));
    rightButton.triggerEventHandler('onClick', null);

    expect(component.rightClick.emit).toHaveBeenCalled();
  });
});
