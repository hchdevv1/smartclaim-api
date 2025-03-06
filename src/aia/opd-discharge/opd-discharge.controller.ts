import { Controller, Post, Body } from '@nestjs/common';
import { OpdDischargeService } from './opd-discharge.service';

import { QueryOpdDischargeDto } from   './dto/query-opd-discharge.dto';
import { QuerySubmitOpdDischargeDto } from './dto/query-submit-opd-discharge.dto'
import { QueryProcedureDto } from './dto/query-procedure-opd-discharge.dto';
import { QueryAccidentDto } from './dto/query-accident-opd-discharge.dto';
 import { QueryVisitDto } from './dto/query-visit-opd-discharge.dto';
 import { QueryReviewOpdDischargeDto } from './dto/review-opd-discharge.dto';
 import { QueryUpdateFurtherClaimVNBodyDto} from './dto/query-updatefurtherclaimvn-opd-discharge.dto'
@Controller('/V1/opd-discharge')
export class OpdDischargeController {
  constructor(private readonly opdDischargeService: OpdDischargeService) {}

  @Post('/getOPDDischargeVisit')
  async getOPDDischargeVisit(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
      console.log('ppp')
        const result = this.opdDischargeService.getOPDDischargeVisit(queryOpdDischargeDto);
        return result
  }
  
  @Post('/getOPDDischargeVitalSign')
  async getOPDDischargeVitalSign(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeVitalSign(queryOpdDischargeDto);
        return result
  }
  @Post('/getOPDDischargeDoctor')
  async getOPDDischargeDoctor(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeDoctor(queryOpdDischargeDto);
        return result
  }
  @Post('/getOPDDischargeDiagnosis')
  async getOPDDischargeDiagnosis(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeDiagnosis(queryOpdDischargeDto);
        return result
  }
  @Post('/getOPDDischargeInvestigation')
  async getOPDDischargeInvestigation(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeInvestigation(queryOpdDischargeDto);
        return result
  }
  @Post('/getOPDDischargeOrderItem')
  async getOPDDischargeOrderItem(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeOrderItem(queryOpdDischargeDto);
        return result
  }
  @Post('/getOPDDischargeBilling')
  async getOPDDischargeBilling(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeBilling(queryOpdDischargeDto);
        return result
  }
  @Post('/getOPDDischargeProcedure')
  async getOPDDischargeProcedure(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeProcedure(queryOpdDischargeDto);
        return result
  }
  @Post('/getOPDDischargeAccident')
  async getOPDDischargeAccident(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeAccident(queryOpdDischargeDto);
        return result
  }
  @Post('/getListVisitClaimAIA')
  async getListVisitClaimAIA(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getListVisitClaimAIA(queryOpdDischargeDto);
        return result
  }
  @Post('/SubmitVisit')
  async SubmitVisit(@Body() queryVisitDto:QueryVisitDto){
        const result = this.opdDischargeService.SubmitVisit(queryVisitDto);
        return result
  }
  
  @Post('/SubmitProcedure')
  async SubmitProcedure(@Body() queryProcedureDto:QueryProcedureDto){
        const result = this.opdDischargeService.SubmitProcedure(queryProcedureDto);
        return result
  }
@Post('/SubmitAccident')
async SubmitAccident(@Body() queryAccidentDto:QueryAccidentDto){
      const result = this.opdDischargeService.SubmitAccident(queryAccidentDto);
      return result
}
  @Post('/SubmitOPDDischargeToAIA')
  async SubmitOPDDischargeToAIA(@Body() querySubmitOpdDischargeDto:QuerySubmitOpdDischargeDto){
        const result = this.opdDischargeService.SubmitOPDDischargeToAIA(querySubmitOpdDischargeDto);
        return result
  }

  @Post('/ReviewOPDDischarge')
  async ReviewOPDDischarge(@Body() queryReviewOpdDischargeDto:QueryReviewOpdDischargeDto){
        const result = this.opdDischargeService.ReviewOPDDischarge(queryReviewOpdDischargeDto);
        return result
  }

  @Post('/UpdateFurtherClaimVN')
  async UpdateFurtherClaimVN(@Body() queryUpdateFurtherClaimVNBodyDto:QueryUpdateFurtherClaimVNBodyDto){
        const result =  this.opdDischargeService.UpdateFurtherClaimVN(queryUpdateFurtherClaimVNBodyDto);
        return result
  }

}
