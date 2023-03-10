import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalCoordinatorComponent } from './hospital-coordinator.component';

describe('HospitalCoordinatorComponent', () => {
  let component: HospitalCoordinatorComponent;
  let fixture: ComponentFixture<HospitalCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalCoordinatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
