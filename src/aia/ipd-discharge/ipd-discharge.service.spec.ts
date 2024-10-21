import { Test, TestingModule } from '@nestjs/testing';
import { IpdDischargeService } from './ipd-discharge.service';

describe('IpdDischargeService', () => {
  let service: IpdDischargeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpdDischargeService],
    }).compile();

    service = module.get<IpdDischargeService>(IpdDischargeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
