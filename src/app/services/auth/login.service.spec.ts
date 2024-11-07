import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {jwtDecode} from "jwt-decode";
import {LoginRequest, LoginResponse} from "../../../types/login";

jest.mock('jwt-decode');  // Mock de jwt-decode

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

/*
  describe('login', () => {
    it('should make a POST request to login and store the token', () => {
      const mockCredentials: LoginRequest = { email: 'test@example.com', password: 'password123' };
      const mockResponse: LoginResponse = { token: 'mock-token', role: 'USER' };

      // Espiar el comportamiento de jwtDecode
      const mockDecodedToken = { sub: 'test@example.com', roles: 'USER', exp: 1638230299 };
      jwtDecode.mockReturnValue(mockDecodedToken);

      service.login(mockCredentials).subscribe((response) => {
        expect(response.token).toBe('mock-token');
        expect(service.currentUserIsLogin.getValue()).toBe(true);
        expect(service.currentLoginData.getValue()).toEqual({
          email: 'test@example.com',
          role: 'USER',
        });
        expect(sessionStorage.getItem('token')).toBe('mock-token');
      });

      const req = httpMock.expectOne('http://localhost:8090/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle error when login fails', () => {
      const mockCredentials: LoginRequest = { email: 'test@example.com', password: 'password123' };
      const mockErrorResponse = { status: 401, statusText: 'Unauthorized' };

      service.login(mockCredentials).subscribe({
        error: (err) => {
          expect(err).toEqual(mockErrorResponse);
        }
      });

      const req = httpMock.expectOne('http://localhost:8090/auth/login');
      req.flush('Unauthorized', mockErrorResponse);
    });
  });

  describe('isTokenExpired', () => {
    it('should return true if token is expired', () => {
      const expiredToken = 'expired-token';
      // Mock de jwtDecode para un token expirado
      const mockDecodedToken = { exp: Math.floor(Date.now() / 1000) - 1000 }; // Expirado
      jwtDecode.mockReturnValue(mockDecodedToken);

      expect(service.isTokenExpired(expiredToken)).toBe(true);
    });

    it('should return false if token is not expired', () => {
      const validToken = 'valid-token';
      // Mock de jwtDecode para un token no expirado
      const mockDecodedToken = { exp: Math.floor(Date.now() / 1000) + 1000 }; // Válido
      jwtDecode.mockReturnValue(mockDecodedToken);

      expect(service.isTokenExpired(validToken)).toBe(false);
    });
  });

  describe('getSessionToken', () => {
    it('should return true and set login data if the token is valid', () => {
      const validToken = 'valid-token';
      const mockDecodedToken = { sub: 'test@example.com', roles: 'USER', exp: Math.floor(Date.now() / 1000) + 1000 };
      jwtDecode.mockReturnValue(mockDecodedToken);

      sessionStorage.setItem('token', validToken);

      const result = service.getSessionToken();

      expect(result).toBe(true);
      expect(service.currentLoginData.getValue()).toEqual({ email: 'test@example.com', role: 'USER' });
      expect(service.currentUserIsLogin.getValue()).toBe(true);
    });

    it('should return false and logout if the token is invalid or expired', () => {
      const expiredToken = 'expired-token';
      const mockDecodedToken = { exp: Math.floor(Date.now() / 1000) - 1000 };
      jwtDecode.mockReturnValue(mockDecodedToken);

      sessionStorage.setItem('token', expiredToken);

      const result = service.getSessionToken();

      expect(result).toBe(false);
      expect(service.currentLoginData.getValue()).toEqual({ email: '', role: '' });
      expect(service.currentUserIsLogin.getValue()).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear session and set user data to default', () => {
      service.logout();
      expect(sessionStorage.getItem('token')).toBeNull();
      expect(service.currentUserIsLogin.getValue()).toBe(false);
      expect(service.currentLoginData.getValue()).toEqual({ email: '', role: '' });
    });
  });

  describe('userIsLogin', () => {
    it('should return current user login status as an observable', () => {
      service.currentUserIsLogin.next(true);

      service.userIsLogin.subscribe((status) => {
        expect(status).toBe(true);
      });
    });
  });

  describe('loginData', () => {
    it('should return current login data as an observable', () => {
      service.currentLoginData.next({ email: 'test@example.com', role: 'USER' });

      service.loginData.subscribe((data) => {
        expect(data).toEqual({ email: 'test@example.com', role: 'USER' });
      });
    });
  });*/
});
