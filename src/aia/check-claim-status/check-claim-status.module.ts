import { Module } from '@nestjs/common';
import { CheckClaimStatusService } from './check-claim-status.service';
import { CheckClaimStatusController } from './check-claim-status.controller';

@Module({
  controllers: [CheckClaimStatusController],
  providers: [CheckClaimStatusService],
})
export class CheckClaimStatusModule {}
