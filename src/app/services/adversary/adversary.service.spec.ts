import { TestBed } from '@angular/core/testing';

import { AdversaryService } from './adversary.service';

describe('AdversaryService', () => {
  let service: AdversaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdversaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
