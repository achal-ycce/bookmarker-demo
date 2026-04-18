import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookmarker } from './new-bookmarker';

describe('NewBookmarker', () => {
  let component: NewBookmarker;
  let fixture: ComponentFixture<NewBookmarker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBookmarker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBookmarker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
