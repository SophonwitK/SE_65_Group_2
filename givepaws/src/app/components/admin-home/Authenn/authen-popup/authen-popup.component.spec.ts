import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenPopupComponent } from './authen-popup.component';

describe('AuthenPopupComponent', () => {
  let component: AuthenPopupComponent;
  let fixture: ComponentFixture<AuthenPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
