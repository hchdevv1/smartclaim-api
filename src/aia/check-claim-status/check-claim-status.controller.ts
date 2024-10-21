import { Controller, Post, Body } from '@nestjs/common';
import { CheckClaimStatusService } from './check-claim-status.service';

import { QueryCheckClaimStatusBodyDto } from './dto/query-check-claim-status.dto';

@Controller('/v1/check-claim-status')
export class CheckClaimStatusController {
  constructor(private readonly checkClaimStatusService: CheckClaimStatusService) {}


  @Post('/getcheckclaimstatus')
  async getcheckclaimstatus(@Body() queryCheckClaimStatusBodyDto:QueryCheckClaimStatusBodyDto){
        const result = this.checkClaimStatusService.Checkclaimstatus(queryCheckClaimStatusBodyDto);
        return result
  }
}
