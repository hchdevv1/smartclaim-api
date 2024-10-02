import { Test, TestingModule } from '@nestjs/testing';
import { BillingSubmissionController } from './billing-submission.controller';
import { BillingSubmissionService } from './billing-submission.service';

describe('BillingSubmissionController', () => {
  let controller: BillingSubmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingSubmissionController],
      providers: [BillingSubmissionService],
    }).compile();

    controller = module.get<BillingSubmissionController>(BillingSubmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
