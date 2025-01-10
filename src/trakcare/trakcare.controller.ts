import { Controller, Get,  Param } from '@nestjs/common';
import { TrakcareService } from './trakcare.service';


@Controller('/v1/trakcare')
export class TrakcareController {
  constructor(private readonly trakcareService: TrakcareService) {}

 

@Get('/PatientInfoByPID/:xPID')
  getPatientInfoByPID(@Param('xPID') xPID: string) {
     return this.trakcareService.getPatientInfoByPID(xPID);
  }
  @Get('/PatientInfoByHN/:xHN')
  getPatientInfoByHN(@Param('xHN') xHN: string) {
     return this.trakcareService.getPatientInfoByHN(xHN);
  }
  @Get('/PatientInfoByPassportNumber/:xHN')
  getPatientInfoByPassportNumber(@Param('xHN') xHN: string) {
     return this.trakcareService.getPatientInfoByPassportNumber(xHN);
  }
  @Get('/getEpisodeByHN/:xHN/:xEpiDate/:xEpiType')
  getEpisodeByHN(@Param('xHN') xHN: string,@Param('xEpiDate') xEpiDate: string,@Param('xEpiType') xEpiType: string) {
     return this.trakcareService.getEpisodeByHN(xHN,xEpiDate,xEpiType);
  }
     
  @Get('/getEpisodeInfoByVN/:xVN')
  getEpisodeInfoByVN(@Param('xVN') xVN: string) {
     return this.trakcareService.getEpisodeInfoByVN(xVN);
  }
  @Get('/getOPDDischargeVisit/:xVN')
  getOPDDischargeVisit(@Param('xVN') xVN: string) {
     return this.trakcareService.getOPDDischargeVisit(xVN);
  }

  @Get('/getOPDDischargeDiagnosis/:xVN')
  getOPDDischargeDiagnosis(@Param('xVN') xVN: string) {
     return this.trakcareService.getOPDDischargeDiagnosis(xVN);
  }
  @Get('/getOPDDischargeDoctor/:xVN')
  getOPDDischargeDoctor(@Param('xVN') xVN: string) {
     return this.trakcareService.getOPDDischargeDoctor(xVN);
  }
  
  @Get('/getOPDDischargeProcedure/:xVN')
  getOPDDischargeProcedure(@Param('xVN') xVN: string) {
     return this.trakcareService.getOPDDischargeProcedure(xVN);
  }
  
  @Get('/getOPDDischargeInvestigation/:xVN')
  getOPDDischargeInvestigation(@Param('xVN') xVN: string) {
     return this.trakcareService.getOPDDischargeInvestigation(xVN);
  }

  @Get('/getOPDDischargeVitalSign/:xVN')
  getOPDDischargeVitalSign(@Param('xVN') xVN: string) {
     return this.trakcareService.getOPDDischargeVitalSign(xVN);
  }
  
  @Get('/getOPDDischargeAccident/:xVN')
  getOPDDischargeAccident(@Param('xVN') xVN: string) {
     return this.trakcareService.getOPDDischargeAccident(xVN);
  }
  
  @Get('/getOPDDischargePatient/:xHN')
  getOPDDischargePatient(@Param('xHN') xHN: string) {
     return this.trakcareService.getOPDDischargePatient(xHN);
  }
  @Get('/getOPDDischargeOrderItem/:xVN')
  getOPDDischargeOrderItem(@Param('xVN') xVN: string) {
   return this.trakcareService.getOPDDischargeOrderItem(xVN);
}
@Get('/getOPDDischargeBilling/:xVN')
getOPDDischargeBilling(@Param('xVN') xVN: string) {
 return this.trakcareService.getOPDDischargeBilling(xVN);
}
@Get('/getOPDCheckBalance/:xVN')
getOPDCheckBalance(@Param('xVN') xVN: string) {
 return this.trakcareService.getOPDCheckBalance(xVN);
}
@Get('/checkVisitNumberAvailable/:xHN/:xVN')
checkVisitNumberAvailable(@Param('xHN') xHN: string,@Param('xVN') xVN: string) {
 return this.trakcareService.checkVisitNumberAvailable(xHN,xVN);
}


@Get('/getIPDVisit/:xVN')
getIPDVisit(@Param('xVN') xVN: string) {
   return this.trakcareService.getIPDVisit(xVN);
}
@Get('/getIPDVitalSign/:xVN')
getIPDVitalSign(@Param('xVN') xVN: string) {
     return this.trakcareService.getIPDVitalSign(xVN);
  }

@Get('/getIPDDoctor/:xVN')
getIPDDoctor(@Param('xVN') xVN: string) {
   return this.trakcareService.getIPDDoctor(xVN);
}

@Get('/getIPDDiagnosis/:xVN')
getIPDDiagnosis(@Param('xVN') xVN: string) {
   return this.trakcareService.getIPDDiagnosis(xVN);
}

@Get('/getIPDInvestigation/:xVN')
getIPDInvestigation(@Param('xVN') xVN: string) {
     return this.trakcareService.getIPDInvestigation(xVN);
  }
  @Get('/getIPDOrderItem/:xVN')
  getIPDOrderItem(@Param('xVN') xVN: string) {
   return this.trakcareService.getIPDOrderItem(xVN);
}
@Get('/getIPDBilling/:xVN')
getIPDBilling(@Param('xVN') xVN: string) {
 return this.trakcareService.getIPDBilling(xVN);
}

}