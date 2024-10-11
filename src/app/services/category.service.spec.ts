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

  it('should fetch categories with token', () => {
    const dummyCategoriesResponse = {
      content: [
        { id: 1, name: 'Category 1', description: 'Description 1' },
        { id: 2, name: 'Category 2', description: 'Description 2' }
      ],
      page: 0,
      size: 3,
      totalElements: 6,
      totalPages: 2
    };
    const token = 'dummy-token';

    service.getCategories(0, 3, token).subscribe((response) => {
      expect(response.content.length).toBe(2);
      expect(response.content[0].name).toBe('Category 1');
    });

    const req = httpMock.expectOne('http://localhost:8080/category/getAll?page=0&size=3&sortBy=name&ascending=true');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush(dummyCategoriesResponse); // Simula la respuesta HTTP
  });

  it('should create a category with token', () => {
    const newCategory = { name: 'New Category', description: 'New Description' };
    const token = 'dummy-token';

    service.createCategory(newCategory, token).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpMock.expectOne('http://localhost:8080/category');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush({ status: 201 }); // Simula la respuesta HTTP
  });
});
