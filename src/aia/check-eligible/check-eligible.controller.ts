import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckEligibleService } from './check-eligible.service';
import { CreateCheckEligibleDto } from './dto/create-check-eligible.dto';
import { UpdateCheckEligibleDto } from './dto/update-check-eligible.dto';

@Controller('check-eligible')
export class CheckEligibleController {
  constructor(private readonly checkEligibleService: CheckEligibleService) {}

  @Post()
  create(@Body() createCheckEligibleDto: CreateCheckEligibleDto) {
    return this.checkEligibleService.create(createCheckEligibleDto);
  }

  @Get()
  findAll() {
    return this.checkEligibleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkEligibleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckEligibleDto: UpdateCheckEligibleDto) {
    return this.checkEligibleService.update(+id, updateCheckEligibleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkEligibleService.remove(+id);
  }
}
