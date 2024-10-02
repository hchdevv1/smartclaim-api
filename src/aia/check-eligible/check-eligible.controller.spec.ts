import { Test, TestingModule } from '@nestjs/testing';
import { CheckEligibleController } from './check-eligible.controller';
import { CheckEligibleService } from './check-eligible.service';

describe('CheckEligibleController', () => {
  let controller: CheckEligibleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckEligibleController],
      providers: [CheckEligibleService],
    }).compile();

    controller = module.get<CheckEligibleController>(CheckEligibleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
