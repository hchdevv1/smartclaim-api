import { Test, TestingModule } from '@nestjs/testing';
import { ClaimCancelService } from './claim-cancel.service';

describe('ClaimCancelService', () => {
  let service: ClaimCancelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimCancelService],
    }).compile();

    service = module.get<ClaimCancelService>(ClaimCancelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
