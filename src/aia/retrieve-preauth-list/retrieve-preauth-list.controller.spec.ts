import { Test, TestingModule } from '@nestjs/testing';
import { RetrievePreauthListController } from './retrieve-preauth-list.controller';
import { RetrievePreauthListService } from './retrieve-preauth-list.service';

describe('RetrievePreauthListController', () => {
  let controller: RetrievePreauthListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetrievePreauthListController],
      providers: [RetrievePreauthListService],
    }).compile();

    controller = module.get<RetrievePreauthListController>(RetrievePreauthListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
