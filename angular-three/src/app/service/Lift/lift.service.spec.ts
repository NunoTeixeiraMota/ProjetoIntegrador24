import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LiftService } from './lift.service';
import { API_CONFIG } from 'config';

describe('LiftService', () => {
  let service: LiftService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LiftService]
    });

    service = TestBed.inject(LiftService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createLift should make HTTP POST request', () => {
    const testLiftData = { localization: 'Ground Floor', state: 'Operational', building: '1' };
    service.createLift(testLiftData).subscribe();
    const req = httpTestingController.expectOne(`${API_CONFIG.apiBaseUrl}/lift/create`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testLiftData);
    req.flush(null); 
  });
});
