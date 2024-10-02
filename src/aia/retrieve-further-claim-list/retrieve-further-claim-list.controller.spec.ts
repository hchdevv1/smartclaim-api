import { Test, TestingModule } from '@nestjs/testing';
import { RetrieveFurtherClaimListController } from './retrieve-further-claim-list.controller';
import { RetrieveFurtherClaimListService } from './retrieve-further-claim-list.service';

describe('RetrieveFurtherClaimListController', () => {
  let controller: RetrieveFurtherClaimListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetrieveFurtherClaimListController],
      providers: [RetrieveFurtherClaimListService],
    }).compile();

    controller = module.get<RetrieveFurtherClaimListController>(RetrieveFurtherClaimListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
