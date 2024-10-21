import { Module } from '@nestjs/common';
import { IpdDischargeService } from './ipd-discharge.service';
import { IpdDischargeController } from './ipd-discharge.controller';

@Module({
  controllers: [IpdDischargeController],
  providers: [IpdDischargeService],
})
export class IpdDischargeModule {}
