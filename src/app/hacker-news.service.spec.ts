import { TestBed, inject } from '@angular/core/testing';

import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HackerNewsService]
    });
  });

  it('should be created', inject([HackerNewsService], (service: HackerNewsService) => {
    expect(service).toBeTruthy();
  }));
});
