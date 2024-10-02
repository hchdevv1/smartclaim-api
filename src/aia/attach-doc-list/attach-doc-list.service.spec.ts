import { Test, TestingModule } from '@nestjs/testing';
import { AttachDocListService } from './attach-doc-list.service';

describe('AttachDocListService', () => {
  let service: AttachDocListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachDocListService],
    }).compile();

    service = module.get<AttachDocListService>(AttachDocListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
