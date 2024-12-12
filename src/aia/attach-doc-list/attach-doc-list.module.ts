import { Module } from '@nestjs/common';
import { AttachDocListService } from './attach-doc-list.service';
import { AttachDocListController } from './attach-doc-list.controller';
import {HttpModule} from '@nestjs/axios'
import { UtilsService } from '../../utils/utils.service';

@Module({
  imports: [HttpModule],
  controllers: [AttachDocListController],
  providers: [AttachDocListService ,UtilsService],
})
export class AttachDocListModule {}
