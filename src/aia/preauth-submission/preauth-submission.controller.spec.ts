import { Test, TestingModule } from '@nestjs/testing';
import { PreauthSubmissionController } from './preauth-submission.controller';
import { PreauthSubmissionService } from './preauth-submission.service';

describe('PreauthSubmissionController', () => {
  let controller: PreauthSubmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreauthSubmissionController],
      providers: [PreauthSubmissionService],
    }).compile();

    controller = module.get<PreauthSubmissionController>(PreauthSubmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
