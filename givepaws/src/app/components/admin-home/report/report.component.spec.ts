import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportComponent } from './report.component';

describe('ReportComponent', () => {
  let component: AdminReportComponent;
  let fixture: ComponentFixture<AdminReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
