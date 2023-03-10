import { TestBed } from '@angular/core/testing';

import { AuthenUserGuard } from './authen-user.guard';

describe('AuthenUserGuard', () => {
  let guard: AuthenUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
