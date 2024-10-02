import { Test, TestingModule } from '@nestjs/testing';
import { CheckClaimStatusService } from './check-claim-status.service';

describe('CheckClaimStatusService', () => {
  let service: CheckClaimStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckClaimStatusService],
    }).compile();

    service = module.get<CheckClaimStatusService>(CheckClaimStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
