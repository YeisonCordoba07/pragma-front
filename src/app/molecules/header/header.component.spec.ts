import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {By} from "@angular/platform-browser";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should toggle "active" property when setActive is called', () => {
    expect(component.active).toBe(false); // Estado inicial
    component.setActive();
    expect(component.active).toBe(true); // Estado después de la primera llamada
    component.setActive();
    expect(component.active).toBe(false); // Estado después de la segunda llamada
  });

  it('should toggle the "header-element__active" class on app-navigation-bar', () => {
    let navigationBar = fixture.debugElement.query(By.css('app-navigation-bar'));
    expect(navigationBar.nativeElement.classList).not.toContain('header-element__active');

    component.setActive();
    fixture.detectChanges(); // Actualiza el DOM

    navigationBar = fixture.debugElement.query(By.css('app-navigation-bar'));
    expect(navigationBar.nativeElement.classList).toContain('header-element__active');
  });
});
