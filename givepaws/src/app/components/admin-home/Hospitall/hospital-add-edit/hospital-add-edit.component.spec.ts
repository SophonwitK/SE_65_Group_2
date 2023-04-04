import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAddEditComponent } from './hospital-add-edit.component';

describe('HospitalAddEditComponent', () => {
  let component: HospitalAddEditComponent;
  let fixture: ComponentFixture<HospitalAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
