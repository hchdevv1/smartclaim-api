import { Test, TestingModule } from '@nestjs/testing';
import { OpdDischargeController } from './opd-discharge.controller';
import { OpdDischargeService } from './opd-discharge.service';

describe('OpdDischargeController', () => {
  let controller: OpdDischargeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpdDischargeController],
      providers: [OpdDischargeService],
    }).compile();

    controller = module.get<OpdDischargeController>(OpdDischargeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
