import { Test, TestingModule } from '@nestjs/testing';
import { CheckEligibleService } from './check-eligible.service';

describe('CheckEligibleService', () => {
  let service: CheckEligibleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckEligibleService],
    }).compile();

    service = module.get<CheckEligibleService>(CheckEligibleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
