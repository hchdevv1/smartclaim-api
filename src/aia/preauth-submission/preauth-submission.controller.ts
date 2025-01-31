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
  async getIPDVisit(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result = queryPreauthSubmissionDto ;//'this.preauthSubmissionService.getPreAuthVisit(queryPreauthSubmissionDto)';
        return result
  }
  /// get from data base ///
//Visit
//diagnosis

//procedure

//accident

//billing

//preauth note

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
