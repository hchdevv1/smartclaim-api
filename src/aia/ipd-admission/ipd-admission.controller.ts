import { Controller } from '@nestjs/common';
import { IpdAdmissionService } from './ipd-admission.service';



@Controller('/V1/ipd-admission')
export class IpdAdmissionController {
  constructor(private readonly ipdAdmissionService: IpdAdmissionService) {}

  // @Post('/getIPDAdmissionDoctor')
  // async getOPDDischargeDoctor(@Body() queryOpdDischargeDto:QueryOpdDischargeDto){
  //      // const result = this.opdDischargeService.getOPDDischargeDoctor(queryOpdDischargeDto);
  //      let result ;
  //       return result
 // }
}
