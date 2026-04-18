import { TestBed } from '@angular/core/testing';

import { SearchBookmarker } from './search-bookmarker';

describe('SearchBookmarker', () => {
  let service: SearchBookmarker;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBookmarker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
