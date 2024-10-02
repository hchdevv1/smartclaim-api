import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetrievePreauthListService } from './retrieve-preauth-list.service';
import { CreateRetrievePreauthListDto } from './dto/create-retrieve-preauth-list.dto';
import { UpdateRetrievePreauthListDto } from './dto/update-retrieve-preauth-list.dto';

@Controller('retrieve-preauth-list')
export class RetrievePreauthListController {
  constructor(private readonly retrievePreauthListService: RetrievePreauthListService) {}

  @Post()
  create(@Body() createRetrievePreauthListDto: CreateRetrievePreauthListDto) {
    return this.retrievePreauthListService.create(createRetrievePreauthListDto);
  }

  @Get()
  findAll() {
    return this.retrievePreauthListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retrievePreauthListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetrievePreauthListDto: UpdateRetrievePreauthListDto) {
    return this.retrievePreauthListService.update(+id, updateRetrievePreauthListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retrievePreauthListService.remove(+id);
  }
}
