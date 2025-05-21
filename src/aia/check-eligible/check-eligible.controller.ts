import { Controller,Post ,Body} from '@nestjs/common';
import { CheckEligibleService } from './check-eligible.service';

import { QueryEligibleBodyDto  ,QueryCreateTransactionBodyDto} from './dto/query-check-eligible.dto';
@Controller('/v1/check-eligible')
export class CheckEligibleController {
  constructor(private readonly checkEligibleService: CheckEligibleService) {}



  @Post('/getEpisodeByHN')
  async getEpisodeByHN(@Body() queryEligibleBodyDto:QueryEligibleBodyDto){
        const result = this.checkEligibleService.getEpisodeByHN(queryEligibleBodyDto);
        return result
  }

  @Post('/checkeligible')
  async checkeligible(@Body() queryEligibleBodyDto:QueryEligibleBodyDto){
        const result = this.checkEligibleService.checkeligible(queryEligibleBodyDto);
        return result
  }
  @Post('/crateTransaction')
  async crateTransaction(@Body() queryCreateTransactionBodyDto:QueryCreateTransactionBodyDto){
        const result = this.checkEligibleService.crateTransaction(queryCreateTransactionBodyDto);
        return result
  }
    @Post('/getListPolicyNo')
  async getListPolicyNo(@Body() queryEligibleBodyDto:QueryEligibleBodyDto){
        const result = this.checkEligibleService.getListPolicyNo(queryEligibleBodyDto);
        return result
  }
    @Post('/getListPolicyNoDetail')
  async getListPolicyNoDetail(@Body() queryEligibleBodyDto:QueryEligibleBodyDto){
        const result = this.checkEligibleService.getListPolicyNoDetail(queryEligibleBodyDto);
        return result
  }

}
