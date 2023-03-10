import { TestBed } from '@angular/core/testing';

import { HospitalCoordinatorGuard } from './hospital-coordinator.guard';

describe('HospitalCoordinatorGuard', () => {
  let guard: HospitalCoordinatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HospitalCoordinatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
