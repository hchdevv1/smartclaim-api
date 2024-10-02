import { Test, TestingModule } from '@nestjs/testing';
import { RetrieveFurtherClaimListService } from './retrieve-further-claim-list.service';

describe('RetrieveFurtherClaimListService', () => {
  let service: RetrieveFurtherClaimListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetrieveFurtherClaimListService],
    }).compile();

    service = module.get<RetrieveFurtherClaimListService>(RetrieveFurtherClaimListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
