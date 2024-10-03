import { Module } from '@nestjs/common';
import { OpdDischargeService } from './opd-discharge.service';
import { OpdDischargeController } from './opd-discharge.controller';
import {HttpModule} from '@nestjs/axios'
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';
@Module({
  imports: [HttpModule],
  controllers: [OpdDischargeController],
  providers: [OpdDischargeService ,TrakcareService ,UtilsService],
})
export class OpdDischargeModule {}
