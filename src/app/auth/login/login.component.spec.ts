import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

// Mock del servicio LoginService
class MockLoginService {
  login(data: any) {
    return of({ token: 'mock-token', role: 'USER' });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService: MockLoginService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        { provide: Router, useValue: { navigateByUrl: jest.fn() } } // Mock de Router
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockLoginService = TestBed.inject(LoginService) as unknown as MockLoginService;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginService.login and navigate to home on success', () => {
    jest.spyOn(mockLoginService, 'login').mockReturnValue(of({ token: 'mock-token', role: 'USER' }));
    jest.spyOn(router, 'navigateByUrl');

    const formData = { email: 'test@example.com', password: 'password123' };
    component.login(formData);

    expect(mockLoginService.login).toHaveBeenCalledWith({
      email: formData.email,
      password: formData.password
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should log error if login fails', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    jest.spyOn(mockLoginService, 'login').mockReturnValue(throwError('Login failed'));

    const formData = { email: 'test@example.com', password: 'password123' };
    component.login(formData);

    expect(consoleLogSpy).toHaveBeenCalledWith('Login failed');
  });

  it('should reset the form after successful login', () => {
    jest.spyOn(mockLoginService, 'login').mockReturnValue(of({ token: 'mock-token', role: 'USER' }));

    const formData = { email: 'test@example.com', password: 'password123' };
    component.login(formData);

    expect(component.formLogin.value).toEqual({ email: null, password: null });
  });

  it('should validate the email field correctly', () => {
    const emailControl = component.email;

    expect(emailControl.valid).toBeFalsy();
    emailControl.setValue('test@example.com');
    expect(emailControl.valid).toBeTruthy();
  });

  it('should validate the password field correctly', () => {
    const passwordControl = component.password;

    expect(passwordControl.valid).toBeFalsy();
    passwordControl.setValue('password123');
    expect(passwordControl.valid).toBeTruthy();
  });

});
