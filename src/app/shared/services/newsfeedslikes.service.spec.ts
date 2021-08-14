import { TestBed } from '@angular/core/testing';
import { NewsfeedsLikesService } from './newsfeedslikes.service';

describe('NewsfeedsService', () => {
  let service: NewsfeedsLikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsfeedsLikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

