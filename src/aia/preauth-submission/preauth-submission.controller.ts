import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreauthSubmissionService } from './preauth-submission.service';
import { CreatePreauthSubmissionDto } from './dto/create-preauth-submission.dto';
import { UpdatePreauthSubmissionDto } from './dto/update-preauth-submission.dto';

@Controller('preauth-submission')
export class PreauthSubmissionController {
  constructor(private readonly preauthSubmissionService: PreauthSubmissionService) {}

  @Post()
  create(@Body() createPreauthSubmissionDto: CreatePreauthSubmissionDto) {
    return this.preauthSubmissionService.create(createPreauthSubmissionDto);
  }

  @Get()
  findAll() {
    return this.preauthSubmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preauthSubmissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreauthSubmissionDto: UpdatePreauthSubmissionDto) {
    return this.preauthSubmissionService.update(+id, updatePreauthSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preauthSubmissionService.remove(+id);
  }
}
