import { TestBed } from '@angular/core/testing';

import { TranferpopupService } from './tranferpopup.service';

describe('TranferpopupService', () => {
  let service: TranferpopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranferpopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
