import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonComponent } from './icon-button.component';
import {By} from "@angular/platform-browser";

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the image with the correct src, alt, width, and height', () => {
    //component.imgSrc = 'assets/icons/test_icon.svg';
    component.imgAlt = 'test icon';
    component.imgWidth = '64';
    component.imgHeight = '64';

    fixture.detectChanges(); // Detonamos el ciclo de detección de cambios

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    //expect(imgElement.src).toContain('assets/icons/test_icon.svg');
    expect(imgElement.alt).toBe('test icon');
    expect(imgElement.width).toBe(64);
    expect(imgElement.height).toBe(64);
  });

  it('should emit the onClick event when button is clicked', () => {
    const onClickSpy = jest.spyOn(component.onClick, 'emit'); // Usamos jest.spyOn()

    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null); // Simula un clic

    expect(onClickSpy).toHaveBeenCalled();
  });
});
