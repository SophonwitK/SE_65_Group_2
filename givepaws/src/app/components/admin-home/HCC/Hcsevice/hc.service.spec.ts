import { TestBed } from '@angular/core/testing';

import { HcService } from './hc.service';

describe('HcService', () => {
  let service: HcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
