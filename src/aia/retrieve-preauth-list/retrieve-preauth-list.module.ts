import { Module } from '@nestjs/common';
import { RetrievePreauthListService } from './retrieve-preauth-list.service';
import { RetrievePreauthListController } from './retrieve-preauth-list.controller';

@Module({
  controllers: [RetrievePreauthListController],
  providers: [RetrievePreauthListService],
})
export class RetrievePreauthListModule {}
