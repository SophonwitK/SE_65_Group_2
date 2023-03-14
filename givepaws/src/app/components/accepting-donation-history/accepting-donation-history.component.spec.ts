import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptingDonationHistoryComponent } from './accepting-donation-history.component';

describe('AcceptingDonationHistoryComponent', () => {
  let component: AcceptingDonationHistoryComponent;
  let fixture: ComponentFixture<AcceptingDonationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptingDonationHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptingDonationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
