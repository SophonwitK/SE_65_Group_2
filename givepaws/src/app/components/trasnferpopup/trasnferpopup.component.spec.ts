import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasnferpopupComponent } from './trasnferpopup.component';

describe('TrasnferpopupComponent', () => {
  let component: TrasnferpopupComponent;
  let fixture: ComponentFixture<TrasnferpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasnferpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrasnferpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
