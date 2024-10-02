import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckClaimStatusService } from './check-claim-status.service';
import { CreateCheckClaimStatusDto } from './dto/create-check-claim-status.dto';
import { UpdateCheckClaimStatusDto } from './dto/update-check-claim-status.dto';

@Controller('check-claim-status')
export class CheckClaimStatusController {
  constructor(private readonly checkClaimStatusService: CheckClaimStatusService) {}

  @Post()
  create(@Body() createCheckClaimStatusDto: CreateCheckClaimStatusDto) {
    return this.checkClaimStatusService.create(createCheckClaimStatusDto);
  }

  @Get()
  findAll() {
    return this.checkClaimStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkClaimStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckClaimStatusDto: UpdateCheckClaimStatusDto) {
    return this.checkClaimStatusService.update(+id, updateCheckClaimStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkClaimStatusService.remove(+id);
  }
}
