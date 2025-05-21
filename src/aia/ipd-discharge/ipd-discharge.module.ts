import { Module } from '@nestjs/common';
import { IpdDischargeService } from './ipd-discharge.service';
import { IpdDischargeController } from './ipd-discharge.controller';
import {HttpModule} from '@nestjs/axios'
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';
@Module({
  imports: [HttpModule],
  controllers: [IpdDischargeController],
  providers: [IpdDischargeService ,UtilsService ,TrakcareService],
})
export class IpdDischargeModule {}
