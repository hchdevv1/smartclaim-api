import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillingSubmissionService } from './billing-submission.service';
import { CreateBillingSubmissionDto } from './dto/create-billing-submission.dto';
import { UpdateBillingSubmissionDto } from './dto/update-billing-submission.dto';

@Controller('billing-submission')
export class BillingSubmissionController {
  constructor(private readonly billingSubmissionService: BillingSubmissionService) {}

  @Post()
  create(@Body() createBillingSubmissionDto: CreateBillingSubmissionDto) {
    return this.billingSubmissionService.create(createBillingSubmissionDto);
  }

  @Get()
  findAll() {
    return this.billingSubmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingSubmissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingSubmissionDto: UpdateBillingSubmissionDto) {
    return this.billingSubmissionService.update(+id, updateBillingSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingSubmissionService.remove(+id);
  }
}
