import { Controller, Body ,Post,Get,Param } from '@nestjs/common';

import { CheckOpdBalanceService } from './check-opd-balance.service';
import {  QuerySubmitOpdDischargeDto } from './dto/result-BillingCheckBalance.dto';
@Controller('/v1/check-opd-balance')
export class CheckOpdBalanceController {
  constructor(private readonly checkOpdBalanceService: CheckOpdBalanceService) {}

  @Get('/listBillingCheckBalance/:xVN')
  listBillingCheckBalance(@Param('xVN') xVN: string ) {
    return  this.checkOpdBalanceService.listBillingCheckBalance(xVN);
  }

  @Post('/SubmitBillingCheckBalance')
  async SubmitBillingCheckBalance(@Body() querySubmitOpdDischargeDto:QuerySubmitOpdDischargeDto){
        const result = this.checkOpdBalanceService.SubmitBillingCheckBalance(querySubmitOpdDischargeDto);
        return result
  }
}
