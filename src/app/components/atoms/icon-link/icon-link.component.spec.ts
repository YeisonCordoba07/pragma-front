import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLinkComponent } from './icon-link.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('IconLinkComponent', () => {
  let component: IconLinkComponent;
  let fixture: ComponentFixture<IconLinkComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconLinkComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconLinkComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render the image with correct attributes', () => {
    //component.imgSource = 'test-image.png';
    component.imgAlt = 'Test Alt';
    component.imgWidth = '50';
    component.imgHeight = '50';

    fixture.detectChanges(); // Detectar cambios para aplicar las propiedades actualizadas

    const img: HTMLImageElement = compiled.querySelector('img')!;

    //expect(img.src).toContain('test-image.png');
    expect(img.alt).toBe('Test Alt');
    expect(img.width).toBe(50);
    expect(img.height).toBe(50);
  });

  test('should have correct routerLink attribute', () => {
    component.pageUrl = '/test-page';
    fixture.detectChanges();  // Actualiza la vista con los nuevos valores

    const anchor = compiled.querySelector('a');
    expect(anchor?.getAttribute('ng-reflect-router-link')).toBe('/test-page');
  });
});
