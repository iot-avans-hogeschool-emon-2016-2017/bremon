import { TestBed, inject } from '@angular/core/testing';
import { MeasurementService } from './measurement.service';

describe('MeasurementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurementService]
    });
  });

  it('should ...', inject([MeasurementService], (service: MeasurementService) => {
    expect(service).toBeTruthy();
  }));
});
