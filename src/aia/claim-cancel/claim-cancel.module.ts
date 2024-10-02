import { Module } from '@nestjs/common';
import { ClaimCancelService } from './claim-cancel.service';
import { ClaimCancelController } from './claim-cancel.controller';

@Module({
  controllers: [ClaimCancelController],
  providers: [ClaimCancelService],
})
export class ClaimCancelModule {}
