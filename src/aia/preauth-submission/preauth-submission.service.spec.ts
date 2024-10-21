import { Test, TestingModule } from '@nestjs/testing';
import { PreauthSubmissionService } from './preauth-submission.service';

describe('PreauthSubmissionService', () => {
  let service: PreauthSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreauthSubmissionService],
    }).compile();

    service = module.get<PreauthSubmissionService>(PreauthSubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
