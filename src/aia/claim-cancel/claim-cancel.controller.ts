import { Controller, Get } from '@nestjs/common';
import { ClaimCancelService } from './claim-cancel.service';

@Controller('/v1/claim-cancel')
export class ClaimCancelController {
  constructor(private readonly claimCancelService: ClaimCancelService) {}


  @Get()
  findAll() {
    return 'this.claimCancelService.findAll()';
  }

}
