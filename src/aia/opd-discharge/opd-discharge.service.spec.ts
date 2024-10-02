import { Test, TestingModule } from '@nestjs/testing';
import { OpdDischargeService } from './opd-discharge.service';

describe('OpdDischargeService', () => {
  let service: OpdDischargeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpdDischargeService],
    }).compile();

    service = module.get<OpdDischargeService>(OpdDischargeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
