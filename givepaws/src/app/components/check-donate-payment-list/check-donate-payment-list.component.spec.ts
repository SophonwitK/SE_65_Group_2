import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDonatePaymentListComponent } from './check-donate-payment-list.component';

describe('CheckDonatePaymentListComponent', () => {
  let component: CheckDonatePaymentListComponent;
  let fixture: ComponentFixture<CheckDonatePaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckDonatePaymentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckDonatePaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
