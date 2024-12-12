import { Module } from '@nestjs/common';
import { IpdAdmissionService } from './ipd-admission.service';
import { IpdAdmissionController } from './ipd-admission.controller';

@Module({
  controllers: [IpdAdmissionController],
  providers: [IpdAdmissionService],
})
export class IpdAdmissionModule {}
