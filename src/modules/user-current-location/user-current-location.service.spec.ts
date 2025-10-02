import { Test, TestingModule } from '@nestjs/testing';
import { UserCurrentLocationService } from './user-current-location.service';

describe('UserCurrentLocationService', () => {
  let service: UserCurrentLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCurrentLocationService],
    }).compile();

    service = module.get<UserCurrentLocationService>(UserCurrentLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
