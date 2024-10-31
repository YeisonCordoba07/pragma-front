import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';
import { ITEM_CREATION_URL, TOKEN } from '../../constants/service.constants';
import { ItemResponse } from '../../../types/item.model';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService],
    });
    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should retrieve items from API via GET', () => {
    const mockResponse: ItemResponse = {
      content: [],
      page: 0,
      size: 10,
      totalPages: 1,
      totalElements: 0,
    };

    const page = 0;
    const size = 10;
    const table = 'someTable';
    const ascending = true;

    service.getItem(page, size, table, ascending).subscribe(items => {
      expect(items).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/item/getAll?page=${page}&size=${size}&sortBy=name&table=${table}&ascending=${ascending}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simula la respuesta del servidor
  });

  it('should create a new item and return the response', () => {
    const mockItem: ItemResponse = {
      content: [],
      page: 0,
      size: 10,
      totalPages: 1,
      totalElements: 1,
    };

    const mockResponse = { status: 201, body: mockItem };

    const newItem = {
      name: 'New Item',
      description: 'Item Description',
      quantity: 10,
      price: 100,
      categories: ['Category1', 'Category2'],
      brandName: 'Brand1',
    };

    service.createItem(newItem).subscribe(response => {
      expect(response.body).toEqual(mockItem);
      expect(response.status).toBe(201);
    });

    const req = httpMock.expectOne(ITEM_CREATION_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse.body, { status: 201, statusText: 'Created' }); // Simula la respuesta del servidor
  });
});
