import { Module } from '@nestjs/common';
import { ClaimCancelService } from './claim-cancel.service';
import { ClaimCancelController } from './claim-cancel.controller';
import {HttpModule} from '@nestjs/axios'
import { UtilsService } from '../../utils/utils.service';

@Module({
  imports: [HttpModule],
  controllers: [ClaimCancelController],
  providers: [ClaimCancelService ,UtilsService],
})
export class ClaimCancelModule {}
