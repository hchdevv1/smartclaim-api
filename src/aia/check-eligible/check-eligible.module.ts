import { Module } from '@nestjs/common';
import { CheckEligibleService } from './check-eligible.service';
import { CheckEligibleController } from './check-eligible.controller';
import {HttpModule} from '@nestjs/axios'
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';
@Module({
  imports: [HttpModule],
  controllers: [CheckEligibleController],
  providers: [CheckEligibleService,UtilsService,TrakcareService],
})
export class CheckEligibleModule {}
