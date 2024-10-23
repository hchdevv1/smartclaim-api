import { Controller, Post, Body } from '@nestjs/common';
import { CheckClaimStatusService } from './check-claim-status.service';

import { QueryCheckClaimStatusBodyDto } from './dto/query-check-claim-status.dto';
import { QueryCheckClaimStatusListAllBodyDto } from './dto/query-check-claim-status-listall.dto';
@Controller('/v1/check-claim-status')
export class CheckClaimStatusController {
  constructor(private readonly checkClaimStatusService: CheckClaimStatusService) {}


  @Post('/getcheckclaimstatus')
  async getcheckclaimstatus(@Body() queryCheckClaimStatusBodyDto:QueryCheckClaimStatusBodyDto){
        const result = await this.checkClaimStatusService.Checkclaimstatus(queryCheckClaimStatusBodyDto);
        return result
  }
  @Post('/getcheckclaimstatusListAll')
  async getcheckclaimstatusListAll(@Body() queryCheckClaimStatusListAllBodyDto:QueryCheckClaimStatusListAllBodyDto){
        const result = await this.checkClaimStatusService.getcheckclaimstatusListAll(queryCheckClaimStatusListAllBodyDto);
        return result
  }
}
