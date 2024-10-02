import { Module } from '@nestjs/common';
import { OpdDischargeService } from './opd-discharge.service';
import { OpdDischargeController } from './opd-discharge.controller';

@Module({
  controllers: [OpdDischargeController],
  providers: [OpdDischargeService],
})
export class OpdDischargeModule {}
