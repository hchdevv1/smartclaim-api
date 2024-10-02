import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttachDocListService } from './attach-doc-list.service';
import { CreateAttachDocListDto } from './dto/create-attach-doc-list.dto';
import { UpdateAttachDocListDto } from './dto/update-attach-doc-list.dto';

@Controller('attach-doc-list')
export class AttachDocListController {
  constructor(private readonly attachDocListService: AttachDocListService) {}

  @Post()
  create(@Body() createAttachDocListDto: CreateAttachDocListDto) {
    return this.attachDocListService.create(createAttachDocListDto);
  }

  @Get()
  findAll() {
    return this.attachDocListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachDocListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttachDocListDto: UpdateAttachDocListDto) {
    return this.attachDocListService.update(+id, updateAttachDocListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachDocListService.remove(+id);
  }
}
