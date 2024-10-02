import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetrieveFurtherClaimListService } from './retrieve-further-claim-list.service';
import { CreateRetrieveFurtherClaimListDto } from './dto/create-retrieve-further-claim-list.dto';
import { UpdateRetrieveFurtherClaimListDto } from './dto/update-retrieve-further-claim-list.dto';

@Controller('retrieve-further-claim-list')
export class RetrieveFurtherClaimListController {
  constructor(private readonly retrieveFurtherClaimListService: RetrieveFurtherClaimListService) {}

  @Post()
  create(@Body() createRetrieveFurtherClaimListDto: CreateRetrieveFurtherClaimListDto) {
    return this.retrieveFurtherClaimListService.create(createRetrieveFurtherClaimListDto);
  }

  @Get()
  findAll() {
    return this.retrieveFurtherClaimListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retrieveFurtherClaimListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetrieveFurtherClaimListDto: UpdateRetrieveFurtherClaimListDto) {
    return this.retrieveFurtherClaimListService.update(+id, updateRetrieveFurtherClaimListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retrieveFurtherClaimListService.remove(+id);
  }
}
