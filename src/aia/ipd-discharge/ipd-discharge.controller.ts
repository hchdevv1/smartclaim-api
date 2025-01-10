import { Controller , Post, Body } from '@nestjs/common';
import { IpdDischargeService } from './ipd-discharge.service';
import { QueryIpdDischargeDto } from './dto/query-ipd-discharge.dto'
@Controller('/V1/ipd-discharge')
export class IpdDischargeController {
  constructor(private readonly ipdDischargeService: IpdDischargeService) {}

  //@Post('/getOPDDischargeVisit')


  // async getOPDDischargeVisit(@Body() queryIpdDischargeDto:QueryIpdDischargeDto){
  //       const result =''// this.opdDischargeService.getOPDDischargeVisit(queryOpdDischargeDto);
  //       return result
  // }

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
}
