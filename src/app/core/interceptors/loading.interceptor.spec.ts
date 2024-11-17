import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../../services/loading/loading.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loadingService: LoadingService;

  beforeEach(() => {
    const loadingServiceMock = {
      show: jest.fn(),
      hide: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: LoadingService, useValue: loadingServiceMock },
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loadingService = TestBed.inject(LoadingService);
  });

  it('should call show() on HTTP request and hide() on HTTP response', () => {
    // Arrange: Mock the HTTP request
    const testUrl = '/test';
    const testData = { key: 'value' };

    // Act: Make an HTTP request
    httpClient.get(testUrl).subscribe(response => {
      expect(response).toEqual(testData);  // Verify the response
    });

    // Assert: Check that show() was called before the request
    expect(loadingService.show).toHaveBeenCalledTimes(1);

    // Complete the HTTP request and verify hide() is called
    const req = httpMock.expectOne(testUrl);
    req.flush(testData);  // Respond with mock data

    // Assert: Check that hide() was called after the response
    expect(loadingService.hide).toHaveBeenCalledTimes(1);

    // Verify no outstanding requests
    httpMock.verify();
  });

  it('should call hide() even if there is an error response', () => {
    // Arrange: Mock the HTTP request
    const testUrl = '/test';
    const errorMessage = 'Error occurred';

    // Act: Make an HTTP request that will fail
    httpClient.get(testUrl).subscribe(
      () => {},
      (error) => {
        expect(error.status).toBe(500);  // Verify error status
      }
    );

    // Assert: Check that show() was called before the request
    expect(loadingService.show).toHaveBeenCalledTimes(1);

    // Complete the HTTP request with an error response
    const req = httpMock.expectOne(testUrl);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });

    // Assert: Check that hide() was called after the error
    expect(loadingService.hide).toHaveBeenCalledTimes(1);

    // Verify no outstanding requests
    httpMock.verify();
  });
});
