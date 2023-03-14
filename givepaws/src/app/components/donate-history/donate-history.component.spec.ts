import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateHistoryComponent } from './donate-history.component';

describe('DonateHistoryComponent', () => {
  let component: DonateHistoryComponent;
  let fixture: ComponentFixture<DonateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
