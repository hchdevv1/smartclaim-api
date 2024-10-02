import { Test, TestingModule } from '@nestjs/testing';
import { BillingSubmissionService } from './billing-submission.service';

describe('BillingSubmissionService', () => {
  let service: BillingSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingSubmissionService],
    }).compile();

    service = module.get<BillingSubmissionService>(BillingSubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
