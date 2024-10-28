import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;


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
  it('should fetch items with the correct parameters', () => {
    const mockResponse = {
      content: [{ id: 1, name: 'Item 1', description: 'Description 1' }],
      page: 0,
      size: 5,
      totalElements: 10,
      totalPages: 2
    };

    service.getItem(0, 5, 'item', true).subscribe(response => {
      expect(response.content.length).toBe(1);
      expect(response.page).toBe(0);
    });

    const req = httpMock.expectOne(
      'http://localhost:8080/item/getAll?page=0&size=5&sortBy=name&table=item&ascending=true'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service['token']}`);
    req.flush(mockResponse);
  });


  it('should create a new item with the correct headers', () => {
    const mockItem = {
      name: 'New Item',
      description: 'New Description',
      quantity: 10,
      price: 100,
      categories: ['Category1'],
      brandName: 'Brand1'
    };
    const mockResponse = { success: true };

    service.createItem(mockItem, service['token']).subscribe(response => {
      expect(response.success).toBe(true);
    });

    const req = httpMock.expectOne('http://localhost:8080/item');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service['token']}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse);
  });


});
