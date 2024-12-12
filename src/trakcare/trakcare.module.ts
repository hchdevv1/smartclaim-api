import { Module } from '@nestjs/common';
import { TrakcareService } from './trakcare.service';
import { TrakcareController } from './trakcare.controller';
import {HttpModule} from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [TrakcareController],
  providers: [TrakcareService],
})
export class TrakcareModule {}
