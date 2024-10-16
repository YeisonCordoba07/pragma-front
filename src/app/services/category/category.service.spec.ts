import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('should make a GET request to get categories with correct URL and headers', () => {
    const mockToken = 'mock-token';
    const page = 1;
    const size = 5;
    const ascending = true;

    service.getCategories(page, size, mockToken, ascending).subscribe();

    const req = httpMock.expectOne(`http://localhost:8080/category/getAll?page=1&size=5&sortBy=name&ascending=true`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

    req.flush({}); // Simular respuesta vacía
  });

  it('should make a POST request to create a category with correct URL, body, and headers', () => {
    const mockToken = 'mock-token';
    const mockCategory = { name: 'New Category', description: 'New Description' };

    service.createCategory(mockCategory, mockToken).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/category');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockCategory);

    req.flush({}); // Simular respuesta vacía
  });

  it('should return the correct response for getCategories', () => {
    const mockResponse = {
      content: [{ id: 1, name: 'Category 1', description: 'Description 1' }],
      page: 0,
      size: 5,
      totalElements: 1,
      totalPages: 1
    };

    service.getCategories(0, 5, 'mock-token', true).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/category/getAll?page=0&size=5&sortBy=name&ascending=true');
    req.flush(mockResponse); // Simular respuesta de la API
  });

  it('should return the correct response for createCategory', () => {
    const mockCategory = { name: 'New Category', description: 'New Description' };
    const mockResponse = { id: 1, ...mockCategory };

    service.createCategory(mockCategory, 'mock-token').subscribe(response => {
      expect(response.body).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/category');
    req.flush(mockResponse); // Simular respuesta de la API
  });
});
