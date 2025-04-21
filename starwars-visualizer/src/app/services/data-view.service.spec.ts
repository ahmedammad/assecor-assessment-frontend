import { TestBed } from '@angular/core/testing';

import { DataViewService } from './data-view.service';

describe('DataViewService', () => {
  let service: DataViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
