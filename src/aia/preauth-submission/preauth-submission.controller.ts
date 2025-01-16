import { Controller ,Post ,Body} from '@nestjs/common';
import { PreauthSubmissionService } from './preauth-submission.service';
import { QueryDiagnosisDto} from './dto/query-diagnoisis-preauth-submission.dto';
import { QueryPreAuthNoteDto } from './dto/query-preauthnote-preauth-submission.dto';
import { QueryPreBillingDto } from './dto/query-prebilling-preauth-submission.dto'
import { QuerySubmitPreAuthDto} from './dto/query-submit-preauth-submission.dto'
@Controller('/v1/preauth-submission')
export class PreauthSubmissionController {
  constructor(private readonly preauthSubmissionService: PreauthSubmissionService) {}

 
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
}
