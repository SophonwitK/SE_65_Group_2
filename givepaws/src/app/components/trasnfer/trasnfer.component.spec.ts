import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasnferComponent } from './trasnfer.component';

describe('TrasnferComponent', () => {
  let component: TrasnferComponent;
  let fixture: ComponentFixture<TrasnferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasnferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrasnferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
