import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCardComponent } from './complete-card.component';

describe('CompleteCardComponent', () => {
  let component: CompleteCardComponent;
  let fixture: ComponentFixture<CompleteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
