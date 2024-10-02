import { Test, TestingModule } from '@nestjs/testing';
import { CheckClaimStatusController } from './check-claim-status.controller';
import { CheckClaimStatusService } from './check-claim-status.service';

describe('CheckClaimStatusController', () => {
  let controller: CheckClaimStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckClaimStatusController],
      providers: [CheckClaimStatusService],
    }).compile();

    controller = module.get<CheckClaimStatusController>(CheckClaimStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
