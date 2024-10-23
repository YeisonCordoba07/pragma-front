import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3MjkzOTM0MTEsImV4cCI6MTczMTk4NTQxMX0.cQDOqMKqfvsfGdxsI74CJLdbHrCG_xTDkat9uNWxbhk';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService]
    });
    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItem', () => {
    it('should call GET method with correct URL and headers', () => {
      const page = 0;
      const size = 10;
      const ascending = true;

      service.getItem(page, size, token, ascending).subscribe((response) => {
        expect(response).toEqual({}); // Puedes ajustar la respuesta esperada
      });

      const req = httpMock.expectOne(`http://localhost:8080/item/getAll?page=0&size=10&sortBy=name&ascending=true`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
      req.flush({}); // Devuelve una respuesta simulada vacía
    });
  });

  describe('createItem', () => {
    it('should call POST method with correct URL, body and headers', () => {
      const newItem = {
        name: 'Test Item',
        description: 'Test Description',
        quantity: 10,
        price: 100,
        categories: ['Electronics'],
        brandName: 'Apple'
      };

      service.createItem(newItem, token).subscribe((response) => {
        expect(response.status).toBe(201); // Verifica el código de estado
      });

      const req = httpMock.expectOne('http://localhost:8080/item');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newItem);
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush({ status: 201 }, { status: 201, statusText: 'Created' }); // Simula la respuesta HTTP exitosa
    });

    it('should handle errors from the POST request', () => {
      const newItem = {
        name: 'Test Item',
        description: 'Test Description',
        quantity: 10,
        price: 100,
        categories: ['Electronics'],
        brandName: 'Apple'
      };

      service.createItem(newItem, token).subscribe({
        next: () => fail('Should have failed with 500 error'),
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne('http://localhost:8080/item');
      req.flush('Error creating item', { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
