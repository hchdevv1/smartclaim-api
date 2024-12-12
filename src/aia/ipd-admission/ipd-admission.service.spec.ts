import { Test, TestingModule } from '@nestjs/testing';
import { IpdAdmissionService } from './ipd-admission.service';

describe('IpdAdmissionService', () => {
  let service: IpdAdmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpdAdmissionService],
    }).compile();

    service = module.get<IpdAdmissionService>(IpdAdmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
