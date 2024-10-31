import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './brand.service';
import { BRAND_CREATION_URL, TOKEN } from '../../constants/service.constants';
import { BrandModel, BrandResponse } from '../../../types/brand.model';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService],
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should retrieve brands from API via GET', () => {
    const mockResponse: BrandResponse = {
      content: [],
      page: 0,
      size: 100,
      totalPages: 1,
      totalElements: 0,
    };

    service.getBrand(0, 10, true).subscribe(brands => {
      expect(brands).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/brand/getAll?page=0&size=10&sortBy=name&ascending=true`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simula la respuesta del servidor
  });

  it('should create a new brand and return the response', () => {
    const mockBrand: BrandModel = {
      id: 1,
      name: 'New Brand',
      description: 'Brand Description',
    };

    const mockResponse = { status: 201, body: mockBrand };

    service.createBrand({ name: 'New Brand', description: 'Brand Description' }).subscribe(response => {
      expect(response.body).toEqual(mockBrand);
      expect(response.status).toBe(201);
    });

    const req = httpMock.expectOne(BRAND_CREATION_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse.body, { status: 201, statusText: 'Created' }); // Simula la respuesta del servidor
  });
});
