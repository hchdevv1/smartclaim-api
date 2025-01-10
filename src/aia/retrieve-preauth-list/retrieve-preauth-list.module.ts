import { Module } from '@nestjs/common';
import { RetrievePreauthListService } from './retrieve-preauth-list.service';
import { RetrievePreauthListController } from './retrieve-preauth-list.controller';
import {HttpModule} from '@nestjs/axios'
import { UtilsService } from '../../utils/utils.service';


@Module({
  imports: [HttpModule],
  controllers: [RetrievePreauthListController],
  providers: [RetrievePreauthListService , UtilsService],
})
export class RetrievePreauthListModule {}
