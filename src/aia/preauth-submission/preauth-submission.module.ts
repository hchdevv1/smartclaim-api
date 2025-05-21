import { Module } from '@nestjs/common';
import { PreauthSubmissionService } from './preauth-submission.service';
import { PreauthSubmissionController } from './preauth-submission.controller';
import {HttpModule} from '@nestjs/axios'
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';
import { CheckEligibleService } from '../../aia/check-eligible/check-eligible.service';
@Module({
  imports: [HttpModule],
  controllers: [PreauthSubmissionController],
  providers: [PreauthSubmissionService  ,UtilsService ,TrakcareService ,CheckEligibleService],
})
export class PreauthSubmissionModule {}
