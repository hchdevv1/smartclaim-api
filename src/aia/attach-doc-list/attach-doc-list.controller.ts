import { Controller,  Post, Body } from '@nestjs/common';
import { AttachDocListService } from './attach-doc-list.service';
import { QueryAttachBodyDto } from './dto/query-attach-doc-list.dto';

@Controller('/v1/attach-doc-list')
export class AttachDocListController {
  constructor(private readonly attachDocListService: AttachDocListService) {}


  @Post('/attachDocList')
  async getbillingsubmission(@Body() queryAttachBodyDto:QueryAttachBodyDto){
        const result = this.attachDocListService.AttachDocList(queryAttachBodyDto);
        return result
  }
}
