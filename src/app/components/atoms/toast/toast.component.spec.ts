import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import {By} from "@angular/platform-browser";

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set the correct image source for each toast type', () => {
    component.toastType = 'error';
    component.chooseImage();
    expect(component.imgSource).toBe('assets/icons/toast_error.svg');

    component.toastType = 'warning';
    component.chooseImage();
    expect(component.imgSource).toBe('assets/icons/toast_warning.svg');

    component.toastType = 'success';
    component.chooseImage();
    expect(component.imgSource).toBe('assets/icons/toast_success.svg');

    component.toastType = 'neutral';
    component.chooseImage();
    expect(component.imgSource).toBe('assets/icons/toast_neutral.svg');
  });

  it('should set the toastClass to "toast-in" initially and then change to "toast-out" after the duration', () => {
    jest.useFakeTimers(); // Usar temporizadores simulados

    component.showToast();
    expect(component.toastClass).toBe('toast-in');

    jest.advanceTimersByTime(3000); // Avanzar 3 segundos
    fixture.detectChanges();

    expect(component.toastClass).toBe('toast-out');
  });

  it('should render the correct message in the toast', () => {
    const message = 'This is a test message';
    component.message = message;
    fixture.detectChanges();

    const toastElement = fixture.debugElement.query(By.css('.toast-container span'));
    expect(toastElement.nativeElement.textContent).toContain(message);
  });

  it('should apply the correct class for the toastType', () => {
    component.toastType = 'error';
    fixture.detectChanges();
    const toastText = fixture.debugElement.query(By.css('.toast-container span'));
    expect(toastText.nativeElement.classList).toContain('toast-text-color-error');

    component.toastType = 'success';
    fixture.detectChanges();
    expect(toastText.nativeElement.classList).toContain('toast-text-color-success');
  });
});
