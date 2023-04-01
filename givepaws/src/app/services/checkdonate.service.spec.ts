import { TestBed } from '@angular/core/testing';

import { CheckdonateService } from './checkdonate.service';

describe('CheckdonateService', () => {
  let service: CheckdonateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckdonateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
