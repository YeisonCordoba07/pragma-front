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



  describe("expiracion del token", ()=>{

    it("debería retornar true cuando el token esté vacio", ()=>{
      const result = service.isTokenExpired("");

      expect(result).toBeTruthy();
    });


    it("debería retornar true cuando el token sea nulo", ()=>{
      const result = service.isTokenExpired(null);

      expect(result).toBeTruthy();
    });


    it("debería retornar true cuando el token no ha expirado", ()=>{
      // Definimos la fecha de expiración en el pasado
      (jwtDecode as jest.Mock).mockReturnValue({ exp: Date.now() / 1000 - 1000 });

      const token = 'mockToken';
      expect(service.isTokenExpired(token)).toBe(true);
    });


    it("debería retornar false cuando el token no ha expirado", ()=>{
      // Definimos la fecha de expiración en el pasado
      (jwtDecode as jest.Mock).mockReturnValue({ exp: Date.now() / 1000 + 1000 });

      const token = 'mockToken';
      expect(service.isTokenExpired(token)).toBe(false);
    });


    it('debería retornar true si el token no tiene el campo exp', () => {
      // Simulamos un token sin la propiedad exp
      (jwtDecode as jest.Mock).mockReturnValue({});

      const token = 'mockToken';
      expect(service.isTokenExpired(token)).toBe(true);
    });

  });



  describe('login', () => {

    it('debería hacer login y actualizar el estado de usuario y token en sessionStorage', (done) => {
      const credentials: LoginRequest = { email: 'user@example.com', password: 'password' };
      const response: LoginResponse = { token: 'mockToken', role: 'ADMIN' };

      // Simulamos el valor de decodificación del token
      const decodedToken = { sub: 'user@example.com', roles: 'ADMIN' };
      (jwtDecode as jest.Mock).mockReturnValue(decodedToken);

      service.login(credentials).subscribe((res) => {
        expect(res).toEqual(response);
        expect(service.currentUserIsLogin.value).toBe(true);
        expect(service.currentLoginData.value).toEqual({ email: 'user@example.com', role: 'ADMIN' });
        expect(sessionStorage.getItem('token')).toBe('mockToken');
        done();
      });

      // Simulamos la solicitud HTTP
      const req = httpMock.expectOne(service.loginURL);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });


    it('debería devolver la información vacia cuando el token esté en blanco', (done) => {
      const credentials: LoginRequest = { email: 'user@example.com', password: 'password' };
      const response: LoginResponse = { token: "", role: "" };

      // Simulamos el valor de decodificación del token
      const decodedToken = null;
      (jwtDecode as jest.Mock).mockReturnValue(decodedToken);

      service.login(credentials).subscribe((res) => {
        expect(res).toEqual(response);
        expect(service.currentUserIsLogin.value).toBe(true);
        expect(service.currentLoginData.value).toEqual({ email: "", role: "" });
        expect(sessionStorage.getItem("token")).toBe("");
        done();
      });

      // Simulamos la solicitud HTTP
      const req = httpMock.expectOne(service.loginURL);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });

  });



  describe('getSessionToken', () => {

    it('debería retornar true si el token es válido y no ha expirado', () => {
      const token = 'mockToken';
      sessionStorage.setItem('token', token);

      // Simulamos un token no expirado
      (jwtDecode as jest.Mock).mockReturnValue({ sub: 'user@example.com', roles: 'ADMIN', exp: Date.now() / 1000 + 1000 });

      const result = service.getSessionToken();
      expect(result).toBe(true);
      expect(service.currentUserIsLogin.value).toBe(true);
      expect(service.currentLoginData.value).toEqual({ email: 'user@example.com', role: 'ADMIN' });
    });


    it('debería retornar false y llamar a logout si el token está expirado o es inválido', () => {
      sessionStorage.setItem('token', 'expiredToken');

      // Simulamos un token expirado
      (jwtDecode as jest.Mock).mockReturnValue({ exp: Date.now() / 1000 - 1000 });

      const result = service.getSessionToken();
      expect(result).toBe(false);
      expect(service.currentUserIsLogin.value).toBe(false);
      expect(service.currentLoginData.value).toEqual({ email: '', role: '' });
      expect(sessionStorage.getItem('token')).toBe(null);
    });

  });




  describe('logout', () => {

    it('debería remover el token de sessionStorage y restablecer el estado de login', () => {
      sessionStorage.setItem('token', 'mockToken');
      service.currentUserIsLogin.next(true);
      service.currentLoginData.next({ email: 'user@example.com', role: 'admin' });

      service.logout();

      expect(sessionStorage.getItem('token')).toBeNull();
      expect(service.currentUserIsLogin.value).toBe(false);
      expect(service.currentLoginData.value).toEqual({ email: '', role: '' });
    });

  });




  describe('userIsLogin', () => {

    it('debería retornar el estado del logueo como un observable y como true', () => {
      service.currentUserIsLogin.next(true);

      service.userIsLogin.subscribe((status) => {
        expect(status).toBe(true);
      });
    });

  });



  describe('loginData', () => {

    it('debería retornar los datos del usuario como un observable', () => {
      service.currentLoginData.next({email: 'test@example.com', role: 'USER'});

      service.loginData.subscribe((data) => {
        expect(data).toEqual({email: 'test@example.com', role: 'USER'});
      });
    });

  });

});
