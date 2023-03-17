import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardHistoryComponent } from './post-card-history.component';

describe('PostCardHistoryComponent', () => {
  let component: PostCardHistoryComponent;
  let fixture: ComponentFixture<PostCardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCardHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
