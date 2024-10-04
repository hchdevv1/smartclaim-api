import { Controller, Post, Body } from '@nestjs/common';
import { OpdDischargeService } from './opd-discharge.service';

import  { QueryOpdDischargeDto } from   './dto/query-opd-discharge.dto';
@Controller('/V1/opd-discharge')
export class OpdDischargeController {
  constructor(private readonly opdDischargeService: OpdDischargeService) {}

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
  async getEpisodeByHN(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeDiagnosis(queryOpdDischargeDto);
        return result
  }
  @Post('/getOPDDischargeInvestigation')
  async getOPDDischargeInvestigation(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
        const result = this.opdDischargeService.getOPDDischargeInvestigation(queryOpdDischargeDto);
        return result
  }
}
