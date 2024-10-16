import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should make a GET request to get brands with correct URL and headers', () => {
    const mockToken = 'mock-token';
    const page = 1;
    const size = 5;
    const ascending = true;

    service.getBrand(page, size, mockToken, ascending).subscribe();

    const req = httpMock.expectOne(`http://localhost:8080/brand/getAll?page=1&size=5&sortBy=name&ascending=true`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

    req.flush({}); // Simular respuesta vacía
  });

  it('should make a POST request to create a brand with correct URL, body, and headers', () => {
    const mockToken = 'mock-token';
    const mockBrand = { name: 'New Brand', description: 'New Description' };

    service.createBrand(mockBrand, mockToken).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/brand');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockBrand);

    req.flush({}); // Simular respuesta vacía
  });

  it('should return the correct response for getBrands', () => {
    const mockResponse = {
      content: [{ id: 1, name: 'Brand 1', description: 'Description 1' }],
      page: 0,
      size: 5,
      totalElements: 1,
      totalPages: 1
    };

    service.getBrand(0, 5, 'mock-token', true).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/brand/getAll?page=0&size=5&sortBy=name&ascending=true');
    req.flush(mockResponse); // Simular respuesta de la API
  });

  it('should return the correct response for createBrand', () => {
    const mockBrand = { name: 'New Brand', description: 'New Description' };
    const mockResponse = { id: 1, ...mockBrand };

    service.createBrand(mockBrand, 'mock-token').subscribe(response => {
      expect(response.body).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/brand');
    req.flush(mockResponse); // Simular respuesta de la API
  });
});
