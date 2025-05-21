import { Module } from '@nestjs/common';
import { CheckClaimStatusService } from './check-claim-status.service';
import { CheckClaimStatusController } from './check-claim-status.controller';
import {HttpModule} from '@nestjs/axios'
import { UtilsService } from '../../utils/utils.service';
@Module({
  imports: [HttpModule],
  controllers: [CheckClaimStatusController],
  providers: [CheckClaimStatusService,UtilsService],
})
export class CheckClaimStatusModule {}
