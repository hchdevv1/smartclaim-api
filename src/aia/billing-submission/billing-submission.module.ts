import { Module } from '@nestjs/common';
import { BillingSubmissionService } from './billing-submission.service';
import { BillingSubmissionController } from './billing-submission.controller';

@Module({
  controllers: [BillingSubmissionController],
  providers: [BillingSubmissionService],
})
export class BillingSubmissionModule {}
