import { TestBed } from '@angular/core/testing';

import { ToasterMessage } from './toaster-message';

describe('ToasterMessage', () => {
  let service: ToasterMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterMessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
