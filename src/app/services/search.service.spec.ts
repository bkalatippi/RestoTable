import { TestBed } from '@angular/core/testing';

import { CitysearchService } from './citysearch.service';

describe('CitysearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitysearchService = TestBed.get(CitysearchService);
    expect(service).toBeTruthy();
  });
});
