import { TestBed } from '@angular/core/testing';

import { SupplyService } from './supply.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


describe('SupplyService', () => {
  let service: SupplyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplyService]
    });
    service = TestBed.inject(SupplyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar una solicitud POST para agregar suministro', () => {
    const newSupply = { idItem: 1, quantity: 5 };
    const expectedUrl = 'http://localhost:8082/supply';

    service.addSupply(newSupply).subscribe(response => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.body).toEqual(newSupply);

    // Simula una respuesta de éxito desde el backend
    req.flush({ status: 200 });
  });

  it('debería manejar errores HTTP correctamente', () => {
    const newSupply = { idItem: 1, quantity: 5 };
    const expectedUrl = 'http://localhost:8082/supply';

    service.addSupply(newSupply).subscribe(
      () => fail('Debería haber fallado con un error 500'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');

    // Simula una respuesta de error desde el backend
    req.flush('Error en el servidor', { status: 500, statusText: 'Internal Server Error' });
  });

});
