import { Test, TestingModule } from '@nestjs/testing';
import { RetrievePreauthListService } from './retrieve-preauth-list.service';

describe('RetrievePreauthListService', () => {
  let service: RetrievePreauthListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetrievePreauthListService],
    }).compile();

    service = module.get<RetrievePreauthListService>(RetrievePreauthListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
