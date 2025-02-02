import { Controller , Post, Body } from '@nestjs/common';
import { IpdDischargeService } from './ipd-discharge.service';
import { QueryIpdDischargeDto } from './dto/query-ipd-discharge.dto'
import { QueryIPDVisitDto } from './dto/query-visit-ipd-discharge.dto'
import { QueryProcedureDto } from './dto/query-procedure-ipd-discharge.dto'
import { QueryAccidentDto } from './dto/query-accident-ipd-discharge.dto'
import { QuerySubmitIpdDischargeDto } from './dto/query-submit-ipd-discharge.dto';
import { QueryConcurNoteDto } from './dto/query-concurrentnote-ipd-discharge.dto';
@Controller('/V1/ipd-discharge')
export class IpdDischargeController {
  constructor(private readonly ipdDischargeService: IpdDischargeService) {}

  @Post('/getIPDVisit')
  async getIPDVisit(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result =this.ipdDischargeService.getIPDVisit(queryIpdDischargeDto);
        return result
  }

  @Post('/getIPDVitalSign')
  async getIPDVitalSign(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result = this.ipdDischargeService.getIPDVitalSign(queryIpdDischargeDto);
        return result
  }

  @Post('/getIPDDischargeDoctor')
  async getIPDDischargeDoctor(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result = this.ipdDischargeService.getIPDDischargeDoctor(queryIpdDischargeDto);
        return result
  }
  @Post('/getIPDDischargeDiagnosis')
  async getIPDDischargeDiagnosis(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result = this.ipdDischargeService.getIPDDischargeDiagnosis(queryIpdDischargeDto);
        return result
  }
  @Post('/getIPDDischargeInvestigation')
  async getIPDDischargeInvestigation(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result = this.ipdDischargeService.getIPDDischargeInvestigation(queryIpdDischargeDto);
        return result
  }
  @Post('/getIPDDischargeOrderItem')
  async getIPDDischargeOrderItem(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result = this.ipdDischargeService.getIPDDischargeOrderItem(queryIpdDischargeDto);
        return result
  }
  @Post('/getIPDDischargeBilling')
  async getIPDDischargeBilling(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result = this.ipdDischargeService.getIPDDischargeBilling(queryIpdDischargeDto);
        return result
  }
  @Post('/getIPDDischargeProcedure')
  async getIPDDischargeProcedure(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result = this.ipdDischargeService.getIPDDischargeProcedure(queryIpdDischargeDto);
        return result
  }
  @Post('/getIPDDischargeAccident')
  async getIPDDischargeAccident(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result = this.ipdDischargeService.getIPDDischargeAccident(queryIpdDischargeDto);
        return result
  }
  @Post('/getIPDDischargeConcurNote')
  async getIPDDischargeConcurNote(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
        const result = this.ipdDischargeService.getIPDDischargeConcurNote(queryIpdDischargeDto);
        return result
  }
/// submit to data base

@Post('/SubmitIPDVisit')
  async SubmitIPDVisit(@Body() queryIPDVisitDto:QueryIPDVisitDto){
        //const result = queryIPDVisitDto
        const result = this.ipdDischargeService.SubmitIPDVisit(queryIPDVisitDto);
        return result
  }
  @Post('/SubmitProcedure')
  async SubmitProcedure(@Body() queryProcedureDto:QueryProcedureDto){
        const result = this.ipdDischargeService.SubmitProcedure(queryProcedureDto);
        return result
  }
  @Post('/SubmitAccident')
  async SubmitAccident(@Body() queryAccidentDto:QueryAccidentDto){
        const result = this.ipdDischargeService.SubmitAccident(queryAccidentDto);
        return result
  }

  @Post('/SubmitConcurNote')
  async SubmitConcurNote(@Body() queryConcurNoteDto:QueryConcurNoteDto){
        const result = this.ipdDischargeService.SubmitConcurNote(queryConcurNoteDto);
        return result
  }
  @Post('/SubmitIPDDischargeToAIA')
  async SubmitOPDDischargeToAIA(@Body() querySubmitIpdDischargeDto:QuerySubmitIpdDischargeDto){
    const result = this.ipdDischargeService.SubmitIPDDischargeToAIA(querySubmitIpdDischargeDto);
        return result
  }
}
