import { TestBed } from '@angular/core/testing';

import { MetodosComunesService } from './metodos-comunes.service';

describe('MetodosComunesService', () => {
  let service: MetodosComunesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodosComunesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
