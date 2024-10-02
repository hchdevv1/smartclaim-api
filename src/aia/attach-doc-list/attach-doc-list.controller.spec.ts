import { Test, TestingModule } from '@nestjs/testing';
import { AttachDocListController } from './attach-doc-list.controller';
import { AttachDocListService } from './attach-doc-list.service';

describe('AttachDocListController', () => {
  let controller: AttachDocListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttachDocListController],
      providers: [AttachDocListService],
    }).compile();

    controller = module.get<AttachDocListController>(AttachDocListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
