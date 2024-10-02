import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IpdDischargeService } from './ipd-discharge.service';
import { CreateIpdDischargeDto } from './dto/create-ipd-discharge.dto';
import { UpdateIpdDischargeDto } from './dto/update-ipd-discharge.dto';

@Controller('ipd-discharge')
export class IpdDischargeController {
  constructor(private readonly ipdDischargeService: IpdDischargeService) {}

  @Post()
  create(@Body() createIpdDischargeDto: CreateIpdDischargeDto) {
    return this.ipdDischargeService.create(createIpdDischargeDto);
  }

  @Get()
  findAll() {
    return this.ipdDischargeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipdDischargeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIpdDischargeDto: UpdateIpdDischargeDto) {
    return this.ipdDischargeService.update(+id, updateIpdDischargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ipdDischargeService.remove(+id);
  }
}
