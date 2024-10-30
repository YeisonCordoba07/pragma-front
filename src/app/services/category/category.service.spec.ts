import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { CATEGORY_CREATION_URL, TOKEN } from '../../constants/service.constants';
import { CategoryModel, CategoryResponse } from '../../../types/category.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should retrieve categories from API via GET', () => {
    const mockResponse: CategoryResponse = {
      content: [],
      page: 0,
      size: 100,
      totalPages: 1,
      totalElements: 0,
    };

    service.getCategories(0, 10, true).subscribe(categories => {
      expect(categories).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/category/getAll?page=0&size=10&sortBy=name&ascending=true`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simula la respuesta del servidor
  });

  it('should create a new category and return the response', () => {
    const mockCategory: CategoryModel = {
      id: 1,
      name: 'New Category',
      description: 'Category Description',
    };

    const mockResponse = { status: 201, body: mockCategory };

    service.createCategory({ name: 'New Category', description: 'Category Description' }).subscribe(response => {
      expect(response.body).toEqual(mockCategory);
      expect(response.status).toBe(201);
    });

    const req = httpMock.expectOne(CATEGORY_CREATION_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse.body, { status: 201, statusText: 'Created' }); // Simula la respuesta del servidor
  });
});
