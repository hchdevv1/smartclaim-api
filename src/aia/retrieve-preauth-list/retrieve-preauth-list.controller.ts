import { Controller, Post, Body } from '@nestjs/common';
import { RetrievePreauthListService } from './retrieve-preauth-list.service';
import { QueryRetrievePreauthListBodyDto } from './dto/query-retrieve-preauth-list.dto';
@Controller('/v1/retrieve-preauth-list')
export class RetrievePreauthListController {
  constructor(private readonly retrievePreauthListService: RetrievePreauthListService) {}


  @Post('/getretrievepreauthlist')
  async getcheckclaimstatus(@Body() queryRetrievePreauthListBodyDto:QueryRetrievePreauthListBodyDto){
        const result =  await this.retrievePreauthListService.getretrievepreauthlist(queryRetrievePreauthListBodyDto)
        return result
  }
}
