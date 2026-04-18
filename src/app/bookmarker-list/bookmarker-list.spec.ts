import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkerList } from './bookmarker-list';

describe('BookmarkerList', () => {
  let component: BookmarkerList;
  let fixture: ComponentFixture<BookmarkerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
