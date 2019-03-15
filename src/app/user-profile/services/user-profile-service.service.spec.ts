import { TestBed } from '@angular/core/testing';

import { UserProfileServiceService } from './user-profile-service.service';

describe('UserProfileServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfileServiceService = TestBed.get(UserProfileServiceService);
    expect(service).toBeTruthy();
  });
});
