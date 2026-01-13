import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests KPI data with date range', () => {
    service.getKpis('2024-01-01', '2024-01-07').subscribe();

    const req = httpMock.expectOne((request) =>
      request.url.endsWith('/kpis') && request.params.get('from') === '2024-01-01'
    );
    expect(req.request.params.get('to')).toBe('2024-01-07');
    req.flush([]);
  });
});
