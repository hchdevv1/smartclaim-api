import { Module } from '@nestjs/common';
import { RetrieveFurtherClaimListService } from './retrieve-further-claim-list.service';
import { RetrieveFurtherClaimListController } from './retrieve-further-claim-list.controller';

@Module({
  controllers: [RetrieveFurtherClaimListController],
  providers: [RetrieveFurtherClaimListService],
})
export class RetrieveFurtherClaimListModule {}
