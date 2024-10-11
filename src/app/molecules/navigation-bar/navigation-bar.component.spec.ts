import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render the close button with close icon', () => {
    const closeButton = fixture.debugElement.query(By.css('button'));
    expect(closeButton).toBeTruthy();

  });

  it('should emit closeNav event when close button is clicked', () => {
    jest.spyOn(component.closeNav, 'emit'); // Espiar el metodo emit

    const closeButton = fixture.debugElement.query(By.css('button'));
    closeButton.triggerEventHandler('click', null); // Simular el clic en el botón

    expect(component.closeNav.emit).toHaveBeenCalled(); // Verificar que se haya llamado a emit
  });

});
