import { TestBed } from '@angular/core/testing';

import { TranferService } from './tranfer.service';

describe('TranferService', () => {
  let service: TranferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
