import { Module } from '@nestjs/common';
import { RetrieveFurtherClaimListService } from './retrieve-further-claim-list.service';
import { RetrieveFurtherClaimListController } from './retrieve-further-claim-list.controller';
import {HttpModule} from '@nestjs/axios'
import { UtilsService } from '../../utils/utils.service';

@Module({
  imports: [HttpModule],
  controllers: [RetrieveFurtherClaimListController],
  providers: [RetrieveFurtherClaimListService ,UtilsService],
})
export class RetrieveFurtherClaimListModule {}
