import { Controller, Post, Body } from '@nestjs/common';
import { ClaimCancelService } from './claim-cancel.service';
import {QueryClaimCancelBodyDto} from './dto/query-claim-cancel.dto';

@Controller('/v1/claim-cancel')
export class ClaimCancelController {
  constructor(private readonly claimCancelService: ClaimCancelService) {}


  @Post('/getclaimcancel')
  async getclaimcancel(@Body() queryClaimCancelBodyDto:QueryClaimCancelBodyDto){
        const result = this.claimCancelService.ClaimCancel(queryClaimCancelBodyDto);
        return result
  }

}
