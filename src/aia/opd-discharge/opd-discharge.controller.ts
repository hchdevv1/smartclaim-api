import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpdDischargeService } from './opd-discharge.service';
import { CreateOpdDischargeDto } from './dto/create-opd-discharge.dto';
import { UpdateOpdDischargeDto } from './dto/update-opd-discharge.dto';

@Controller('opd-discharge')
export class OpdDischargeController {
  constructor(private readonly opdDischargeService: OpdDischargeService) {}

  @Post()
  create(@Body() createOpdDischargeDto: CreateOpdDischargeDto) {
    return this.opdDischargeService.create(createOpdDischargeDto);
  }

  @Get()
  findAll() {
    return this.opdDischargeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opdDischargeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpdDischargeDto: UpdateOpdDischargeDto) {
    return this.opdDischargeService.update(+id, updateOpdDischargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opdDischargeService.remove(+id);
  }
}
