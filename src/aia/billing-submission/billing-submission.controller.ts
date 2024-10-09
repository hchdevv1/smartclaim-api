import { Controller, Post, Body } from '@nestjs/common';
import { BillingSubmissionService } from './billing-submission.service';

import { QueryBillingSubmissionBodyDto } from './dto/query-billing-submission.dto';
@Controller('/v1/billing-submission')
export class BillingSubmissionController {
  constructor(private readonly billingSubmissionService: BillingSubmissionService) {}


  @Post('/getbillingsubmission')
  async getbillingsubmission(@Body() queryBillingSubmissionBodyDto:QueryBillingSubmissionBodyDto){
        const result = this.billingSubmissionService.Billingsubmission(queryBillingSubmissionBodyDto);
        return result
  }
}
