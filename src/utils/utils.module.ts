import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { HttpStatusMessageService } from './http-status-message/http-status-message.service';
import {HttpModule} from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [UtilsController],
  providers: [UtilsService, HttpStatusMessageService],
})
export class UtilsModule {}
