import { Controller, Post, Body } from '@nestjs/common';
import { RetrieveFurtherClaimListService } from './retrieve-further-claim-list.service';
import { QueryRetrieveFurtherClaimBodyDto } from './dto/query-retrieve-further-claim-list.dto';


@Controller('/v1/retrieve-further-claim-list')
export class RetrieveFurtherClaimListController {
  constructor(private readonly retrieveFurtherClaimListService: RetrieveFurtherClaimListService) {}

  @Post('/getRetrieveFurtherclaim')
  async getEpisodeByHN(@Body() queryRetrieveFurtherClaimBodyDto:QueryRetrieveFurtherClaimBodyDto){
        const result = this.retrieveFurtherClaimListService.RetrieveFurtherClaim(queryRetrieveFurtherClaimBodyDto);
        return result
  }
}
