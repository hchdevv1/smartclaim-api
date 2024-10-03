import { Controller,Post ,Body} from '@nestjs/common';
import { CheckEligibleService } from './check-eligible.service';

import { QueryEligibleBodyDto } from './dto/query-check-eligible.dto';
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
}
