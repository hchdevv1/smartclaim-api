import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { TrakcareModule } from './trakcare/trakcare.module';


import { AttachDocListModule } from './aia/attach-doc-list/attach-doc-list.module';

import { BillingSubmissionModule } from './aia/billing-submission/billing-submission.module';
import { CheckClaimStatusModule } from './aia/check-claim-status/check-claim-status.module';
import { CheckEligibleModule } from './aia/check-eligible/check-eligible.module';
import { ClaimCancelModule } from './aia/claim-cancel/claim-cancel.module';
import { IpdAdmissionModule } from './aia/ipd-admission/ipd-admission.module';
import { IpdDischargeModule } from './aia/ipd-discharge/ipd-discharge.module';
import { OpdDischargeModule } from './aia/opd-discharge/opd-discharge.module';
import { PreauthSubmissionModule } from './aia/preauth-submission/preauth-submission.module';
import { RetrieveFurtherClaimListModule } from './aia/retrieve-further-claim-list/retrieve-further-claim-list.module';
import { RetrievePreauthListModule } from './aia/retrieve-preauth-list/retrieve-preauth-list.module';
import { PatientinfoModule} from './aia/patientinfo/patientinfo.module';
@Module({
  imports: [UtilsModule, TrakcareModule 
    ,AttachDocListModule,BillingSubmissionModule, CheckClaimStatusModule, CheckEligibleModule ,ClaimCancelModule
    ,IpdAdmissionModule,IpdDischargeModule,OpdDischargeModule
    ,PreauthSubmissionModule,RetrieveFurtherClaimListModule,RetrievePreauthListModule,PatientinfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
