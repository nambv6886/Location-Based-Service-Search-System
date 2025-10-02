import { Test, TestingModule } from '@nestjs/testing';
import { UserCurrentLocationController } from './user-current-location.controller';
import { UserCurrentLocationService } from './user-current-location.service';

describe('UserCurrentLocationController', () => {
  let controller: UserCurrentLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCurrentLocationController],
      providers: [UserCurrentLocationService],
    }).compile();

    controller = module.get<UserCurrentLocationController>(UserCurrentLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
