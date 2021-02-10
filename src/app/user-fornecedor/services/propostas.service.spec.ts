import { TestBed } from '@angular/core/testing';

import { PropostasService } from './propostas.service';

describe('PropostasService', () => {
  let service: PropostasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropostasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
