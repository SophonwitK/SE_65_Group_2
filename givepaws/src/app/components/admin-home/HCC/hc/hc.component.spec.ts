import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcComponent } from './hc.component';

describe('HcComponent', () => {
  let component: HcComponent;
  let fixture: ComponentFixture<HcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
