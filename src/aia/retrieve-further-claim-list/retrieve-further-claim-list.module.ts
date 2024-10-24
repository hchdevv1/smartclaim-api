import { Module } from '@nestjs/common';
import { RetrieveFurtherClaimListService } from './retrieve-further-claim-list.service';
import { RetrieveFurtherClaimListController } from './retrieve-further-claim-list.controller';
import {HttpModule} from '@nestjs/axios'
import { TrakcareService } from '../../trakcare/trakcare.service';

import { UtilsService } from '../../utils/utils.service';

@Module({
  imports: [HttpModule],
  controllers: [RetrieveFurtherClaimListController],
  providers: [RetrieveFurtherClaimListService ,UtilsService,TrakcareService],
})
export class RetrieveFurtherClaimListModule {}
