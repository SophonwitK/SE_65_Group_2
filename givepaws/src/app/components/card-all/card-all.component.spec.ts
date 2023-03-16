import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAllComponent } from './card-all.component';

describe('CardAllComponent', () => {
  let component: CardAllComponent;
  let fixture: ComponentFixture<CardAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
