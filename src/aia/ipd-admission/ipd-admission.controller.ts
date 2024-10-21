import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IpdAdmissionService } from './ipd-admission.service';
import { CreateIpdAdmissionDto } from './dto/create-ipd-admission.dto';
import { UpdateIpdAdmissionDto } from './dto/update-ipd-admission.dto';

@Controller('ipd-admission')
export class IpdAdmissionController {
  constructor(private readonly ipdAdmissionService: IpdAdmissionService) {}

  @Post()
  create(@Body() createIpdAdmissionDto: CreateIpdAdmissionDto) {
    return this.ipdAdmissionService.create(createIpdAdmissionDto);
  }

  @Get()
  findAll() {
    return this.ipdAdmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipdAdmissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIpdAdmissionDto: UpdateIpdAdmissionDto) {
    return this.ipdAdmissionService.update(+id, updateIpdAdmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ipdAdmissionService.remove(+id);
  }
}
