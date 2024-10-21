import { Test, TestingModule } from '@nestjs/testing';
import { IpdDischargeController } from './ipd-discharge.controller';
import { IpdDischargeService } from './ipd-discharge.service';

describe('IpdDischargeController', () => {
  let controller: IpdDischargeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpdDischargeController],
      providers: [IpdDischargeService],
    }).compile();

    controller = module.get<IpdDischargeController>(IpdDischargeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
