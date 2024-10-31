import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAccountService } from './user-account.service';
import { USER_CREATION_URL, TOKEN } from '../../constants/service.constants';
import { UserAccountModel } from '../../../types/user-account.model';

describe('UserAccountService', () => {
  let service: UserAccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserAccountService],
    });
    service = TestBed.inject(UserAccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should create a new user and return the response', () => {
    const mockResponse: UserAccountModel = {
      name: 'John',
      lastName: 'Doe',
      identityDocument: 12345678,
      phone: '123456789',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'securePassword',
      role: 'user',
    };

    const newUser = {
      name: 'John',
      lastName: 'Doe',
      identityDocument: 12345678,
      phone: '123456789',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'securePassword',
      role: 'user',
    };

    service.createUser(newUser).subscribe(response => {
      expect(response.body).toEqual(mockResponse);
      expect(response.status).toBe(201);
    });

    const req = httpMock.expectOne(USER_CREATION_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse, { status: 201, statusText: 'Created' }); // Simula la respuesta del servidor
  });
});
