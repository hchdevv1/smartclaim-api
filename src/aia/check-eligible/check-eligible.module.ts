import { Module } from '@nestjs/common';
import { CheckEligibleService } from './check-eligible.service';
import { CheckEligibleController } from './check-eligible.controller';
import {HttpModule} from '@nestjs/axios'

import { UtilsService } from '../../utils/utils.service';
@Module({
  imports: [HttpModule],
  controllers: [CheckEligibleController],
  providers: [CheckEligibleService,UtilsService],
})
export class CheckEligibleModule {}
