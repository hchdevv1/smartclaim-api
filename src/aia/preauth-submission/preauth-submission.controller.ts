import { Controller ,Get ,Param ,Post ,Body} from '@nestjs/common';
import { PreauthSubmissionService } from './preauth-submission.service';
import { QueryDiagnosisDto} from './dto/query-diagnoisis-preauth-submission.dto';
import { QueryPreAuthNoteDto } from './dto/query-preauthnote-preauth-submission.dto';
import { QueryPreBillingDto ,DeletePreBillingDto} from './dto/query-prebilling-preauth-submission.dto';
import { QuerySubmitPreAuthDto} from './dto/query-submit-preauth-submission.dto';
import { QueryAccidentDto } from './dto/query-accident-preauth-submission.dto';
import { QueryProcedureDto } from './dto/query-procedure-preauth-submission.dto';
import { QueryPreauthSubmissionDto } from './dto/query-preauth-submission.dto';
import { QueryUpdateReferenceVNBodyDto } from './dto/query-updatereferencevn-preauth-submission.dto';
import { QueryPackageBundleDto } from './dto/query-packagebundle-preauth-submission.dto';
import { QueryUpdateIsAdmissionBodyDto } from './dto/query-updateisadmission-preauth-submission.dto';
@Controller('/v1/preauth-submission')
export class PreauthSubmissionController {
  constructor(private readonly preauthSubmissionService: PreauthSubmissionService) {}

  /// get from trakcare ///
 
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
  //#region billing
  @Get('/getListBilling/:xHN')
  getListBilling(@Param('xHN') xHN: string ) {
    return  this.preauthSubmissionService.getListBilling(xHN);
  }
  @Post('/setPreBilling')
  async setPreBilling(@Body() queryPreBillingDto:QueryPreBillingDto){
        const result = this.preauthSubmissionService.setPreBilling(queryPreBillingDto);
        return result
  }
  @Post('/getPreBilling')
  async getPreBilling(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result =this.preauthSubmissionService.getPreBilling(queryPreauthSubmissionDto);
        return result
  }
  
  @Post('/SubmitPreBilling')
  async SubmitPreBilling(@Body() queryPreBillingDto:QueryPreBillingDto){
        const result = this.preauthSubmissionService.SubmitPreBilling(queryPreBillingDto);
        return result
  }
  @Post('/previewPreBilling')
  async previewPreBilling(@Body() QueryPreBillingDto:QueryPreBillingDto){
        const result = this.preauthSubmissionService.previewPreBilling(QueryPreBillingDto);
        return result
  }
  @Post('/InsertPreBilling')
  async InsertPreBilling(@Body() queryPreBillingDto:QueryPreBillingDto){
        const result = this.preauthSubmissionService.InsertPreBilling(queryPreBillingDto);
        return result
  }
  
  @Post('/deletePreBillingById')
  async deletePreBillingById(@Body() deletePreBillingDto:DeletePreBillingDto){
        const result = this.preauthSubmissionService.deletePreBillingById(deletePreBillingDto);
        return result
  }
  @Post('/deletePreBillingByRefId')
  async deletePreBillingByRefId(@Body() deletePreBillingDto:DeletePreBillingDto){
        const result = this.preauthSubmissionService.deletePreBillingByRefId(deletePreBillingDto);
        return result
  }
  //#endregion

  @Post('/getPreAuthAccident')
  async getPreAuthAccident(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
        const result = this.preauthSubmissionService.getPreAuthAccident(queryPreauthSubmissionDto);
        return result
  }
/// get from data base ///
@Post('/getPreAuthNote')
async getPreAuthNote(@Body() querySubmitPreAuthDto:QuerySubmitPreAuthDto){
      const result = this.preauthSubmissionService.getPreAuthNote(querySubmitPreAuthDto);
      return result
}

@Post('/getPackageBundle')
async getPackageBundle(@Body() queryPackageBundleDto:QueryPackageBundleDto){
      const result = this.preauthSubmissionService.getPackageBundle(queryPackageBundleDto);
      return result
}
 //#region  Submit to database
 @Post('/SubmitPreAuthVisit')
 async SubmitPreAuthVisit(@Body() querySubmitPreAuthDto:QuerySubmitPreAuthDto){
       const result = this.preauthSubmissionService.SubmitPreAuthVisit(querySubmitPreAuthDto);
       return result
 }

 //#endregion

  @Post('/SubmitDiagnosis')
  async SubmitDiagnosis(@Body() queryDiagnosisDto:QueryDiagnosisDto){
        const result = this.preauthSubmissionService.SubmitDiagnosis(queryDiagnosisDto);
        return result
  }
  
  @Post('/ReloadDiagnosis')
  async ReloadDiagnosis(@Body() queryDiagnosisDto:QueryDiagnosisDto){
        const result = this.preauthSubmissionService.ReloadDiagnosis(queryDiagnosisDto);
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
  @Post('/SubmitPreAuthNote')
  async SubmitPreAuthNote(@Body() queryPreAuthNoteDto:QueryPreAuthNoteDto){
        const result = this.preauthSubmissionService.SubmitPreAuthNote(queryPreAuthNoteDto);
        return result
  }
 
  @Post('/UpdateReferenceVN')
  async UpdateReferenceVN(@Body() queryUpdateReferenceVNBodyDto:QueryUpdateReferenceVNBodyDto){
        const result = this.preauthSubmissionService.UpdateReferenceVN(queryUpdateReferenceVNBodyDto);
        return result
  }
  
  @Post('/UpdateIsAdmission')
  async UpdateIsAdmission(@Body() queryUpdateIsAdmissionBodyDto:QueryUpdateIsAdmissionBodyDto){
        const result = this.preauthSubmissionService.UpdateIsAdmission(queryUpdateIsAdmissionBodyDto);
        return result
  }

  @Post('/SubmitPreSubmissionToAIA')
async SubmitPreSubmissionToAIA(@Body() querySubmitPreAuthDto:QuerySubmitPreAuthDto){
      const result = this.preauthSubmissionService.SubmitPreSubmissionToAIA(querySubmitPreAuthDto);
      return result
}
    @Post('/checkeligiblePreAdmission')
    async checkeligiblePreAdmission(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
          const result = this.preauthSubmissionService.checkeligiblePreAdmission(queryPreauthSubmissionDto);
          return result
    }
    @Post('/ReviewPreAuth')
    async ReviewPreAuth(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
          const result = this.preauthSubmissionService.ReviewPreAuth(queryPreauthSubmissionDto);
          return result
    }
     @Post('/getPreAuthVitalSign')
      async getPreAuthVitalSign(@Body() queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
            const result = this.preauthSubmissionService.getPreAuthVitalSign(queryPreauthSubmissionDto);
            return result
      }
//#region  Feed data And Submit to AIA

@Get('/getICDDx/:xICDDxCode')
getICDDx(@Param('xICDDxCode') xICDDxCode: string ) {
    return  this.preauthSubmissionService.getICDDx(xICDDxCode);
  }
  @Get('/getICD9/:xICD9Code')
getICD9(@Param('xICD9Code') xICD9Code: string ) {
    return  this.preauthSubmissionService.getICD9(xICD9Code);
  }
  @Get('/getBillingSubgroup/:xBillingCode')
  getBillingSubgroup(@Param('xBillingCode') xBillingCode: string ) {
    return  this.preauthSubmissionService.getBillingSubgroup(xBillingCode);
  }
//#endregion

}
