import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarElementComponent } from './navigation-bar-element.component';
import {By} from "@angular/platform-browser";

describe('NavigationBarElementComponent', () => {
  let component: NavigationBarElementComponent;
  let fixture: ComponentFixture<NavigationBarElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default elementText as "Menu #"', () => {
    expect(component.elementText).toBe('Menu #');
  });

  it('should bind elementText input to the template', () => {
    component.elementText = 'Home';
    fixture.detectChanges();

    const spanElement: HTMLElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(spanElement.textContent).toBe('Home');
  });

  it('should bind isActived input to show or hide the vertical divider', () => {
    component.isActived = true;
    fixture.detectChanges();

    const dividerElement = fixture.debugElement.query(By.css('.vertical-divider'));
    expect(dividerElement).toBeTruthy();

    component.isActived = false;
    fixture.detectChanges();

    const hiddenDivider = fixture.debugElement.query(By.css('.vertical-divider'));
    expect(hiddenDivider).toBeFalsy();
  });

  it('should bind elementIcon input to the img src attribute', () => {
    component.elementIcon = 'favicon.ico';
    fixture.detectChanges();

    const imgElement: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('favicon.ico'); // Verifica que la ruta de la imagen es correcta
  });
});
