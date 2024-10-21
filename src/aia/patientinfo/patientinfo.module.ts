import { Module } from '@nestjs/common';
import { PatientinfoService } from './patientinfo.service';
import { PatientinfoController } from './patientinfo.controller';
import {HttpModule} from '@nestjs/axios'
import { TrakcareService } from '../../trakcare/trakcare.service';


@Module({
  imports: [HttpModule],
  controllers: [PatientinfoController],
  providers: [PatientinfoService ,TrakcareService],
})
export class PatientinfoModule {}
