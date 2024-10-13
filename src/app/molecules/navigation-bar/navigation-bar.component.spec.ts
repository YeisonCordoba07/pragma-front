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



  it('should emit the closeNav event when handleCloseNav is called', () => {
    jest.spyOn(component.closeNav, 'emit');

    component.handleCloseNav();

    expect(component.closeNav.emit).toHaveBeenCalled();
  });

  it('should emit closeNav when the close button is clicked', () => {
    jest.spyOn(component.closeNav, 'emit');

    const closeButton = fixture.debugElement.query(By.css('app-icon-button'));
    closeButton.triggerEventHandler('onClick', null);

    expect(component.closeNav.emit).toHaveBeenCalled();
  });


  it('should call handleCloseNav when the navigation element emits closeNav', () => {
    jest.spyOn(component, 'handleCloseNav');

    const navElements = fixture.debugElement.queryAll(By.css('app-navigation-bar-element'));
    navElements[0].triggerEventHandler('closeNav', null);

    expect(component.handleCloseNav).toHaveBeenCalled();
  });

});
