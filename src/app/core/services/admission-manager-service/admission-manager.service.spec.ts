import { TestBed } from '@angular/core/testing';

import { AdmissionManagerService } from './admission-manager.service';

describe('AdmissionManagerService', () => {
  let service: AdmissionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmissionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
