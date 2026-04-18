import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkerHeader } from './bookmarker-header';

describe('BookmarkerHeader', () => {
  let component: BookmarkerHeader;
  let fixture: ComponentFixture<BookmarkerHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkerHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkerHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
