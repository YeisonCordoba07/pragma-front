import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrimaryIconButtonComponent } from './primary-icon-button.component';

describe('IconButtonComponent', () => {
  let component: PrimaryIconButtonComponent;
  let fixture: ComponentFixture<PrimaryIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryIconButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have default buttonText as "Button"', () => {
    expect(component.buttonText).toBe("Button");
  });


  it('should render buttonText in the button', () => {
    component.buttonText = 'Save';
    fixture.detectChanges(); // Detecta los cambios tras actualizar el valor

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent).toContain('Save');
  });

  it('should be disabled when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBe(true);
  });

  it('should not be disabled when disabled input is false', () => {
    component.disabled = false;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBe(false);
  });
});
