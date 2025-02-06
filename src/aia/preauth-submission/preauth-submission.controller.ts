import { Controller ,Get ,Param ,Post ,Body} from '@nestjs/common';
import { PreauthSubmissionService } from './preauth-submission.service';
import { QueryDiagnosisDto} from './dto/query-diagnoisis-preauth-submission.dto';
import { QueryPreAuthNoteDto } from './dto/query-preauthnote-preauth-submission.dto';
import { QueryPreBillingDto } from './dto/query-prebilling-preauth-submission.dto';
import { QuerySubmitPreAuthDto} from './dto/query-submit-preauth-submission.dto';
import { QueryAccidentDto } from './dto/query-accident-preauth-submission.dto';
import { QueryProcedureDto } from './dto/query-procedure-preauth-submission.dto';
import { QueryPreauthSubmissionDto } from './dto/query-preauth-submission.dto';
import { QueryUpdateReferenceVNBodyDto } from './dto/query-updatereferencevn-preauth-submission.dto';
@Controller('/v1/preauth-submission')
export class PreauthSubmissionController {
  constructor(private readonly preauthSubmissionService: PreauthSubmissionService) {}

  /// get from trakcare ///
  @Get('/getListBilling/:xHN')
  getListBilling(@Param('xHN') xHN: string ) {
    return  this.preauthSubmissionService.getListBilling(xHN);
  }
  @Post('/getListVisitClaimAIA')
  async getListVisitClaimAIA(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result = this.preauthSubmissionService.getListVisitClaimAIA(queryPreauthSubmissionDto);
        return result
  }
  @Post('/getPreAuthVisit')
  async getPreAuthVisit(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result = this.preauthSubmissionService.getPreAuthVisit(queryPreauthSubmissionDto);
        return result
  }
  @Post('/getPreAuthDoctor')
  async getPreAuthDoctor(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result = this.preauthSubmissionService.getPreAuthDoctor(queryPreauthSubmissionDto);
        return result
  }
  @Post('/getPreAuthDiagnosis')
  async getPreAuthDiagnosis(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result = this.preauthSubmissionService.getPreAuthDiagnosis(queryPreauthSubmissionDto);
        return result
  }
  @Post('/getPreAuthProcedure')
  async getPreAuthProcedure(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result = this.preauthSubmissionService.getPreAuthProcedure(queryPreauthSubmissionDto);
        return result
  }
  @Post('/getPreBilling')
  async getPreBilling(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result = this.preauthSubmissionService.getPreBilling(queryPreauthSubmissionDto);
        return result
  }
  @Post('/getPreAuthAccident')
  async getPreAuthAccident(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result = this.preauthSubmissionService.getPreAuthAccident(queryPreauthSubmissionDto);
        return result
  }
  /// get from data base ///


//procedure

//accident

//billing


@Post('/getPreAuthNote')
async getPreAuthNote(@Body() querySubmitPreAuthDto:QuerySubmitPreAuthDto){
      const result = this.preauthSubmissionService.getPreAuthNote(querySubmitPreAuthDto);
      return result
}
  /// submit to data base ///
 
  @Post('/SubmitPreAuthVisit')
  async SubmitPreAuthVisit(@Body() querySubmitPreAuthDto:QuerySubmitPreAuthDto){
        //const result = queryIPDVisitDto
        const result = this.preauthSubmissionService.SubmitPreAuthVisit(querySubmitPreAuthDto);
        return result
  }
  @Post('/SubmitDiagnosis')
  async SubmitDiagnosis(@Body() queryDiagnosisDto:QueryDiagnosisDto){
        const result = this.preauthSubmissionService.SubmitDiagnosis(queryDiagnosisDto);
        return result
  }

  @Post('/SubmitProcedure')
  async SubmitProcedure(@Body() queryProcedureDto:QueryProcedureDto){
        const result = this.preauthSubmissionService.SubmitProcedure(queryProcedureDto);
        return result
  }
  @Post('/SubmitAccident')
  async SubmitAccident(@Body() queryAccidentDto:QueryAccidentDto){
        const result = this.preauthSubmissionService.SubmitAccident(queryAccidentDto);
        return result
  }



  @Post('/SubmitPreBilling')
  async SubmitPreBilling(@Body() queryPreBillingDto:QueryPreBillingDto){
        const result = this.preauthSubmissionService.SubmitPreBilling(queryPreBillingDto);
        return result
  }
  
  @Post('/SubmitPreAuthNote')
  async SubmitPreAuthNote(@Body() queryPreAuthNoteDto:QueryPreAuthNoteDto){
        const result = this.preauthSubmissionService.SubmitPreAuthNote(queryPreAuthNoteDto);
        return result
  }


  @Post('/SubmitPreSubmissionToAIA')
  async SubmitPreSubmissionToAIA(@Body() querySubmitPreAuthDto:QuerySubmitPreAuthDto){
     

    const result = this.preauthSubmissionService.SubmitPreSubmissionToAIA(querySubmitPreAuthDto);
        return result
  }

  @Post('/UpdateReferenceVN')
  async UpdateReferenceVN(@Body() queryUpdateReferenceVNBodyDto:QueryUpdateReferenceVNBodyDto){
        const result = this.preauthSubmissionService.UpdateReferenceVN(queryUpdateReferenceVNBodyDto);
        return result
  }
}
