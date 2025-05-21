import { Module } from '@nestjs/common';
import { CheckOpdBalanceService } from './check-opd-balance.service';
import { CheckOpdBalanceController } from './check-opd-balance.controller';
import {HttpModule} from '@nestjs/axios'
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';



@Module({
  imports: [HttpModule],
  controllers: [CheckOpdBalanceController],
  providers: [CheckOpdBalanceService ,TrakcareService,UtilsService],
})
export class CheckOpdBalanceModule {}
