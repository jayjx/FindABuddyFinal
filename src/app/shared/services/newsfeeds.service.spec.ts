import { TestBed } from '@angular/core/testing';
import { NewsfeedsService } from './newsfeeds.service';

describe('NewsfeedsService', () => {
  let service: NewsfeedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsfeedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

