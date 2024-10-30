import { Controller, Get,Param } from '@nestjs/common';

import { CheckOpdBalanceService } from './check-opd-balance.service';

@Controller('/v1/check-opd-balance')
export class CheckOpdBalanceController {
  constructor(private readonly checkOpdBalanceService: CheckOpdBalanceService) {}

  @Get('/listBillingCheckBalance/:xVN')
  listBillingCheckBalance(@Param('xVN') xVN: string ) {
    return  this.checkOpdBalanceService.listBillingCheckBalance(xVN);
  }

  
}
