import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcAddEditComponent } from './hc-add-edit.component';

describe('HcAddEditComponent', () => {
  let component: HcAddEditComponent;
  let fixture: ComponentFixture<HcAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
