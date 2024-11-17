import {TestBed} from '@angular/core/testing';

import {LoadingService} from './loading.service';


describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
    service = TestBed.inject(LoadingService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should initially emit false for loading$', (done) => {
    service.loading$.subscribe(loading => {
      expect(loading).toBeFalsy();
      done();
    });
  });

  it('should emit true when show() is called', (done) => {
    service.loading$.subscribe(loading => {
      if (loading) {
        expect(loading).toBeTruthy();
        done();
      }
    });
    service.show();
  });

  it('should emit false when hide() is called', async () => {
    const subscription = service.loading$.subscribe(loading => {
      if (!loading) {
        expect(loading).toBeFalsy();
      }
    });

    service.show();
    service.hide();

    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for async operations
    subscription.unsubscribe();
  });

  it('should emit multiple values correctly', (done) => {
    const expectedValues = [true, false, true];
    let counter = 0;

    service.loading$.subscribe(loading => {
      expect(loading).toEqual(expectedValues[counter]);
      counter++;
      if (counter === expectedValues.length) {
        done();
      }
    });

    service.show();
    service.hide();
    service.show();
  });


});
