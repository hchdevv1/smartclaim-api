import { Test, TestingModule } from '@nestjs/testing';
import { ClaimCancelController } from './claim-cancel.controller';
import { ClaimCancelService } from './claim-cancel.service';

describe('ClaimCancelController', () => {
  let controller: ClaimCancelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimCancelController],
      providers: [ClaimCancelService],
    }).compile();

    controller = module.get<ClaimCancelController>(ClaimCancelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
