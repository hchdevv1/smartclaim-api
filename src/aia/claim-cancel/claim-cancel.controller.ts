import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaimCancelService } from './claim-cancel.service';
import { CreateClaimCancelDto } from './dto/create-claim-cancel.dto';
import { UpdateClaimCancelDto } from './dto/update-claim-cancel.dto';

@Controller('claim-cancel')
export class ClaimCancelController {
  constructor(private readonly claimCancelService: ClaimCancelService) {}

  @Post()
  create(@Body() createClaimCancelDto: CreateClaimCancelDto) {
    return this.claimCancelService.create(createClaimCancelDto);
  }

  @Get()
  findAll() {
    return this.claimCancelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claimCancelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaimCancelDto: UpdateClaimCancelDto) {
    return this.claimCancelService.update(+id, updateClaimCancelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimCancelService.remove(+id);
  }
}
