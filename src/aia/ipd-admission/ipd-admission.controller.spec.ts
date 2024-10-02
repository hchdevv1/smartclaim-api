import { Test, TestingModule } from '@nestjs/testing';
import { IpdAdmissionController } from './ipd-admission.controller';
import { IpdAdmissionService } from './ipd-admission.service';

describe('IpdAdmissionController', () => {
  let controller: IpdAdmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpdAdmissionController],
      providers: [IpdAdmissionService],
    }).compile();

    controller = module.get<IpdAdmissionController>(IpdAdmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
