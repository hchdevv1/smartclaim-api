import { Module } from '@nestjs/common';
import { BillingSubmissionService } from './billing-submission.service';
import { BillingSubmissionController } from './billing-submission.controller';
import {HttpModule} from '@nestjs/axios'
import { UtilsService } from '../../utils/utils.service';
@Module({
  imports: [HttpModule],
  controllers: [BillingSubmissionController],
  providers: [BillingSubmissionService ,UtilsService],
})
export class BillingSubmissionModule {}
