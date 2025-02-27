import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { prismaProgest } from '../../database/database';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { UtilsService } from '../../utils/utils.service';
import { CheckEligibleService} from '../../aia/check-eligible/check-eligible.service';


import { QueryDiagnosisDto ,ResultSubmitDiagnosisDto} from './dto/query-diagnoisis-preauth-submission.dto';
import { QueryPreAuthNoteDto ,ResultSubmitPreAuthNoteDto} from './dto/query-preauthnote-preauth-submission.dto';
import { QueryPreBillingDto ,ResultSubmitPreBillingDto ,DeletePreBillingDto} from './dto/query-prebilling-preauth-submission.dto';
import { QuerySubmitPreAuthDto} from './dto/query-submit-preauth-submission.dto';
import { QueryPreauthSubmissionDto } from './dto/query-preauth-submission.dto';
import { QueryClaimFormListInfo , ResultClaimFormListDto} from './dto/result-listclaim-preauth-submission.dto';
import { ResultSubmitIPDVisitDto} from './dto/query-visit-preauth-submissiondto';
import { QueryUpdateReferenceVNBodyDto ,ResultSubmitUpdateReferenceVNDto} from './dto/query-updatereferencevn-preauth-submission.dto';
import { ResultPatientInfoDto ,ResultVisitInfoDto,ResultVitalSignInfoDto 
  ,ResultDiagnosisInfoDto ,ResultProcedureInfoDto ,ResultInvestigationInfoDto ,ResultOrderItemInfoDto ,ResultDoctorInfoDto
  ,ResultBillingInfoDto ,ResultAttachDocListInfoDto
  ,ResultDataJsonDto ,InsuranceResult ,InsuranceData ,ResultPreAuthNoteDto
  ,ResultSubmitPreAuthSubmissionDto 

} from './dto/result-submit-preauth-submission.dto';
import { QueryAccidentDatabaseBodyDto  ,
  CauseOfInjuryDetail,InjuryDetail
}  from '../../utils/dto/result-accident-databse.dto';
import { AccidentDetailDto , } from './dto/review-preauth-submission.dto';
import { QueryVisit ,ResultPreAuthVisitDto} from './dto/result-visit-preauth-submission.dto';
import { QueryAccidentDto  ,ResultSubmitAccidentDto} from './dto/query-accident-preauth-submission.dto';
import { QueryProcedureDto ,ResultSubmitProcedureDto } from './dto/query-procedure-preauth-submission.dto';
import { QueryPackageBundleDto } from './dto/query-packagebundle-preauth-submission.dto';
import { ResultPackageBundleDto ,QueryPackageBundleBilling} from './dto/result-packagebundle-preauth-submission.dto';
import { ResultlistBillingDto} from './dto/result-ListBilling.dto';
import { ResultAuthNoteDto, QueryPreAuthNote} from './dto/result-authnote-preauth-submissiondto';
import { ResultPreAuthDoctorDto ,QueryDoctor } from './dto/result-doctor-preauth-submission.dto';
import { ResultPreAuthDiagnosisDto ,QueryDiagnosis} from './dto/result-diagnosis-preauth-submission.dto';
import { ResultPreAuthProcedurDto ,QueryProcedure} from './dto/result-procedure-preauth-submission.dto';
import { ResultPreAuthAccidentDto } from './dto/result-accident-preauth-submission.dto';
import { ResultPreAuthBillingDto ,QueryBilling} from './dto/result-billing-preauth-submission.dto';
import { ResultCheckeligiblePreAdmissionDto ,CoverageList ,MessageList ,PolicyInfoList ,InsuranceEligibleData ,InsuranceCustomerDetail} from './dto/result-check-eligible-preadmission.dto';
import { ResultlistICDDxInfoDto} from './dto/result-ICDDx.dto';
import { ResultlistICD9InfoDto } from './dto/result-ICD9.dto';
import { QueryUpdateIsAdmissionBodyDto ,ResultSubmitUpdateIsAdmissionDto} from './dto/query-updateisadmission-preauth-submission.dto';
import { ResultReviewDataJsonDto ,ResultReviewPatientInfoDto ,ResultReviewOpdDischargeDto  ,QueryConcurNote
  ,ResultReviewVisitInfoDto ,ResultReviewPreVisitInfoDto
  ,ResultReviewVitalSignInfoDto
  ,ResultReviewBillingInfoDto ,ResultReviewDoctorInfoDto ,ResultReviewOrderItemInfoDto ,ResultReviewInvestigationInfoDto ,ResultReviewDiagnosisInfoDto
} from './dto/review-preauth-submission.dto';
import { QueryProcedeureDatabaseBodyDto ,ResultProcedureDatabaseInfoDto } from '../../utils/dto/result-procedure-databse.dto';

const httpStatusMessageService = new HttpStatusMessageService();
const newHttpMessageDto =new HttpMessageDto();
const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE
@Injectable()
export class PreauthSubmissionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService,
    private readonly checkEligibleService:CheckEligibleService

  ) {}
  async getListBilling(xHN: string ){
    let arrayItemBillingCheckBalance;
    const newHttpMessageDto =new HttpMessageDto();
     try{
       
      const TrakcarepatientInfo = await this.trakcareService.getListBilling(xHN)
  //console.log(TrakcarepatientInfo)
      if (TrakcarepatientInfo.ItemBillingCheckBalance){
        arrayItemBillingCheckBalance = {
     
         ItemBillingCheckBalance: TrakcarepatientInfo.ItemBillingCheckBalance.map((item) => ({
         LocalBillingCode: item.LocalBillingCode,
       LocalBillingName: item.LocalBillingName,
       SimbBillingCode: item.SimbBillingCode,
       PayorBillingCode: item.PayorBillingCode,
       BillingInitial: item.BillingInitial,
       BillingDiscount: item.BillingDiscount,
       BillingNetAmount: item.BillingNetAmount,
       ItemCode: item.ItemCode,
       ItemName: item.ItemName,
       ItemAmount: item.ItemAmount,
       Discount: item.Discount,
       ItemUnitPrice: item.ItemUnitPrice,
       netamt: item.netamt,
       SimbVersion: item.SimbVersion,
       Terminology: item.Terminology,
    }))
       }
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
 
      }else{
        arrayItemBillingCheckBalance = [{
 
         LocalBillingCode: '',
         LocalBillingName: '',
         SimbBillingCode: '',
         PayorBillingCode: '',
         BillingInitial: '',
         BillingDiscount: '',
         BillingNetAmount: '',
   
         ItemCode: '',
         ItemName: '',
         ItemAmount: '',
         Discount: '',
         ItemUnitPrice: '',
         netamt: '',
         SimbVersion: '',
         Terminology: '',
   
          
         }];
         this.addFormatHTTPStatus(newHttpMessageDto,400,'','')
      }
  
 
 
   let newResultlistBillingCheckBalanceDto= new ResultlistBillingDto();
   newResultlistBillingCheckBalanceDto={
     HTTPStatus:newHttpMessageDto,
     Result:  arrayItemBillingCheckBalance
   }
   
   return newResultlistBillingCheckBalanceDto
     }catch(error)
     {
       if (error instanceof Prisma.PrismaClientInitializationError) {
         throw new HttpException(
          { 
           HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
             error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
           },
           },HttpStatus.INTERNAL_SERVER_ERROR );
       }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
           throw new HttpException(
             {  
               HTTPStatus: {
                 statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                 message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                 error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              },
             },HttpStatus.INTERNAL_SERVER_ERROR ); 
       }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
         if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.SERVICE_UNAVAILABLE,
             message: 'Cannot connect to the database server. Please ensure it is running.',
             error: 'Cannot connect to the database server. Please ensure it is running.',
           },
           }, HttpStatus.SERVICE_UNAVAILABLE);
         }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.BAD_REQUEST,
             message: 'Invalid data format or conversion error.',
             error: 'Invalid data format or conversion error.',
           },
           }, HttpStatus.BAD_REQUEST);
         }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.FORBIDDEN,
             message: 'You do not have permission to perform this action.',
             error: 'You do not have permission to perform this action.',
           },
           }, HttpStatus.FORBIDDEN);
         }else if (error.message.includes('Unable to fit integer value')) {
           // Handle integer overflow or similar errors
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.BAD_REQUEST,
             message: 'The integer value is too large for the database field.',
             error: 'The integer value is too large for the database field.',
           },
           }, HttpStatus.BAD_REQUEST);
         }
         else{
           throw new HttpException({  
             HTTPStatus: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An unexpected error occurred.',
                error: 'An unexpected error occurred.',
               },
             },HttpStatus.INTERNAL_SERVER_ERROR,);
         }
       }
     }
   }
  
   async getListVisitClaimAIA(queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
    let xResultInfo;
  try{
   
    const TrakcarepatientInfo = await this.trakcareService.getListVisitClaimAIA(queryPreauthSubmissionDto.PatientInfo.VN);
    const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
    if (TrakcarepatientInfoStatusCode !==200){
      this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
     
      const xQueryClaimFormListInfo =[{
        VN: '', 
        VisiDate: '',
        LocationDesc: '',
        DoctorFirstName: '',
        PresentIllness: '',
        InsuranceNote:''
       } ]
      
       xResultInfo ={
        ClaimFormListInfo: [xQueryClaimFormListInfo],
       } 
    }else{
  
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  
      const xQueryClaimFormListInfo: QueryClaimFormListInfo[] = TrakcarepatientInfo.ClaimFormListInfo ? 
      TrakcarepatientInfo.ClaimFormListInfo.map((item) => {
      return {
        VN: item.VN||'', 
        VisiDate: item.VisiDate||'',
        LocationDesc: item.LocationDesc||'',
        DoctorFirstName: item.DoctorFirstName||'',
        PresentIllness:item.PresentIllness||'',
        InsuranceNote: item.InsuranceNote||'',
        DiagnosisInfo: item.DiagnosisInfo||[], 
        };
      }):[];
      xResultInfo ={
        ClaimFormListInfo: xQueryClaimFormListInfo,
       } 
    }
    // ResultClaimFormListDto ,QueryClaimFormListInfo
    let newResultClaimFormListDto= new ResultClaimFormListDto();
    newResultClaimFormListDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  
  return newResultClaimFormListDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
  async UpdateReferenceVN(queryUpdateReferenceVNBodyDto:QueryUpdateReferenceVNBodyDto){
    let updatestatus;
    try{
      const xRefId =queryUpdateReferenceVNBodyDto.PatientInfo.RefId;
      const xTransactionNo =queryUpdateReferenceVNBodyDto.PatientInfo.TransactionNo;
      const xHN =queryUpdateReferenceVNBodyDto.PatientInfo.HN;
      const xVN =queryUpdateReferenceVNBodyDto.PatientInfo.VN
      const xReferenceVN =queryUpdateReferenceVNBodyDto.PatientInfo.ReferenceVN;
  if ((xTransactionNo)&&(xReferenceVN)){
   
      const checkVisitNumberAvailable = await this.trakcareService.checkVisitNumberAvailable(xHN ,xReferenceVN); 
      const checkVisitNumberStatusCode =checkVisitNumberAvailable.statusCode ? checkVisitNumberAvailable.statusCode :400
      //console.log(checkVisitNumberAvailable)
      if (checkVisitNumberStatusCode !==200){
        this.addFormatHTTPStatus(newHttpMessageDto,400,'Invalid VisitNumber','Invalid VisitNumber')
      }else{
        const existingTransaction = await prismaProgest.transactionclaim.findFirst({
          where: {
            refid: xRefId,
            transactionno: xTransactionNo,
            vn :xVN,
            hn :xHN
          },
        });
    
        if (existingTransaction) {
    
          await prismaProgest.transactionclaim.update({
            where: {
              id: existingTransaction.id, // Use the ID of the existing record
            },
            data: {
              referencevn:xReferenceVN
            },
          });
          updatestatus = 'The record has been successfully updated.'
          this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
        }else{
          updatestatus = 'The record has not been updated.'
          this.addFormatHTTPStatus(newHttpMessageDto,400,'Invalid FurtherClaimVN','')
        }
      }
    
  
   
  }else{
    updatestatus = 'The record has not been updated.'
      this.addFormatHTTPStatus(newHttpMessageDto,400,'Invalid FurtherClaimVN','')
  }
  
      let newResultSubmitUpdateReferenceVNDto= new ResultSubmitUpdateReferenceVNDto();
      newResultSubmitUpdateReferenceVNDto={
              HTTPStatus:newHttpMessageDto,
              Result:updatestatus
        }
  
      return newResultSubmitUpdateReferenceVNDto
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
         
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
  }
  
  async UpdateIsAdmission(queryUpdateIsAdmissionBodyDto:QueryUpdateIsAdmissionBodyDto){
    let updatestatus;
    try{
      const xRefId =queryUpdateIsAdmissionBodyDto.PatientInfo.RefId;
      const xTransactionNo =queryUpdateIsAdmissionBodyDto.PatientInfo.TransactionNo;
      const xHN =queryUpdateIsAdmissionBodyDto.PatientInfo.HN;
      const xVN =queryUpdateIsAdmissionBodyDto.PatientInfo.VN
      const xIsAdmission =queryUpdateIsAdmissionBodyDto.PatientInfo.IsAdmission;

  if ((xTransactionNo)){
        const existingTransaction = await prismaProgest.transactionclaim.findFirst({
          where: {
            refid: xRefId,
            transactionno: xTransactionNo,
            vn :xVN,
            hn :xHN
          },
        });
    
        if (existingTransaction) {
    
          await prismaProgest.transactionclaim.update({
            where: {
              id: existingTransaction.id, // Use the ID of the existing record
            },
            data: {
              isadmission:xIsAdmission
            },
          });
          updatestatus = 'The record has been successfully updated.'
          this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
        }else{
          updatestatus = 'The record has not been updated.'
          this.addFormatHTTPStatus(newHttpMessageDto,400,'Invalid TransactionNo','')
        }
  }else{
    updatestatus = 'The record has not been updated.'
      this.addFormatHTTPStatus(newHttpMessageDto,400,'Invalid TransactionNo','')
  }
  
      let newResultSubmitUpdateIsAdmissionDto= new ResultSubmitUpdateIsAdmissionDto();
      newResultSubmitUpdateIsAdmissionDto={
              HTTPStatus:newHttpMessageDto,
              Result:updatestatus
        }
      return newResultSubmitUpdateIsAdmissionDto
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
         
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
  }
  async getPreAuthVisit(queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
    let xResultInfo;
  try{
    const newQueryVisitDatabaseBodyDto ={
      RefId: queryPreauthSubmissionDto.PatientInfo.RefId,
      TransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
      InsurerCode:queryPreauthSubmissionDto.PatientInfo.InsurerCode,
      HN: queryPreauthSubmissionDto.PatientInfo.HN,
      VN: queryPreauthSubmissionDto.PatientInfo.VN,
    
    }
    const getvisitformDatabase = await this.utilsService.getPrevisitformDatabase(newQueryVisitDatabaseBodyDto)
    if (getvisitformDatabase?.Result?.VisitInfo?.VisitDateTime?.length >0){ 
      if (getvisitformDatabase.Result.VisitInfo.ChiefComplaint){
        getvisitformDatabase.Result.VisitInfo.ChiefComplaint.slice(0,200)
      }
      const newResultReviewVisitInfoDto : ResultReviewPreVisitInfoDto= {
        AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote||'',
        AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated||false,
        ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint? getvisitformDatabase.Result.VisitInfo.ChiefComplaint.slice(0,200):'',
        ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore||'',
        DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText? getvisitformDatabase.Result.VisitInfo.DxFreeText.slice(0,200):'',
        ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery||'',
        Height: getvisitformDatabase.Result.VisitInfo.Height||'',
        PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam? getvisitformDatabase.Result.VisitInfo.PhysicalExam.slice(0,1000):'',
        PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment? getvisitformDatabase.Result.VisitInfo.PlanOfTreatment.slice(0,500):'',
        Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant||false,
        PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness? getvisitformDatabase.Result.VisitInfo.PresentIllness.slice(0,500):'',
        PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate||'',
        PreviousTreatmentDetail:getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail? getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail.slice(0,20):'',
        PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase||false,
        ProcedureFreeText:getvisitformDatabase.Result.VisitInfo.ProcedureFreeText? getvisitformDatabase.Result.VisitInfo.ProcedureFreeText.slice(0,500):'',
        SignSymptomsDate:getvisitformDatabase.Result.VisitInfo.SignSymptomsDate|| '',
        UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition||'',
        VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
        VN:  getvisitformDatabase.Result.VisitInfo.VN||'',
        Weight: getvisitformDatabase.Result.VisitInfo.Weight||'',
        An:  getvisitformDatabase.Result.VisitInfo.VN||'',

        PreauthReferClaimNo: getvisitformDatabase.Result.VisitInfo.PreauthReferClaimNo||'',
        PreauthReferOcc: getvisitformDatabase.Result.VisitInfo.PreauthReferOcc||'',
        IndicationForAdmission: getvisitformDatabase.Result.VisitInfo.IndicationForAdmission||'',
        DscDateTime: getvisitformDatabase.Result.VisitInfo.DscDateTime||'',
        AdmitDateTime: getvisitformDatabase.Result.VisitInfo.AdmitDateTime||'',
        IsIPDDischarge:getvisitformDatabase.Result.VisitInfo.IsIPDDischarge,
        IsPackage:getvisitformDatabase.Result.VisitInfo.IsPackage,
        ExpectedAdmitDate:getvisitformDatabase.Result.VisitInfo.ExpectedAdmitDate||'',
        TotalEstimatedCost:getvisitformDatabase.Result.VisitInfo.TotalEstimatedCost||'',
        AnesthesiaList:getvisitformDatabase.Result.VisitInfo.AnesthesiaList

      }
// console.log('---test')
 this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      xResultInfo ={
        VisitInfo: newResultReviewVisitInfoDto,
       } 
    }else{
     
      const TrakcarepatientInfo = await this.trakcareService.getIPDVisit(queryPreauthSubmissionDto.PatientInfo.VN);
      const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
      if (TrakcarepatientInfoStatusCode !==200){
        this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
        const xQueryVisit ={    
          FurtherClaimId:  '', 
          AccidentCauseOver45Days: '',
          AdditionalNote:  '',
          AlcoholRelated: '',
          ChiefComplaint:  '',
          ComaScore: '',
          DxFreeText:  '',
          ExpectedDayOfRecovery: '',
          Height: '',
          PhysicalExam: '',
          PlanOfTreatment: '',
          Pregnant: '',
          PresentIllness: '',
          PreviousTreatmentDate:  '',
          PreviousTreatmentDetail: '',
          PrivateCase:'',
          ProcedureFreeText:  '',
          SignSymptomsDate:  '',
          UnderlyingCondition:  '',
          VisitDateTime: '',
          Vn:  '',
          Weight:  '',
          IsIPDDischarge:'',
          ExpectedAdmitDate:'',
          TotalEstimatedCost:'',
          AnesthesiaList:''
         }
         xResultInfo ={
          VisitInfo: xQueryVisit,
         } 
      }else{
        
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
          const xQueryVisit: QueryVisit = TrakcarepatientInfo.VisitInfo ? {
            
            AccidentDate: TrakcarepatientInfo.VisitInfo.AccidentDate || '',
            AdditionalNote: TrakcarepatientInfo.VisitInfo.AdditionalNote || '',
            AdmitDateTime: TrakcarepatientInfo.VisitInfo.AdmitDateTime || '',
            AlcoholRelated: TrakcarepatientInfo.VisitInfo.AlcoholRelated || false,
            ChiefComplaint: TrakcarepatientInfo.VisitInfo.ChiefComplaint? TrakcarepatientInfo.VisitInfo.ChiefComplaint.slice(0,200): '',
            ComaScore: TrakcarepatientInfo.VisitInfo.ComaScore || '',
            DxFreeText: TrakcarepatientInfo.VisitInfo.DxFreeText? TrakcarepatientInfo.VisitInfo.DxFreeText.slice(0,200) : '',
            ExpectedDayOfRecovery: TrakcarepatientInfo.VisitInfo.ExpectedDayOfRecovery || '',
            ExpectedLos: TrakcarepatientInfo.VisitInfo.ExpectedLos || '',
            Height: TrakcarepatientInfo.VisitInfo.Height || '',
            IndicationForAdmission: TrakcarepatientInfo.VisitInfo.IndicationForAdmission || '',
            PhysicalExam: TrakcarepatientInfo.VisitInfo.PhysicalExam? TrakcarepatientInfo.VisitInfo.PhysicalExam.slice(0,1000):'',
            PlanOfTreatment: TrakcarepatientInfo.VisitInfo.PlanOfTreatment ? TrakcarepatientInfo.VisitInfo.PlanOfTreatment.slice(0,500) : '',
            PreauthReferClaimNo: TrakcarepatientInfo.VisitInfo.PreauthReferClaimNo || '',
            PreauthOcc: TrakcarepatientInfo.VisitInfo.PreauthOcc || '',
            Pregnant: TrakcarepatientInfo.VisitInfo.Pregnant || false,
            PresentIllness: TrakcarepatientInfo.VisitInfo.PresentIllness? TrakcarepatientInfo.VisitInfo.PresentIllness.slice(0,500) : '',
            PreviousTreatmentDate: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDate || '',
            PreviousTreatmentDetail: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDetail ? TrakcarepatientInfo.VisitInfo.PreviousTreatmentDetail.slice(0,20) : '',
            PrivateCase: TrakcarepatientInfo.VisitInfo.PrivateCase || false,
            ProcedureFreeText: TrakcarepatientInfo.VisitInfo.ProcedureFreeText ? TrakcarepatientInfo.VisitInfo.ProcedureFreeText.slice(0,500) : '',
            SignSymptomsDate: TrakcarepatientInfo.VisitInfo.SignSymptomsDate || '',
            UnderlyingCondition: TrakcarepatientInfo.VisitInfo.UnderlyingCondition || '',
            VisitDate: TrakcarepatientInfo.VisitInfo.VisitDate || '',
            VisitDateTime: TrakcarepatientInfo.VisitInfo.VisitDateTime || '',
            DscDateTime: TrakcarepatientInfo.VisitInfo.DscDateTime || '',
            Vn: TrakcarepatientInfo.VisitInfo.Vn || '',
            An: TrakcarepatientInfo.VisitInfo.An || '',
            Weight: TrakcarepatientInfo.VisitInfo.Weight || '',
        } : {};
        xResultInfo ={
          VisitInfo: xQueryVisit,
         } 
      }
     // console.log(' -----get data from trakcare ----')
    }
    let newResultIpdDischargeVisitDto= new ResultPreAuthVisitDto();
    newResultIpdDischargeVisitDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
      //console.log(newResultIpdDischargeVisitDto)
  return newResultIpdDischargeVisitDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
  async getPreAuthDoctor(queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
    let xResultInfo;
  try{
  
    const TrakcarepatientInfo = await this.trakcareService.getIPDDoctor(queryPreauthSubmissionDto.PatientInfo.VN);
    const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
    if (TrakcarepatientInfoStatusCode !==200){
      this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
      const xQueryDoctor ={    
        DoctorLicense: '0000000000', 
        DoctorRole: 'OWNER',
        DoctorFirstName: '',
        DoctorLastName: '',
     
       }
       xResultInfo ={
        DoctorInfo: [xQueryDoctor],
       } 
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      const xQueryDoctor: QueryDoctor[] = TrakcarepatientInfo.DoctorInfo ? TrakcarepatientInfo.DoctorInfo.map((item) => {
        return {
          DoctorLicense: item.DoctorLicense||'', 
          DoctorRole: item.DoctorRole||'',
          DoctorFirstName: item.DoctorFirstName||'',
          DoctorLastName: item.DoctorLastName||'',
          
         };
       }):[];
      xResultInfo ={
        DoctorInfo: xQueryDoctor,
       } 
    }
    let newResultIpdDischargeDoctorDto= new ResultPreAuthDoctorDto();
    newResultIpdDischargeDoctorDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  
  return newResultIpdDischargeDoctorDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
  async getPreAuthDiagnosis(queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
    let xResultInfo;
  try{
    const existingRecordtransactionclaim = await prismaProgest.transactionclaim.findFirst({
      where: {
        refid: queryPreauthSubmissionDto.PatientInfo.RefId,
        transactionno: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
      },
    });
    let xQueryDiagnosis: QueryDiagnosis[] 
    const getDiagnosisformDatabase = await this.utilsService.getDiagnosisformDatabase(queryPreauthSubmissionDto.PatientInfo)

    if (getDiagnosisformDatabase && getDiagnosisformDatabase.Result.DiagnosisInfo && getDiagnosisformDatabase.Result.DiagnosisInfo.length > 0) {
       xQueryDiagnosis= await Promise.all(

        getDiagnosisformDatabase.Result.DiagnosisInfo.map(async (item) => {
        
        return {
        
          
          DxCode: item.Icd10,
          DxName:  item.DxName,
          Dxtypenametrakcare: 'OT',
          Dxtypecodeinsurance: 'OT',
          Dxtypenameinsurance: 'OT'
        };
      })
      
    );
    
    xResultInfo ={
      DiagnosisInfo: xQueryDiagnosis,
     } 
    }else{
    
    let xRreferencevn
    if (existingRecordtransactionclaim?.referencevn){
     xRreferencevn =existingRecordtransactionclaim?.referencevn
    }else{
      xRreferencevn=queryPreauthSubmissionDto.PatientInfo.VN
    }

    const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeDiagnosis(xRreferencevn);
    const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
    if (TrakcarepatientInfoStatusCode !==200){
      this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
      const xQueryDiagnosis =[{    
        DxTypeCode: '', 
        DxCode: '',
        DxName: '',
        Dxtypenametrakcare: '',
        Dxtypecodeinsurance: '',
        Dxtypenameinsurance: ''
       }]
       xResultInfo ={
        DiagnosisInfo: [xQueryDiagnosis],
       } 
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      const xQueryDiagnosis: QueryDiagnosis[] = TrakcarepatientInfo.DiagnosisInfo ? 
      await Promise.all(  TrakcarepatientInfo.DiagnosisInfo.map(async (item) => {
        const convertDxtypename = await this.convertDxTypeCode(''+queryPreauthSubmissionDto.PatientInfo.InsurerCode,item.DxTypeCode);
        const dxtypenametrakcare = convertDxtypename?.Result?.dxtypenametrakcare || '';
        const dxtypecodeinsurance = convertDxtypename?.Result?.dxtypecodeinsurance || '';
        const dxtypenameinsurance = convertDxtypename?.Result?.dxtypenameinsurance || '';
        return {
          DxTypeCode: item.DxTypeCode||'', 
          DxCode: item.DxCode||'',
          DxName: item.DxName||'',
          Dxtypenametrakcare: dxtypenametrakcare||'',
          Dxtypecodeinsurance:dxtypecodeinsurance||'',
          Dxtypenameinsurance: dxtypenameinsurance||''
        };
      })
    ) : [];
      xResultInfo ={
        DiagnosisInfo: xQueryDiagnosis,
       } 
    }}
    let newResultIpdDischargeDiagnosisDto= new ResultPreAuthDiagnosisDto();
    newResultIpdDischargeDiagnosisDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  return newResultIpdDischargeDiagnosisDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
  async getPreAuthProcedure(queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
    let xResultInfo;
  try{
  
    const whereConditions = {
      
      ...(queryPreauthSubmissionDto.PatientInfo.VN ? { vn: { equals: queryPreauthSubmissionDto.PatientInfo.VN } } : {}),
      ...(queryPreauthSubmissionDto.PatientInfo.RefId ? { refid: { equals: queryPreauthSubmissionDto.PatientInfo.RefId  } } : {}),
      ...(queryPreauthSubmissionDto .PatientInfo. TransactionNo ? { transactionno: { equals: queryPreauthSubmissionDto .PatientInfo. TransactionNo } } : {}),
  
    };
    const existingProcedureRecord = await prismaProgest.proceduretransactions.findFirst({
      where: whereConditions
    });
   if (existingProcedureRecord){
  
    const newQueryProcedeureDatabaseBodyDto ={
      RefId:queryPreauthSubmissionDto.PatientInfo.RefId,
      TransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
      InsurerCode:queryPreauthSubmissionDto.PatientInfo.InsurerCode,
      HN:queryPreauthSubmissionDto.PatientInfo.HN,
      VN:queryPreauthSubmissionDto.PatientInfo.VN
    }
    //const getOPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 
     let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];
     const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto)
  
     if (getIPDDischargeProcedure && getIPDDischargeProcedure.Result.ProcedureInfo && getIPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
        newResultProcedureInfoDto= await Promise.all(
          getIPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
         return {
           Icd9: item.Icd9,
           ProcedureName: item.ProcedureName,
           ProcedureDate: item.ProcedureDate,
           
         };
       })
     );
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     xResultInfo ={
      ProcedureInfo: newResultProcedureInfoDto,
     } 
    
   } else {
     newResultProcedureInfoDto = [{
       Icd9: '',
       ProcedureName: '',
       ProcedureDate: '',
     }];
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     xResultInfo ={
      ProcedureInfo: newResultProcedureInfoDto,
     } 
   }
   }else{
  
    const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeProcedure(queryPreauthSubmissionDto.PatientInfo.VN);
    //console.log(TrakcarepatientInfo)
    const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
    if (TrakcarepatientInfoStatusCode !==200){
      this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
      const xQueryProcedure =[{    
        Icd9: '', 
        ProcedureName: '',
        ProcedureDate: '',
       }]
       xResultInfo ={
        ProcedureInfo: [xQueryProcedure],
       } 
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      const xQueryProcedure: QueryProcedure[] = TrakcarepatientInfo.ProcedureInfo ? 
      TrakcarepatientInfo.ProcedureInfo.map((item) => {
      return {
        Icd9: item.Icd9||'', 
        ProcedureName: item.ProcedureName||'',
        ProcedureDate: item.ProcedureDate||'',
        };
      }):[];
      xResultInfo ={
        ProcedureInfo: xQueryProcedure,
       } 
    }
   }
  
    let newResultPreAuthProcedurDto= new ResultPreAuthProcedurDto();
    newResultPreAuthProcedurDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  
  return newResultPreAuthProcedurDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
  async getPreAuthAccident(queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
    let xResultInfo;
  try{
  const newQueryAccidentDatabaseBodyDto ={
    RefId: queryPreauthSubmissionDto.PatientInfo.RefId,
    TransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
    InsurerCode:queryPreauthSubmissionDto.PatientInfo.InsurerCode,
    VN: queryPreauthSubmissionDto.PatientInfo.VN,
    HN:queryPreauthSubmissionDto.PatientInfo.HN,
  
  }
  //console.log('newQueryAccidentDatabaseBodyDto')
  //console.log(newQueryAccidentDatabaseBodyDto)
  //console.log('-----')
  const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
  if (accidentDatabase.Result.AccidentDetailInfo.AccidentPlace.length>0){
  
    const accidentDetailInfo = new AccidentDetailDto();
    accidentDetailInfo.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
    accidentDetailInfo.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';
    //const causeDetail = new CauseOfInjuryDetail();
    if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
      accidentDetailInfo.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
        const causeDetail = new CauseOfInjuryDetail();
  
          causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
          causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
          return causeDetail;
      });
  } 
  if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
      accidentDetailInfo.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
        const injuryDetail = new InjuryDetail();
  
          injuryDetail.WoundType = injury.WoundType || '';
          injuryDetail.InjurySide = injury.InjurySide || '';
          injuryDetail.InjuryArea = injury.InjuryArea || '';
          return injuryDetail;
      });
  }
  const xQueryAccident ={    
    AccidentPlace: accidentDetailInfo.AccidentPlace , 
    AccidentDate: accidentDetailInfo.AccidentDate ,
    CauseOfInjuryDetail:accidentDetailInfo.CauseOfInjuryDetail,  //[causeDetail] ,
    InjuryDetail: accidentDetailInfo.InjuryDetail //[injuryDetail]
   }
   //console.log(xQueryAccident)
   xResultInfo ={
    AccidentDetailInfo: xQueryAccident,
   } 
  this.addFormatHTTPStatus(newHttpMessageDto,200,'suceess','')
  }else{
   const xCauseOfInjuryDetail =[{
      CauseOfInjury: '',
      CommentOfInjury: '',
     } ]
     const  xInjuryDetail =[{
      WoundType: '',
      InjurySide: '',
      InjuryArea: '',
     } ]
     const xQueryAccident ={    
      AccidentPlace: '', 
      AccidentDate: '',
      CauseOfInjuryDetail:xCauseOfInjuryDetail,
      InjuryDetail:xInjuryDetail
     }
    xResultInfo ={
          AccidentDetailInfo: xQueryAccident,
         }  
  
  }
    let newResultPreAuthAccidentDto= new ResultPreAuthAccidentDto();
    newResultPreAuthAccidentDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  
  return newResultPreAuthAccidentDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
//#region "Billing"
  async setPreBilling(queryPreBillingDto:QueryPreBillingDto){
  try{
    const xRefId =queryPreBillingDto.PatientInfo.RefId;
    const xTransactionNo =queryPreBillingDto.PatientInfo.TransactionNo;
   
let PreBillingList,xTotalBillAmount;
   
        const existingPrebilling = await prismaProgest.prebillingtransactions.findMany({
          where: {
              refid: xRefId,
              transactionno: xTransactionNo
          }
      });
      //console.log(existingPrebilling)
      if (!existingPrebilling || existingPrebilling.length === 0) {
        PreBillingList = [{

          LocalBillingCode: '2.1.1',
          LocalBillingName: 'ค่าห้องผู้ป่วยใน',
          SimbBillingCode: '2.1.1',
          PayorBillingCode: '2.1.1',
          BillingInitial: '10000',
          BillingDiscount: '8000',
          BillingNetAmount: '2000',
          
        }];
        xTotalBillAmount='8000'
      }else{
        PreBillingList = [{

          LocalBillingCode: '',
          LocalBillingName: '',
          SimbBillingCode: '',
          PayorBillingCode: '',
          BillingInitial: '',
          BillingDiscount: '',
          BillingNetAmount: '',
         
        }];
         xTotalBillAmount=''
      }
 
   const xResultInfo ={
        TotalBillAmount:xTotalBillAmount,
        PackageBundleList: PreBillingList,
       } 
   // console.log(xHaveProcedure)
    
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')


    
    let newResultSubmitPreBillingDto= new ResultSubmitPreBillingDto();
    newResultSubmitPreBillingDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }

    return newResultSubmitPreBillingDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
       
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
  async getPreBilling(queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
  let xResultInfo;    
try{
  
    const TrakcarepatientInfo = await this.trakcareService.getPreAuthBilling(queryPreauthSubmissionDto.PatientInfo.VN);
    const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
    if (TrakcarepatientInfoStatusCode !==200){
      this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
      const xQueryBilling ={    
        LocalBillingCode: '', 
        LocalBillingName: '',
        SimbBillingCode: '',
        PayorBillingCode: '',
        BillingInitial:'',
        BillingDiscount: '',
        BillingNetAmount:''
       }
       xResultInfo ={
        TotalBillAmount:'',
        BillingInfo: [xQueryBilling],
       } 
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      const xQueryBilling: QueryBilling[] = TrakcarepatientInfo.BillingInfo ? 
      TrakcarepatientInfo.BillingInfo.map((item) => {
      return {
        LocalBillingCode: item.LocalBillingCode||'', 
        LocalBillingName: item.LocalBillingName||'',
        SimbBillingCode: item.SimbBillingCode||'',
        PayorBillingCode: item.PayorBillingCode||'',
        BillingInitial: item.BillingInitial||'',
        BillingDiscount: item.BillingDiscount||'',
        BillingNetAmount: item.BillingNetAmount||'',

        
        };
      }):[];

      xResultInfo ={
        TotalBillAmount: TrakcarepatientInfo.TotalBillAmount ? TrakcarepatientInfo.TotalBillAmount : '',
        BillingInfo: xQueryBilling,
       } 
      }


  let newResultPreAuthBillingDto= new ResultPreAuthBillingDto();
  newResultPreAuthBillingDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultPreAuthBillingDto
}catch(error)
{
  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new HttpException(
     { 
      HTTPStatus: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
      },
      },HttpStatus.INTERNAL_SERVER_ERROR );
  }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new HttpException(
        {  
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
         },
        },HttpStatus.INTERNAL_SERVER_ERROR ); 
  }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
    if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Cannot connect to the database server. Please ensure it is running.',
        error: 'Cannot connect to the database server. Please ensure it is running.',
      },
      }, HttpStatus.SERVICE_UNAVAILABLE);
    }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid data format or conversion error.',
        error: 'Invalid data format or conversion error.',
      },
      }, HttpStatus.BAD_REQUEST);
    }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to perform this action.',
        error: 'You do not have permission to perform this action.',
      },
      }, HttpStatus.FORBIDDEN);
    }else if (error.message.includes('Unable to fit integer value')) {
      // Handle integer overflow or similar errors
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The integer value is too large for the database field.',
        error: 'The integer value is too large for the database field.',
      },
      }, HttpStatus.BAD_REQUEST);
    }
    else{
      throw new HttpException({  
        HTTPStatus: {
           statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
           message: 'An unexpected error occurred.',
           error: 'An unexpected error occurred.',
          },
        },HttpStatus.INTERNAL_SERVER_ERROR,);
    }
  }
}
  }
  async getPackageBundle(queryPackageBundleDto:QueryPackageBundleDto){
    let xResultInfo;
    
    let newQueryPackageBundleBilling : QueryPackageBundleBilling[] = [];
  try{
    const newqueryPackageBundleDto ={
      xPackageCode:queryPackageBundleDto.PackageInfo.PackageCode,
      xPackageDesc: queryPackageBundleDto.PackageInfo.PackageDesc
    }
    const GetPackageBundle = await this.utilsService.getPackageBundle(newqueryPackageBundleDto.xPackageCode+'')

    if (GetPackageBundle.HTTPStatus.statusCode == 200){
    
       if (GetPackageBundle && GetPackageBundle.Result ) {
        newQueryPackageBundleBilling = await Promise.all(
          GetPackageBundle.Result.packagebundleinfo.map(async (item) => {
            return {
              LocalBillingCode: item.localbillingcode, 
              LocalBillingName: item.localbillingname, 
              SimbBillingCode: item.simbbillingcode, 
              PayorBillingCode: item.payorbillingcode, 
              BillingInitial: item.billinginitial, 
              BillingDiscount: item.billingdiscount, 
              BillingNetAmount: item.billingnetamount, 
            };
          })
        );
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
       xResultInfo ={
        PackageCode: GetPackageBundle.Result.packagecode,  // เก็บ packagecode
        PackageDesc: GetPackageBundle.Result.packagedesc, 
        PackagePrice:GetPackageBundle.Result.packagebundleinfo[0].totalbillamount,
        PackageBundleList: newQueryPackageBundleBilling,
       } 

     } else {
      newQueryPackageBundleBilling = [{
        LocalBillingCode: '',
        LocalBillingName: '',
        SimbBillingCode: '',
        PayorBillingCode: '',
        BillingInitial:'',
        BillingDiscount: '',
        BillingNetAmount:''
       }];
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
       xResultInfo ={
        PackageCode: '',
        PackageDesc:'',
        PackagePrice:'',
        PackageBundleList: newQueryPackageBundleBilling,
       } 
     }
     }else{
      newQueryPackageBundleBilling = [{
      
        LocalBillingCode: '',
        LocalBillingName: '',
        SimbBillingCode: '',
        PayorBillingCode: '',
        BillingInitial:'',
        BillingDiscount: '',
        BillingNetAmount:''

      }];
      xResultInfo ={
        PackageCode: '',
        PackageDesc:'',
        PackagePrice:'',
        PackageBundleList: newQueryPackageBundleBilling,
       } 
    }
     
   // xResultInfo =getIPDDischargeProcedure
    let newResultPackageBundleDto= new ResultPackageBundleDto();
    newResultPackageBundleDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  
  return newResultPackageBundleDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
  async SubmitPreBilling(queryPreBillingDto:QueryPreBillingDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryPreBillingDto.PatientInfo.RefId;
      const xTransactionNo =queryPreBillingDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryPreBillingDto.PatientInfo.InsurerCode;
      const xHN =queryPreBillingDto.PatientInfo.HN;
      const xVN =queryPreBillingDto.PatientInfo.VN;
  let PreBillingList;
  
      
      if (Array.isArray(queryPreBillingDto.PatientInfo.PreBillingInfo)) {
        PreBillingList = queryPreBillingDto.PatientInfo.PreBillingInfo.map((prebilling) => ({
          LocalBillingCode: prebilling.LocalBillingCode || '',
          LocalBillingName: prebilling.LocalBillingName || '',
          SimbBillingCode: prebilling.SimbBillingCode || '',
          PayorBillingCode: prebilling.PayorBillingCode || '',
          BillingInitial: prebilling.BillingInitial || '',
          BillingDiscount: prebilling.BillingDiscount || '',
          BillingNetAmount: prebilling.BillingNetAmount || '',
          TotalBillAmount:prebilling.TotalBillAmount||'',
          }));
          const existingPrebilling = await prismaProgest.prebillingtransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });
        if (existingPrebilling.length > 0) {
          await Promise.all(
            existingPrebilling.map(async (prebilling) => {
                  return await prismaProgest.prebillingtransactions.delete({
                      where: {
                          id: prebilling.id // ใช้ id ในการลบ
                      }
                  });
              })
          );
      }
  
          await Promise.all(
            PreBillingList.map(async (prebilling) => {
                return await prismaProgest.prebillingtransactions.create({
                    data: {
                        insurerid: xInsurerCode,
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        hn: xHN,
                        vn: xVN,
                        localbillingcode: prebilling.LocalBillingCode,
                        localbillingname: prebilling.LocalBillingName,
                        simbbillingcode: prebilling.SimbBillingCode,
                        payorbillingcode: prebilling.PayorBillingCode,
                        billingdiscount: prebilling.BillingDiscount,
                        billinginitial: prebilling.BillingInitial,
                        billingnetamount: prebilling.BillingInitial,
                        totalbillamount:prebilling.TotalBillAmount
                      
                    }
                });
            })
        );
  
      } else {
        PreBillingList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  

      
      let newResultSubmitPreBillingDto= new ResultSubmitPreBillingDto();
      newResultSubmitPreBillingDto={
              HTTPStatus:newHttpMessageDto,
              Result:PreBillingList
        }
  
      return newResultSubmitPreBillingDto
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
         
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
  }
  async InsertPreBilling(queryPreBillingDto:QueryPreBillingDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryPreBillingDto.PatientInfo.RefId;
      const xTransactionNo =queryPreBillingDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryPreBillingDto.PatientInfo.InsurerCode;
      const xHN =queryPreBillingDto.PatientInfo.HN;
      const xVN =queryPreBillingDto.PatientInfo.VN;
  let PreBillingList;
  
      
      if (Array.isArray(queryPreBillingDto.PatientInfo.PreBillingInfo)) {
        PreBillingList = queryPreBillingDto.PatientInfo.PreBillingInfo.map((prebilling) => ({
          LocalBillingCode: prebilling.LocalBillingCode || '',
          LocalBillingName: prebilling.LocalBillingName || '',
          SimbBillingCode: prebilling.SimbBillingCode || '',
          PayorBillingCode: prebilling.PayorBillingCode || '',
          BillingInitial: prebilling.BillingInitial || '',
          BillingDiscount: prebilling.BillingDiscount || '',
          BillingNetAmount: prebilling.BillingNetAmount || '',
          TotalBillAmount:prebilling.TotalBillAmount||'',
          }));
        //   const existingPrebilling = await prismaProgest.prebillingtransactions.findMany({
        //     where: {
        //         refid: xRefId,
        //         transactionno: xTransactionNo
        //     }
        // });
      //   if (existingPrebilling.length > 0) {
      //     await Promise.all(
      //       existingPrebilling.map(async (prebilling) => {
      //             return await prismaProgest.prebillingtransactions.delete({
      //                 where: {
      //                     id: prebilling.id // ใช้ id ในการลบ
      //                 }
      //             });
      //         })
      //     );
      // }
  
          await Promise.all(
            PreBillingList.map(async (prebilling) => {
                return await prismaProgest.prebillingtransactions.create({
                    data: {
                        insurerid: xInsurerCode,
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        hn: xHN,
                        vn: xVN,
                        localbillingcode: prebilling.LocalBillingCode,
                        localbillingname: prebilling.LocalBillingName,
                        simbbillingcode: prebilling.SimbBillingCode,
                        payorbillingcode: prebilling.PayorBillingCode,
                        billingdiscount: prebilling.BillingDiscount,
                        billinginitial: prebilling.BillingInitial,
                        billingnetamount: prebilling.BillingInitial,
                        totalbillamount:prebilling.TotalBillAmount
                      
                    }
                });
            })
        );
  
      } else {
        PreBillingList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  

      
      let newResultSubmitPreBillingDto= new ResultSubmitPreBillingDto();
      newResultSubmitPreBillingDto={
              HTTPStatus:newHttpMessageDto,
              Result:PreBillingList
        }
  
      return newResultSubmitPreBillingDto
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
         
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
  }
  async deletePreBillingByRefId(deletePreBillingDto:DeletePreBillingDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =deletePreBillingDto.PatientInfo.RefId;
      const xTransactionNo =deletePreBillingDto.PatientInfo.TransactionNo;
      let PreBillingList;
      const existingPrebilling = await prismaProgest.prebillingtransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });
        if (existingPrebilling.length > 0) {
          await Promise.all(
            existingPrebilling.map(async (prebilling) => {
                  return await prismaProgest.prebillingtransactions.delete({
                      where: {
                          id: prebilling.id // ใช้ id ในการลบ
                      }
                  });
              })
          );
      
  
          PreBillingList = [];
  
      } else {
        PreBillingList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'delete sucess','')
  

      
      let newResultSubmitPreBillingDto= new ResultSubmitPreBillingDto();
      newResultSubmitPreBillingDto={
              HTTPStatus:newHttpMessageDto,
              Result:PreBillingList
        }
  
      return newResultSubmitPreBillingDto
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
         
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
  }
  async previewPreBilling(queryPreBillingDto:QueryPreBillingDto){
    try{
      const xRefId =queryPreBillingDto.PatientInfo.RefId;
      const xTransactionNo =queryPreBillingDto.PatientInfo.TransactionNo;
  const xTotalBillAmount='';
  let PreBillingList :any;  
          const existingPrebilling = await prismaProgest.prebillingtransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });     
        console.log(existingPrebilling)
  
        if ((existingPrebilling )||(existingPrebilling.length >0)) {
          PreBillingList =await Promise.all(  existingPrebilling.map(async (item) => {
      
            return {
              BillingID:item.id,
              LocalBillingCode: item.localbillingcode,
              LocalBillingName: item.localbillingname,
              SimbBillingCode: item.simbbillingcode,
              PayorBillingCode: item.payorbillingcode,
              BillingInitial: item.billinginitial,
              BillingDiscount: item.billingdiscount,
              BillingNetAmount: item.billingnetamount,
            };
          })
          );
      
        
        }else{
          PreBillingList = [{
            BillingID:'',
            LocalBillingCode: '',
            LocalBillingName: '',
            SimbBillingCode: '',
            PayorBillingCode: '',
            BillingInitial: '',
            BillingDiscount: '',
            BillingNetAmount: '',
           
          }];
          
        }
      
     const xResultInfo ={
          TotalBillAmount:xTotalBillAmount,
          BillingInfo: PreBillingList,
          InvoiceNumber:''
         }       
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  
      let newResultSubmitPreBillingDto= new ResultSubmitPreBillingDto();
      newResultSubmitPreBillingDto={
              HTTPStatus:newHttpMessageDto,
              Result:xResultInfo
        }
  
      return newResultSubmitPreBillingDto
    
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
    }
 async deletePreBillingById(deletePreBillingDto:DeletePreBillingDto){
      try{
        const xRefId =deletePreBillingDto.PatientInfo.RefId;
        const xTransactionNo =deletePreBillingDto.PatientInfo.TransactionNo;
        const xBillingID =Number(deletePreBillingDto.PatientInfo.BillingID);
    const xTotalBillAmount='';
    let PreBillingList :any;  
            const existingPrebilling = await prismaProgest.prebillingtransactions.findFirst({
              where: {
                  refid: xRefId,
                  transactionno: xTransactionNo,
                  id:xBillingID
              }
          });     

          if (existingPrebilling ) {
            PreBillingList =[{
                BillingID:existingPrebilling.id,
                LocalBillingCode: existingPrebilling.localbillingcode,
                LocalBillingName: existingPrebilling.localbillingname,
                SimbBillingCode: existingPrebilling.simbbillingcode,
                PayorBillingCode: existingPrebilling.payorbillingcode,
                BillingInitial: existingPrebilling.billinginitial,
                BillingDiscount: existingPrebilling.billingdiscount,
                BillingNetAmount: existingPrebilling.billingnetamount,

              }];

            
       await await prismaProgest.prebillingtransactions.delete({  where: {  id:xBillingID,   }, });
          
          }else{

            PreBillingList = [{
              BillingID:'',
              LocalBillingCode: '',
              LocalBillingName: '',
              SimbBillingCode: '',
              PayorBillingCode: '',
              BillingInitial: '',
              BillingDiscount: '',
              BillingNetAmount: '',
             
            }];
            
          }
        
       const xResultInfo ={
            TotalBillAmount:xTotalBillAmount,
            BillingInfo: PreBillingList,
            InvoiceNumber:''
           }       
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    
        let newResultSubmitPreBillingDto= new ResultSubmitPreBillingDto();
        newResultSubmitPreBillingDto={
                HTTPStatus:newHttpMessageDto,
                Result:xResultInfo
          }
    
        return newResultSubmitPreBillingDto
      
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
      }
//#endregion "Billing"

  async getPreAuthNote(querySubmitPreAuthDto:QuerySubmitPreAuthDto){
    let xResultInfo;
  try{
  
    const whereConditions = {
      
      ...(querySubmitPreAuthDto.PatientInfo.VN ? { vn: { equals: querySubmitPreAuthDto.PatientInfo.VN } } : {}),
      ...(querySubmitPreAuthDto.PatientInfo.RefId ? { refid: { equals: querySubmitPreAuthDto.PatientInfo.RefId  } } : {}),
      ...(querySubmitPreAuthDto .PatientInfo. TransactionNo ? { transactionno: { equals: querySubmitPreAuthDto .PatientInfo. TransactionNo } } : {}),
  
    };
    const existingpreauthNoteRecord = await prismaProgest.preauthnotetransactions.findFirst({
      where: whereConditions
    });
    let newQueryPreAuthNote: QueryPreAuthNote[] = [];
  
   if (existingpreauthNoteRecord){
  
    const newQueryConcurrentNoteDatabaseBodyDto ={
      RefId:querySubmitPreAuthDto.PatientInfo.RefId,
      TransactionNo: querySubmitPreAuthDto.PatientInfo.TransactionNo,
      InsurerCode:querySubmitPreAuthDto.PatientInfo.InsurerCode,
      HN:querySubmitPreAuthDto.PatientInfo.HN,
      VN:querySubmitPreAuthDto.PatientInfo.VN
    }
     const getpreauthNoteformDatabase = await this.utilsService.getPreAuthNoteformDatabase(newQueryConcurrentNoteDatabaseBodyDto)
  
     if (getpreauthNoteformDatabase && getpreauthNoteformDatabase.Result.PreAuthNote && getpreauthNoteformDatabase.Result.PreAuthNote.length > 0) {
      newQueryPreAuthNote= await Promise.all(
        getpreauthNoteformDatabase.Result.PreAuthNote.map(async (item) => {
         return {
          PreAuthDateTime: item.PreAuthDateTime,
          PreAuthDetail: item.PreAuthDetail,
           
         };
       })
     );
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     xResultInfo ={
      ConcurNoteList: newQueryPreAuthNote,
     } 
    
   } else {
    newQueryPreAuthNote = [{
      PreAuthDateTime: '',
      PreAuthDetail: '',
     }];
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     xResultInfo ={
      ConcurNoteList: newQueryPreAuthNote,
     } 
   }
   }else{
    newQueryPreAuthNote = [{
      PreAuthDateTime: '',
      PreAuthDetail: '',
    }];
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    xResultInfo ={
      ConcurNoteList: newQueryPreAuthNote,
    } 
   }
  
    let newResultAuthNoteDto= new ResultAuthNoteDto();
    newResultAuthNoteDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  
  return newResultAuthNoteDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
  ///  submit to database
  async SubmitPreAuthVisit(querySubmitPreAuthDto:QuerySubmitPreAuthDto){
  let medicalTransaction;
  try{
    const xRefId =querySubmitPreAuthDto.PatientInfo.RefId;
    const xTransactionNo =querySubmitPreAuthDto.PatientInfo.TransactionNo;
    const xInsurerCode =querySubmitPreAuthDto.PatientInfo.InsurerCode;
    const xHN =querySubmitPreAuthDto.PatientInfo.HN;
    const xVN =querySubmitPreAuthDto.PatientInfo.VN;
    const xVisitDateTime =querySubmitPreAuthDto.PatientInfo.VisitDateTime||'';

    const xComaScore =querySubmitPreAuthDto.PatientInfo.ComaScore||'';
    const xExpectedDayOfRecovery =querySubmitPreAuthDto.PatientInfo.ExpectedDayOfRecovery||'';

  
    const xPreauthReferClaimNo =querySubmitPreAuthDto.PatientInfo.PreauthReferClaimNo||'';
    const xPreauthOcc =querySubmitPreAuthDto.PatientInfo.PreauthReferOcc||'';
    const xIsPackage =querySubmitPreAuthDto.PatientInfo.IsPackage || false;
    const xAnesthesiaList =querySubmitPreAuthDto.PatientInfo.AnesthesiaList||'';
    ////////////////////////
    const xExpectedAdmitDate =querySubmitPreAuthDto.PatientInfo.ExpectedAdmitDate||'';
    const xDscDateTime =querySubmitPreAuthDto.PatientInfo.DscDateTime||'';
    const xTotalEstimatedCost =querySubmitPreAuthDto.PatientInfo.TotalEstimatedCost||null;
    const xIndicationForAdmission =querySubmitPreAuthDto.PatientInfo.IndicationForAdmission||'';
    const xDxFreeText =querySubmitPreAuthDto.PatientInfo.DxFreeText? querySubmitPreAuthDto.PatientInfo.DxFreeText.slice(0,200):'';
    const xPhysicalExam =querySubmitPreAuthDto.PatientInfo.PhysicalExam? querySubmitPreAuthDto.PatientInfo.PhysicalExam.slice(0,1000):'';
    const xChiefComplaint = querySubmitPreAuthDto.PatientInfo.ChiefComplaint?  querySubmitPreAuthDto.PatientInfo.ChiefComplaint.slice(0,200):'';
    const xPresentIllness =querySubmitPreAuthDto.PatientInfo.PresentIllness? querySubmitPreAuthDto.PatientInfo.PresentIllness.slice(0,500):'';
    const xSignSymptomsDate =querySubmitPreAuthDto.PatientInfo.SignSymptomsDate||'';
    const xAlcoholRelated =Boolean(querySubmitPreAuthDto.PatientInfo.AlcoholRelated) || false;
    const xPregnant =Boolean(querySubmitPreAuthDto.PatientInfo.Pregnant) || false;
    const xPrivateCase =Boolean(querySubmitPreAuthDto.PatientInfo.PrivateCase) || false;
    const xPreviousTreatmentDate =querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDate||'';
    const xPreviousTreatmentDetail =querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail ? querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail.slice(0,200):'';
    ////////////////////////
    const xHaveProcedure =Boolean(querySubmitPreAuthDto.PatientInfo.HaveProcedure) || false;
    const xHaveAccidentCauseOfInjuryDetail =(querySubmitPreAuthDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false;
    const xHaveAccidentInjuryDetail =(querySubmitPreAuthDto.PatientInfo.HaveAccidentInjuryDetail) || false;
    const xHaveDiagnosis =querySubmitPreAuthDto.PatientInfo.HaveDiagnosis||false;
    const xHavepreBilling =querySubmitPreAuthDto.PatientInfo.HavepreBilling||false;
    const xHavePreAuthNote =querySubmitPreAuthDto.PatientInfo.HavePreAuthNote||false;
  
if (xTransactionNo){
 
  try {

    const existingTransaction = await prismaProgest.medicaltransactions.findFirst({
      where: {
        refid: xRefId,
        transactionno: xTransactionNo,
      },
    });
    // ถ้าพบข้อมูลที่ซ้ำกัน ให้ลบออกก่อน
    if (existingTransaction) {
      await prismaProgest.medicaltransactions.delete({
        where: { id: existingTransaction.id },
      });
    }
     medicalTransaction = await prismaProgest.medicaltransactions.create({
      data: {
        insurerid: xInsurerCode,
        refid: xRefId,
        transactionno: xTransactionNo,
        hn: xHN,
        vn:xVN,
        visitdatetime:xVisitDateTime,

        preauthreferclaimno:xPreauthReferClaimNo,
        preauthreferocc:xPreauthOcc,
        ispackage:xIsPackage,
        anesthesialist:xAnesthesiaList,

        expectedadmitdate:xExpectedAdmitDate,
        expecteddayofrecovery:xExpectedDayOfRecovery,
        comascore:xComaScore,
        dscdatetime:xDscDateTime,
        totalestimatedcost:xTotalEstimatedCost,
        indicationforadmission: xIndicationForAdmission,
        dxfreetext: xDxFreeText,
        physicalexam:xPhysicalExam,
        chiefcomplaint:xChiefComplaint,
        presentillness:xPresentIllness,
        signsymptomsdate: xSignSymptomsDate,
        alcoholrelated: xAlcoholRelated,
        pregnant:xPregnant,
        privatecase:xPrivateCase,
        previoustreatmentdate:xPreviousTreatmentDate,
        previoustreatmentdetail:xPreviousTreatmentDetail,

        haveaccidentinjurydetail: xHaveAccidentInjuryDetail,
        haveaccidentcauseofinjurydetail: xHaveAccidentCauseOfInjuryDetail,
        haveprocedure: xHaveProcedure,
        havediagnosis:xHaveDiagnosis,
        havepreauthnote:xHavePreAuthNote,
        haveprebilling:xHavepreBilling,

       
      },
    });
    
    if (xPreauthReferClaimNo.length > 0) {
    const existingTransactionClaim = await prismaProgest.transactionclaim.findFirst({
      where: {
        refid: xRefId,
        transactionno: xTransactionNo,
      },
    });
    if (existingTransactionClaim) {
      
      await prismaProgest.transactionclaim.update({
        where: {
          id: existingTransactionClaim.id, // Use the ID of the existing record
        },
        data: {
          preauthreferclaimno:xPreauthReferClaimNo,
          preauthreferocc:xPreauthOcc,
        
        },
      });
    }
    }


  }catch (error) {
    throw new Error(`Error creating medical transaction: ${error.message}`);
  }
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
}else{
    this.addFormatHTTPStatus(newHttpMessageDto,400,'Invalid VisitDetail','')
}

    let newResultSubmitIPDVisitDto= new ResultSubmitIPDVisitDto();
    newResultSubmitIPDVisitDto={
            HTTPStatus:newHttpMessageDto,
            Result:medicalTransaction
      }

    return newResultSubmitIPDVisitDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
       
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
  async SubmitDiagnosis(queryDiagnosisDto:QueryDiagnosisDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryDiagnosisDto.PatientInfo.RefId;
      const xTransactionNo =queryDiagnosisDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryDiagnosisDto.PatientInfo.InsurerCode;
      const xHN =queryDiagnosisDto.PatientInfo.HN;
      const xVN =queryDiagnosisDto.PatientInfo.VN;
      const xHaveDiagnosis =Boolean(queryDiagnosisDto.PatientInfo.HaveDiagnosis) || false
  let DiagnosisList;
  if (xHaveDiagnosis ==true){
      if (Array.isArray(queryDiagnosisDto.PatientInfo.DiagnosisInfo)) {
        DiagnosisList = queryDiagnosisDto.PatientInfo.DiagnosisInfo.map((diagnosis) => (
          
          {
            
            DXCode: diagnosis.DxCode || '',
            DxName: diagnosis.DxName || '',
            DxType: diagnosis.DxType || ''
          }));
          const existingProcedures = await prismaProgest.diagnosistransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });
        if (existingProcedures.length > 0) {
          await Promise.all(
              existingProcedures.map(async (diagnosis) => {
                  return await prismaProgest.diagnosistransactions.delete({
                      where: {
                          id: diagnosis.id // ใช้ id ในการลบ
                      }
                  });
              })
          );
      }
  
          await Promise.all(
            DiagnosisList.map(async (diagnosis) => {
                return await prismaProgest.diagnosistransactions.create({
                  
                    data: {
                        insurerid: xInsurerCode,
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        hn: xHN,
                        vn: xVN,
                        icd10: diagnosis.DXCode ,
                        dxname: diagnosis.DxName,
                        dxtype: diagnosis.DxType
                    }
                    
                });
            })
        );
  
      } else {
        DiagnosisList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
    DiagnosisList = [
          {
              "Icd10": "",
              "DxName": "",
              "DxType": ""
          }
      ]
   // console.log(xHaveProcedure)
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Diagnosis','')
  }
  
    
      
      let newResultSubmitDiagnosisDto= new ResultSubmitDiagnosisDto();
      newResultSubmitDiagnosisDto={
              HTTPStatus:newHttpMessageDto,
              Result:DiagnosisList
        }
  
      return newResultSubmitDiagnosisDto
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
         
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
  }
  async SubmitPreAuthNote(queryPreAuthNoteDto:QueryPreAuthNoteDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryPreAuthNoteDto.PatientInfo.RefId;
      const xTransactionNo =queryPreAuthNoteDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryPreAuthNoteDto.PatientInfo.InsurerCode;
      const xHN =queryPreAuthNoteDto.PatientInfo.HN;
      const xVN =queryPreAuthNoteDto.PatientInfo.VN;
      const xHavePreAuthNote = queryPreAuthNoteDto.PatientInfo.HavePreAuthNote;
  let PreAuthNoteList;
  if (xHavePreAuthNote ==true){
      
      if (Array.isArray(queryPreAuthNoteDto.PatientInfo.PreAuthNoteInfo)) {
        PreAuthNoteList = queryPreAuthNoteDto.PatientInfo.PreAuthNoteInfo.map((preauthnote) => ({
          PreAuthDatetime: preauthnote.PreAuthDatetime || '',
          PreAuthDetail: preauthnote.PreAuthDetail || '',
          }));
          const existingPreauthnote = await prismaProgest.preauthnotetransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });
        if (existingPreauthnote.length > 0) {
          await Promise.all(
            existingPreauthnote.map(async (preauthnote) => {
                  return await prismaProgest.preauthnotetransactions.delete({
                      where: {
                          id: preauthnote.id // ใช้ id ในการลบ
                      }
                  });
              })
          );
      }
  
          await Promise.all(
            PreAuthNoteList.map(async (preauthnote) => {
                return await prismaProgest.preauthnotetransactions.create({
                    data: {
                        insurerid: xInsurerCode,
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        hn: xHN,
                        vn: xVN,
                        preauthdatetime: preauthnote.PreAuthDatetime,
                        preauthdetail: preauthnote.PreAuthDetail,
                      
                    }
                });
            })
        );
  
      } else {
        PreAuthNoteList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
    PreAuthNoteList = [
          {
              "PreAuthDatetime": "",
              "PreAuthDetail": "",
          }
      ]
   // console.log(xHaveProcedure)
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Procedure','')
  }
  
    
      
      let newResultSubmitPreAuthNoteDto= new ResultSubmitPreAuthNoteDto();
      newResultSubmitPreAuthNoteDto={
              HTTPStatus:newHttpMessageDto,
              Result:PreAuthNoteList
        }
  
      return newResultSubmitPreAuthNoteDto
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
         
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
  }

  async SubmitAccident(queryAccidentDto:QueryAccidentDto){
    let xResultInfo,xCauseOfInjuryDetail ,xInjuryDetail;
    try{
      const xRefId =queryAccidentDto.PatientInfo.RefId;
      const xTransactionNo =queryAccidentDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryAccidentDto.PatientInfo.InsurerCode;
      const xHN =queryAccidentDto.PatientInfo.HN;
      const xVN =queryAccidentDto.PatientInfo.VN;
      const xHaveAccidentCauseOfInjuryDetail =queryAccidentDto.PatientInfo.HaveAccidentCauseOfInjuryDetail || false
      const xHaveAccidentInjuryDetail =queryAccidentDto.PatientInfo.HaveAccidentInjuryDetail || false
      const xAccidentPlace =queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentPlace;
      const xAccidentDate =queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentDate;
    //  console.log('-------^^^^------')
    //   console.log(queryAccidentDto)
    //   console.log('-------^^^^------')

  if ((xHaveAccidentCauseOfInjuryDetail ==true)||(xHaveAccidentInjuryDetail ==true)){
    
      await prismaProgest.$transaction(async (prisma) => {
      // ตรวจสอบว่ามีข้อมูลอยู่ใน accidenttransactions หรือไม่
      const existingTransaction = await prisma.accidenttransactions.findFirst({
        where: {
          refid: xRefId ,//queryAccidentDto.PatientInfo.RefId,
          transactionno:  xTransactionNo //queryAccidentDto.PatientInfo.TransactionNo,
        },
      }); 
      // ถ้ามีข้อมูลให้ลบข้อมูลเก่า
      if (existingTransaction) {
        await prisma.injurydetail.deleteMany({
          where: {
            accidentid: existingTransaction.id,
          },
        });
        await prisma.causeofinjurydetail.deleteMany({
          where: {
            accidentid: existingTransaction.id,
          },
        });
        await prisma.accidenttransactions.delete({
          where: {
            id: existingTransaction.id,
          },
        });
      }
    
      // บันทึกข้อมูลใหม่ใน accidenttransactions
    const accidentTransaction = await prisma.accidenttransactions.create({
        data: {
          insurerid: xInsurerCode ,//queryAccidentDto.PatientInfo.InsurerCode,
          refid: xRefId ,//queryAccidentDto.PatientInfo.RefId,
          transactionno: xTransactionNo,//queryAccidentDto.PatientInfo.TransactionNo,
          hn: xHN ,//queryAccidentDto.PatientInfo.HN,
          vn: xVN ,//queryAccidentDto.PatientInfo.VN,
          accidentplace: xAccidentPlace ,//queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentPlace,
          accidentdate: xAccidentDate //queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentDate,
        },
      });
    if(xHaveAccidentCauseOfInjuryDetail ==true){
      if (queryAccidentDto.PatientInfo.AccidentDetailInfo.CauseOfInjuryDetail) {
        xCauseOfInjuryDetail = queryAccidentDto.PatientInfo.AccidentDetailInfo.CauseOfInjuryDetail.map((cause) => ({
          accidentid: accidentTransaction.id,
          causeofinjury: cause.CauseOfInjury,
          commentofinjury: cause.CommentOfInjury,
        }));
    
        await prisma.causeofinjurydetail.createMany({
          data: xCauseOfInjuryDetail,
        });
      }
    }else{
        await prisma.causeofinjurydetail.deleteMany({
          where: {
            accidentid: existingTransaction.id,
          },
        });
      xCauseOfInjuryDetail =[{
        CauseOfInjury: '',
        CommentOfInjury: '',
       } ]
    }
      
    if(xHaveAccidentInjuryDetail ==true){
      if (queryAccidentDto.PatientInfo.HaveAccidentInjuryDetail) {
        xInjuryDetail = queryAccidentDto.PatientInfo.AccidentDetailInfo.InjuryDetail.map((injury) => ({
          accidentid: accidentTransaction.id,
          woundtype: injury.WoundType,
          injuryside: injury.InjurySide,
          injuryarea: injury.InjuryArea,
        }));
    
        await prisma.injurydetail.createMany({
          data: xInjuryDetail,
        });
      }
    }else{
      if ((xHaveAccidentInjuryDetail ==false)){
        await prisma.injurydetail.deleteMany({
          where: {
            accidentid: existingTransaction.id,
          },
        });
  
        xInjuryDetail =[{
         WoundType: '',
         InjurySide: '',
         InjuryArea: '',
        } ]
       }
    }
     });
    
    
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
    if ((xHaveAccidentCauseOfInjuryDetail ==false)){
       xCauseOfInjuryDetail =[{
        CauseOfInjury: '',
        CommentOfInjury: '',
       } ]
  
    }
    if ((xHaveAccidentInjuryDetail ==false)){
       xInjuryDetail =[{
        WoundType: '',
        InjurySide: '',
        InjuryArea: '',
       } ]
      }
    
    
  
  
    
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Accident','')
  }
  
    
  const xQueryAccident ={    
    AccidentPlace: xAccidentPlace, 
    AccidentDate: xAccidentDate,
    CauseOfInjuryDetail:xCauseOfInjuryDetail,
    InjuryDetail:xInjuryDetail
   }
   xResultInfo ={
    AccidentDetailInfo: xQueryAccident,
   } 
   let newResultSubmitAccidentDto= new ResultSubmitAccidentDto();
      newResultSubmitAccidentDto={
              HTTPStatus:newHttpMessageDto,
              Result:xResultInfo
        }
  
      return newResultSubmitAccidentDto
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
         
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
  }
  async SubmitProcedure(queryProcedureDto:QueryProcedureDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryProcedureDto.PatientInfo.RefId;
      const xTransactionNo =queryProcedureDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryProcedureDto.PatientInfo.InsurerCode;
      const xHN =queryProcedureDto.PatientInfo.HN;
      const xVN =queryProcedureDto.PatientInfo.VN;
      const xHaveProcedure =Boolean(queryProcedureDto.PatientInfo.HaveProcedure) || false
  
  let ProcedureList;
  if (xHaveProcedure ==true){
      
      if (Array.isArray(queryProcedureDto.PatientInfo.ProcedureInfo)) {
          ProcedureList = queryProcedureDto.PatientInfo.ProcedureInfo.map((procedure) => ({
            Icd9: procedure.Icd9 || '',
            ProcedureName: procedure.ProcedureName || '',
            ProcedureDate: procedure.ProcedureDate || ''
          }));
          const existingProcedures = await prismaProgest.proceduretransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });
        if (existingProcedures.length > 0) {
          await Promise.all(
              existingProcedures.map(async (procedure) => {
                  return await prismaProgest.proceduretransactions.delete({
                      where: {
                          id: procedure.id // ใช้ id ในการลบ
                      }
                  });
              })
          );
      }
  
          await Promise.all(
            ProcedureList.map(async (procedure) => {
                return await prismaProgest.proceduretransactions.create({
                    data: {
                        insurerid: xInsurerCode,
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        hn: xHN,
                        vn: xVN,
                        icd9: procedure.Icd9,
                        procedurename: procedure.ProcedureName,
                        proceduredate: procedure.ProcedureDate
                    }
                });
            })
        );
  
      } else {
           ProcedureList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
  ProcedureList = [
          {
              "Icd9": "",
              "ProcedureName": "",
              "ProcedureDate": ""
          }
      ]
   // console.log(xHaveProcedure)
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Procedure','')
  }
  
    
      
      let newResultSubmitProcedureDto= new ResultSubmitProcedureDto();
      newResultSubmitProcedureDto={
              HTTPStatus:newHttpMessageDto,
              Result:ProcedureList
        }
  
      return newResultSubmitProcedureDto
    }catch(error)
    {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new HttpException(
         { 
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          },
         
          },HttpStatus.INTERNAL_SERVER_ERROR );
      }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new HttpException(
            {  
              HTTPStatus: {
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
             },
            },HttpStatus.INTERNAL_SERVER_ERROR ); 
      }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
        if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Cannot connect to the database server. Please ensure it is running.',
            error: 'Cannot connect to the database server. Please ensure it is running.',
          },
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid data format or conversion error.',
            error: 'Invalid data format or conversion error.',
          },
          }, HttpStatus.BAD_REQUEST);
        }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'You do not have permission to perform this action.',
            error: 'You do not have permission to perform this action.',
          },
          }, HttpStatus.FORBIDDEN);
        }else if (error.message.includes('Unable to fit integer value')) {
          // Handle integer overflow or similar errors
          throw new HttpException({
            HTTPStatus: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'The integer value is too large for the database field.',
            error: 'The integer value is too large for the database field.',
          },
          }, HttpStatus.BAD_REQUEST);
        }
        else{
          throw new HttpException({  
            HTTPStatus: {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'An unexpected error occurred.',
               error: 'An unexpected error occurred.',
              },
            },HttpStatus.INTERNAL_SERVER_ERROR,);
        }
      }
    }
  }
  /// sent to aia
  async SubmitPreSubmissionToAIA(querySubmitPreAuthDto:QuerySubmitPreAuthDto){
    let xResultInfo;
    // console.log('----- sent AIA')
  try{
   const RequesetBody ={
    xRefId:querySubmitPreAuthDto.PatientInfo.RefId, //'oljhnklefhbilubsEFJKLb65255555',
    xTransactionNo: querySubmitPreAuthDto.PatientInfo.TransactionNo,//'6f49b02c-4102-44e4-bd6a-c5bed5dc8b1c',
    xHN :querySubmitPreAuthDto.PatientInfo.HN ,
    xInsurerCode: querySubmitPreAuthDto.PatientInfo.InsurerCode, 
    xVN: querySubmitPreAuthDto.PatientInfo.VN ,
    xVisitDateTime :querySubmitPreAuthDto.PatientInfo.VisitDateTime,
    xAccidentDate:querySubmitPreAuthDto.PatientInfo.AccidentDate,
    xAccidentPlaceCode :querySubmitPreAuthDto.PatientInfo.AccidentPlaceCode,
    xIdType:querySubmitPreAuthDto.PatientInfo.IdType,
    xPolicyTypeCode :querySubmitPreAuthDto.PatientInfo.PolicyTypeCode,
    xServiceSettingCode:querySubmitPreAuthDto.PatientInfo.ServiceSettingCode,
    xSurgeryTypeCode:querySubmitPreAuthDto.PatientInfo.SurgeryTypeCode,
    xIllnessTypeCode:querySubmitPreAuthDto.PatientInfo.IllnessTypeCode,
    xRunningdocument:querySubmitPreAuthDto.PatientInfo.Runningdocument,
    xPreviousTreatmentDate:querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDate,
    xPreviousTreatmentDetail:querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail,
    xPreauthReferClaimNo:querySubmitPreAuthDto.PatientInfo.PreauthReferClaimNo,
    xPreauthReferOcc:querySubmitPreAuthDto.PatientInfo.PreauthReferOcc,
    xExpectedAdmitDate:querySubmitPreAuthDto.PatientInfo.ExpectedAdmitDate,
    xDxFreeText:querySubmitPreAuthDto.PatientInfo.DxFreeText,
    xDscDateTime:querySubmitPreAuthDto.PatientInfo.DscDateTime,
    xIndicationForAdmission:querySubmitPreAuthDto.PatientInfo.IndicationForAdmission,
   }
   const existingRecordtransactionclaim = await prismaProgest.transactionclaim.findFirst({
    where: {
      refid: RequesetBody.xRefId,
      transactionno: RequesetBody.xTransactionNo,
    },
  });
   console.log(existingRecordtransactionclaim)
    // if (existingRecordtransactionclaim.referencevn.length >0){
  //  xRreferencevn =existingRecordtransactionclaim.referencevn
  // }else{
  //   xRreferencevn=RequesetBody.xVN
  // }
  //if (!xRreferencevn){ xRreferencevn = }
  const xRreferencevn=RequesetBody.xVN
  //--> get Patient  <--//
  const getSubmitPreAuthPatient = await this.trakcareService.getOPDDischargePatient(RequesetBody.xHN);
  let newResultPatientInfoDto: ResultPatientInfoDto ;
  if (getSubmitPreAuthPatient && getSubmitPreAuthPatient.PatientInfo && getSubmitPreAuthPatient.PatientInfo.HN.length > 0) {
     newResultPatientInfoDto = {
        Dob: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.Dob,AIA_APISecretkey) ,
        Hn: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.HN,AIA_APISecretkey) ,
        Gender: getSubmitPreAuthPatient.PatientInfo.Gender
   };
  }else{
     newResultPatientInfoDto = {
      Dob:'',
      Hn:'',
      Gender:''
    };
  }
  //console.log(newResultPatientInfoDto)
  //#region  Visit
  const whereConditionsGetVisit = {
    ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
    ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
    ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
  };
  const existingVisitRecord = await prismaProgest.medicaltransactions.findFirst({
  where: whereConditionsGetVisit
  });
  let newResultVisitInfoDto = new ResultVisitInfoDto()
  if (existingVisitRecord){
    const newQueryVisitDatabaseBodyDto ={
      RefId: RequesetBody.xRefId,
      TransactionNo: RequesetBody.xTransactionNo,
      InsurerCode:RequesetBody.xInsurerCode,
      HN: RequesetBody.xHN,
      VN: RequesetBody.xVN,
    }
    const getvisitformDatabase = await this.utilsService.getvisitIPDformDatabase(newQueryVisitDatabaseBodyDto)
     newResultVisitInfoDto= {
      AccidentDate:getvisitformDatabase.Result.VisitInfo.AccidentDate,
      AdmitDateTime:getvisitformDatabase.Result.VisitInfo.VisitDateTime,
      AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote||'',
      AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated||false,
      An:  await this.utilsService.EncryptAESECB( getvisitformDatabase.Result.VisitInfo.VN,AIA_APISecretkey) ,
      ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint||'',
      ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore||'',
      DscDateTime:getvisitformDatabase.Result.VisitInfo.DscDateTime,
      DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText||'',
      ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery||'',
      ExpectedLos:null,
      ExpectedAdmitDate:getvisitformDatabase.Result.VisitInfo.ExpectedAdmitDate,
      Height: getvisitformDatabase.Result.VisitInfo.Height||'',
      IndicationForAdmission:getvisitformDatabase.Result.VisitInfo.IndicationForAdmission,
      PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam||'',
      PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment||'',
      Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant||false,
      PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness||'',
      PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate||'',
      PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail||'',
      PreauthReferClaimNo:getvisitformDatabase.Result.VisitInfo.PreauthReferClaimNo,
      PreauthReferOcc: getvisitformDatabase.Result.VisitInfo.PreauthReferOcc,
      PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase||false,
      SignSymptomsDate:getvisitformDatabase.Result.VisitInfo.SignSymptomsDate|| '',
      UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition||'',
      VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
      VisitDate:getvisitformDatabase.Result.VisitInfo.VisitDateTime.split(' ')[0],
      Vn:  await this.utilsService.EncryptAESECB( getvisitformDatabase.Result.VisitInfo.VN,AIA_APISecretkey) ,
      AnesthesiaList :getvisitformDatabase.Result.VisitInfo.AnesthesiaList,
      Weight: getvisitformDatabase.Result.VisitInfo.Weight||'',
      TotalEstimatedCost :getvisitformDatabase.Result.VisitInfo.TotalEstimatedCost,
      IsPackage :getvisitformDatabase.Result.VisitInfo.IsPackage,
    }
  }
   newResultVisitInfoDto.ExpectedLos = this.calculateDaysBetweenDates(newResultVisitInfoDto.VisitDateTime, newResultVisitInfoDto.DscDateTime);
   //#endregion
  //#region  VitalSign
  let newResultVitalSignInfoDto: ResultVitalSignInfoDto[] = [];
  newResultVitalSignInfoDto = [{
    DiastolicBp: '',
    HeartRate: '',
    OxygenSaturation: '',
    PainScore: '',
    RespiratoryRate: '',
    SystolicBp: '',
    Temperature: '',
    VitalSignEntryDateTime: '',
    
  }];
  //#endregion
  //#region  Diagnosis
  let newQueryDiagnosisInfoDto: ResultDiagnosisInfoDto[] = [];
  const newQueryPreDiagnosisDatabaseBodyDto ={
    RefId:RequesetBody.xRefId,
    TransactionNo:RequesetBody.xTransactionNo,
    InsurerCode:RequesetBody.xInsurerCode,
    HN:RequesetBody.xHN,
    VN:RequesetBody.xVN
  }
  const getDiagnosisformDatabase = await this.utilsService.getDiagnosisformDatabase(newQueryPreDiagnosisDatabaseBodyDto)
  if (getDiagnosisformDatabase && getDiagnosisformDatabase.Result.DiagnosisInfo && getDiagnosisformDatabase.Result.DiagnosisInfo.length > 0) {
    newQueryDiagnosisInfoDto= await Promise.all(
      getDiagnosisformDatabase.Result.DiagnosisInfo.map(async (item) => {
      return {
        Icd10: item.Icd10,
        DxName: item.DxName,
        DxType: 'OT',
        
      };
    })
  );
  
  }else{
    newQueryDiagnosisInfoDto = [{
      DxName: '',
      DxType: '',
      Icd10: '',
    }];
  }
  //console.log(newQueryDiagnosisInfoDto)

  //#endregion
  //#region  AccidentDetail
    let newAccidentDetail ; //= new ResultAccidentDetailDto();
    if ((RequesetBody.xIllnessTypeCode='ACC')||(RequesetBody.xIllnessTypeCode='ER')){
    
      let newQueryAccidentDatabaseBodyDto = new QueryAccidentDatabaseBodyDto();
    newQueryAccidentDatabaseBodyDto ={
      RefId: RequesetBody.xRefId,
      TransactionNo: RequesetBody.xTransactionNo,
      InsurerCode:RequesetBody.xInsurerCode,
      HN: RequesetBody.xHN,
      VN: RequesetBody.xVN,
    }
    const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
    const accidentDetailInfo = new AccidentDetailDto();
    accidentDetailInfo.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
    accidentDetailInfo.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';
    
    if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
      accidentDetailInfo.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
        const causeDetail = new CauseOfInjuryDetail();
    
          causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
          causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
          return causeDetail;
      });
    } 
    if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
      accidentDetailInfo.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
        const injuryDetail = new InjuryDetail();
    
          injuryDetail.WoundType = injury.WoundType || '';
          injuryDetail.InjurySide = injury.InjurySide || '';
          injuryDetail.InjuryArea = injury.InjuryArea || '';
          return injuryDetail;
      });
    }
     newAccidentDetail = {    
      AccidentPlace: accidentDetailInfo.AccidentPlace,
      AccidentDate: accidentDetailInfo.AccidentDate,
      CauseOfInjuryDetail: accidentDetailInfo.CauseOfInjuryDetail,
      InjuryDetail: accidentDetailInfo.InjuryDetail
    };
    
    }else{
      newAccidentDetail= {
        "AccidentPlace": '',
        "AccidentDate": '',
        "CauseOfInjuryDetail": [
            {
                "CauseOfInjury": '',
                "CommentOfInjury": ''
            }
        ],
        "InjuryDetail": [
            {
                "WoundType": "",
                "InjurySide": "",
                "InjuryArea":''
            }
        ]
    }
    }
    //#endregion
  //#region  Procedure
  let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];
    const newQueryProcedeureDatabaseBodyDto ={
      RefId:RequesetBody.xRefId,
      TransactionNo:RequesetBody.xTransactionNo,
      InsurerCode:RequesetBody.xInsurerCode,
      HN:RequesetBody.xHN,
      VN:RequesetBody.xVN
    }
   
     const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto)
  
    if (getIPDDischargeProcedure && getIPDDischargeProcedure.Result.ProcedureInfo && getIPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
       newResultProcedureInfoDto= await Promise.all(
        getIPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
        return {
          Icd9: item.Icd9,
          ProcedureName: item.ProcedureName,
          ProcedureDate: item.ProcedureDate,
          
        };
      })
    );
  } else {
   // console.log('4444')
    newResultProcedureInfoDto = [{
      Icd9: '',
      ProcedureName: '',
      ProcedureDate: '',
    }];
  }
  //#endregion
  //#region  Investigation
  let newResultInvestigationInfoDto: ResultInvestigationInfoDto[] = [];
  newResultInvestigationInfoDto = [{
    InvestigationCode: '',
    InvestigationGroup: '',
    InvestigationName: '',
    InvestigationResult: '',
    ResultDateTime: ''
  }];
  //#endregion
  //#region  OrderItem
  let newResultOrderItemInfoDto : ResultOrderItemInfoDto[] = [];
  newResultOrderItemInfoDto = [{
  
    ItemId: '',
    ItemName: '',
    ItemAmount: '',
    Discount: '',
    Initial: '',
    LocalBillingCode: '',
    LocalBillingName: '',
    Location: '',
    NetAmount: '',
    SimbVersion: '',
    Terminology: ''
  }];
  //#endregion
  //#region  Doctor

const getOPDDischargeDoctor = await this.trakcareService.getOPDDischargeDoctor(xRreferencevn); 
 let newResultDoctorInfoDto: ResultDoctorInfoDto[] = [];
   if (getOPDDischargeDoctor && getOPDDischargeDoctor.DoctorInfo && getOPDDischargeDoctor.DoctorInfo.length > 0) {
     newResultDoctorInfoDto= await Promise.all(
       getOPDDischargeDoctor.DoctorInfo.map(async (item) => {
       return {
         DoctorLicense: item.DoctorLicense.toString().padStart(10, '0'),
         DoctorRole: item.DoctorRole,
         DoctorFirstName: await this.utilsService.EncryptAESECB( item.DoctorFirstName,AIA_APISecretkey) ,
         DoctorLastName: '' //await this.utilsService.EncryptAESECB( item.DoctorLastName,AIA_APISecretkey) ,
       };
     })
   );
 } else {
   newResultDoctorInfoDto = [{
     DoctorLicense: '',
     DoctorRole: '',
     DoctorFirstName: '',
     DoctorLastName: '',
   
   }];
 }
 //#endregion
  //#region  PSS
  const  newResultPSSInfoDto={
    "Exclusion": "0",
    "FinalScore": "0",
    "Findings": [
      {
        "Description": "0",
        "Exclusion": "0",
        "Medical": "0",
        "Reference": "0"
      }
    ],
    "Id": "0",
    "Medical": "0"
  }
  //#endregion
  //#region  PreAuthnote
    let newResultPreAuthNoteDto: ResultPreAuthNoteDto[] = [];
    newResultPreAuthNoteDto = [{
      PreAuthDatetime: '',
      PreAuthDetail: '',
     
    }];
    //#endregion
  
  
  let newTotalBillAmount =''
  let newResultBillingInfoDto : ResultBillingInfoDto[] = [];
  const newQueryBillingInfoDtoDatabaseBodyDto ={
    RefId:RequesetBody.xRefId,
    TransactionNo:RequesetBody.xTransactionNo,
    InsurerCode:RequesetBody.xInsurerCode,
    HN:RequesetBody.xHN,
    VN:RequesetBody.xVN
  }
  const getPreBillingformDatabase = await this.utilsService.getPreBillingformDatabase(newQueryBillingInfoDtoDatabaseBodyDto)
  
  if (getPreBillingformDatabase && getPreBillingformDatabase.Result.PreBillingInfo && getPreBillingformDatabase.Result.PreBillingInfo.length > 0) {
    newResultBillingInfoDto= await Promise.all(
      getPreBillingformDatabase.Result.PreBillingInfo.map(async (item) => {
        newTotalBillAmount = item.TotalBillAmount     
      return {
        LocalBillingCode: item.LocalBillingCode,
        LocalBillingName: item.LocalBillingName,
        SimbBillingCode: item.SimbBillingCode,
        PayorBillingCode: item.PayorBillingCode,
        BillingDiscount: item.BillingDiscount,
        BillingInitial: item.BillingInitial,
        BillingNetAmount: item.BillingNetAmount,
        //TotalBillAmount: item.TotalBillAmount,    
      };
     
  
    })
  );
  }else{
    newResultBillingInfoDto = [{
      LocalBillingCode: '',
      LocalBillingName: '',
      SimbBillingCode: '',
      PayorBillingCode: '',
      BillingInitial: '',
      BillingDiscount: '',
      BillingNetAmount: '',
    }];
  }

  const QueryCreateClaimDocumentDtoBody={
    RefId:RequesetBody.xRefId,
    TransactionNo:RequesetBody.xTransactionNo,
    InsurerCode:13, //RequesetBody.xInsurerCode,
    HN:RequesetBody.xHN,
    VN:RequesetBody.xVN,
    DocumentName:'',
    DocumenttypeCode:'',
    UploadedBy:'',
    Runningdocument:0
  }
  
  
  const getListDocumentByTransection = await this.utilsService.getListDocumentByTransactionNo(QueryCreateClaimDocumentDtoBody); 
  let newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];
   newResultAttachDocListInfoDto = await Promise.all(
    getListDocumentByTransection.map(async (doc) => {
      const EncryptDocument = await this.utilsService.EncryptAESECB(doc.Base64Data, AIA_APISecretkey);
      return {
        Base64Data: EncryptDocument,
        DocName: doc.DocName,
      };
    })
  );
  const newIsPackage =newResultVisitInfoDto.IsPackage;
  const newAnesthesiaList= [newResultVisitInfoDto.AnesthesiaList];
  const newTotalEstimatedCost =newResultVisitInfoDto.TotalEstimatedCost;
  //console.log(newResultBillingInfoDto)
  let newResultDataJsonDto =new ResultDataJsonDto();
   newResultDataJsonDto ={
    Patient :newResultPatientInfoDto,
     Visit: newResultVisitInfoDto,
     VitalSign :newResultVitalSignInfoDto,
    Diagnosis :newQueryDiagnosisInfoDto,
    AccidentDetail:newAccidentDetail,
     Procedure :newResultProcedureInfoDto,
     AnesthesiaList:newAnesthesiaList,
     IsPackage:newIsPackage,
     Investigation :newResultInvestigationInfoDto,
     OrderItem :newResultOrderItemInfoDto,
    Doctor : newResultDoctorInfoDto,
    Billing :newResultBillingInfoDto,
    TotalEstimatedCost:newTotalEstimatedCost,
    TotalBillAmount:newTotalBillAmount,
     Pss: newResultPSSInfoDto,
     PreAuthNote: newResultPreAuthNoteDto
  }
  
  const newOPDDischargeResponseDto ={
  
    RefId: RequesetBody.xRefId ,
    TransactionNo:RequesetBody.xTransactionNo, 
    Username:AIA_APIHopitalUsername,
    HospitalCode:await this.utilsService.EncryptAESECB(AIA_APIHospitalCode,AIA_APISecretkey),
    InsurerCode: RequesetBody.xInsurerCode,
    ElectronicSignature: '',
    DataJsonType: "3",
    DataJson: newResultDataJsonDto,
    AttachDocList: newResultAttachDocListInfoDto
  
  }
  //const dummyDataRequest =new DummyDataRequest1();
  //const newOPDDischargeResponseDto  =dummyDataRequest.PatientInfo
  // DummyDataRequest1
  //console.log(newOPDDischargeResponseDto.DataJson)
  
   //////////////////////////////////////
        const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
         const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
         const apiURL= `${AIA_APIURL}/SmartClaim/preauthSubmission`;
  
    const body = newOPDDischargeResponseDto
    const headers = {
     'Content-Type': API_CONTENTTYPE,
     'Ocp-Apim-Subscription-Key': AIA_APISubscription,
     'Apim-Auth-Secure-Token': ObjAccessTokenKey
   };
  
    const responsefromAIA = await lastValueFrom(
      this.httpService
        .post(apiURL, body, { headers })
        .pipe(
          map((response) => response.data), 
          catchError((error) => {
            console.error('Error from AIA API:', error.response?.data || error.message);
            throw new Error('Failed to call AIA API');
          })
        )
    );
    // console.log('------ AIA')
    // console.log(responsefromAIA)
    // console.log('------ AIA')

    const responeInputcode = responsefromAIA.Result.Code
    if (responeInputcode !=='S'){
      this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA.Result.MessageTh,responsefromAIA.Result.MessageTh)
    }else{
  
      let xInsuranceResult= new InsuranceResult();
      xInsuranceResult ={
       Code:responsefromAIA.Result.Code ||'',
       Message:responsefromAIA.Result.Message ||'',
       MessageTh:responsefromAIA.Result.MessageTh ||'',
      }
      let xInsuranceData= new InsuranceData();
  
      xInsuranceData ={
        RefId:responsefromAIA.Data.RefId ||'',
        TransactionNo:responsefromAIA.Data.TransactionNo ||'',
        InsurerCode:responsefromAIA.Data.InsurerCode ||'',
  
        Message:responsefromAIA.Data.Message ||'',
        MessageTh:responsefromAIA.Data.MessageTh ||'',
        ClaimNo:responsefromAIA.Data.ClaimNo ||'',
        OccurrenceNo:responsefromAIA.Data.OccurrenceNo ||'',
        TotalApprovedAmount:responsefromAIA.Data.TotalApprovedAmount ||'',
        TotalExcessAmount:responsefromAIA.Data.TotalExcessAmount ||'',
        IsReimbursement:Boolean(responsefromAIA.Data.IsReimbursement),
        CoverageList: responsefromAIA.Data.CoverageList 
        ? responsefromAIA.Data.CoverageList.map((Coverage) => ({
          type: Coverage.type || '',
          status: Boolean(Coverage.status), // แปลงค่าให้เป็น boolean เสมอ
        }))
      : [],
  
         MessageList: responsefromAIA.Data.MessageList 
         ? responsefromAIA.Data.MessageList.map((message) => (
          
          {
            
          policyNo: message.policyNo ?  this.utilsService.DecryptAESECB(message.policyNo, AIA_APISecretkey) :'' ,
          planName: message.planName || '',
          messageTh: message.messageTh || '',
          messageEn: message.messageEn || '',
         }))
       : [],
       }
  xResultInfo ={
      InsuranceResult: xInsuranceResult,
      InsuranceData:xInsuranceData
    } 
   /// save to database
   const existingRecord = await prismaProgest.transactionclaim.findFirst({
    where: {
      refid: RequesetBody.xRefId,
      transactionno: RequesetBody.xTransactionNo,
    },
  });
  //const effectiveDate = new Date(RequesetBody.xVisitDateTime);
  //const formattedEffectiveDate = effectiveDate.toISOString().split('T')[0];
  const formattedEffectiveDate = RequesetBody.xVisitDateTime.split(' ')[0];
  
  if (existingRecord) {
  
    await prismaProgest.transactionclaim.update({
      where: {
        id: existingRecord.id, // Use the ID of the existing record
      },
      data: {
        claimno:responsefromAIA.Data.ClaimNo,
        // claimstatuscode:'',
        // claimstatusdesc:'Approve',
        // claimstatusdesc_en:'Approve',
        // claimstatusdesc_th:'อนุมัติการเรียกร้องสินไหม',
        occurrenceno:responsefromAIA.Data.OccurrenceNo,
        invoicenumber:responsefromAIA.Data.InvoiceNumber,
        totalapprovedamount:responsefromAIA.Data.TotalApprovedAmount,
        totalexcessamount:responsefromAIA.Data.TotalExcessAmount,
        isreimbursement:responsefromAIA.Data.IsReimbursement,
        totalbillamount: newTotalBillAmount,
        insurerid: RequesetBody.xInsurerCode ,
        refid: RequesetBody.xRefId,
        transactionno: RequesetBody.xTransactionNo,
        hn:RequesetBody.xHN,
        vn:RequesetBody.xVN,
        visitdate:formattedEffectiveDate ,
        visitdatetime:RequesetBody.xVisitDateTime,
        accidentdate:RequesetBody.xAccidentDate,
        policytypecode:RequesetBody.xPolicyTypeCode,
        idtype:RequesetBody.xIdType,
        //illnesstypecode:RequesetBody.xIllnessTypeCode,
        servicesettingcode:RequesetBody.xServiceSettingCode,
        surgerytypecode:RequesetBody.xSurgeryTypeCode,
        runningdocument:RequesetBody.xRunningdocument,
        preauthreferclaimno:RequesetBody.xPreauthReferClaimNo,
        preauthreferocc:RequesetBody.xPreauthReferOcc
      },
    });
  }else{
    
    await prismaProgest.transactionclaim.create({
      data: {
        insurerid: RequesetBody.xInsurerCode ,
        refid: RequesetBody.xRefId,
        transactionno: RequesetBody.xTransactionNo,
        hn:RequesetBody.xHN,
        vn:RequesetBody.xVN,
        visitdate:formattedEffectiveDate ,
        claimno:responsefromAIA.Data.ClaimNo,
        occurrenceno:responsefromAIA.Data.OccurrenceNo,
        invoicenumber:responsefromAIA.Data.InvoiceNumber,
        totalapprovedamount:responsefromAIA.Data.TotalApprovedAmount,
        totalexcessamount:responsefromAIA.Data.TotalExcessAmount,
        isreimbursement:responsefromAIA.Data.IsReimbursement,
        visitdatetime:RequesetBody.xVisitDateTime,
        accidentdate:RequesetBody.xAccidentDate,
        policytypecode:RequesetBody.xPolicyTypeCode,
        idtype:RequesetBody.xIdType,
        //illnesstypecode:RequesetBody.xIllnessTypeCode,
        servicesettingcode:RequesetBody.xServiceSettingCode,
        surgerytypecode:RequesetBody.xSurgeryTypeCode,
        runningdocument:RequesetBody.xRunningdocument,
        preauthreferclaimno:RequesetBody.xPreauthReferClaimNo,
        preauthreferocc:RequesetBody.xPreauthReferOcc
      },
    });
  
  }
  
  
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
    let newResultSubmitIpdDischargeDto= new ResultSubmitPreAuthSubmissionDto();
    newResultSubmitIpdDischargeDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  
  return newResultSubmitIpdDischargeDto
  }catch(error)
  {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new HttpException(
       { 
        HTTPStatus: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
          error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        },
        },HttpStatus.INTERNAL_SERVER_ERROR );
    }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {  
            HTTPStatus: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
           },
          },HttpStatus.INTERNAL_SERVER_ERROR ); 
    }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
      if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to the database server. Please ensure it is running.',
          error: 'Cannot connect to the database server. Please ensure it is running.',
        },
        }, HttpStatus.SERVICE_UNAVAILABLE);
      }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data format or conversion error.',
          error: 'Invalid data format or conversion error.',
        },
        }, HttpStatus.BAD_REQUEST);
      }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
          error: 'You do not have permission to perform this action.',
        },
        }, HttpStatus.FORBIDDEN);
      }else if (error.message.includes('Unable to fit integer value')) {
        // Handle integer overflow or similar errors
        throw new HttpException({
          HTTPStatus: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The integer value is too large for the database field.',
          error: 'The integer value is too large for the database field.',
        },
        }, HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException({  
          HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: 'An unexpected error occurred.',
             error: 'An unexpected error occurred.',
            },
          },HttpStatus.INTERNAL_SERVER_ERROR,);
      }
    }
  }
  }
async SubmitPreSubmissionToAIA_OLD(querySubmitPreAuthDto:QuerySubmitPreAuthDto){
  let xResultInfo;

try{
 const RequesetBody ={
  xRefId:querySubmitPreAuthDto.PatientInfo.RefId, //'oljhnklefhbilubsEFJKLb65255555',
  xTransactionNo: querySubmitPreAuthDto.PatientInfo.TransactionNo,//'6f49b02c-4102-44e4-bd6a-c5bed5dc8b1c',
  xHN :querySubmitPreAuthDto.PatientInfo.HN ,
  xInsurerCode: querySubmitPreAuthDto.PatientInfo.InsurerCode, 
  xVN: querySubmitPreAuthDto.PatientInfo.VN ,
  xVisitDateTime :querySubmitPreAuthDto.PatientInfo.VisitDateTime,
  xAccidentDate:querySubmitPreAuthDto.PatientInfo.AccidentDate,
  xAccidentPlaceCode :querySubmitPreAuthDto.PatientInfo.AccidentPlaceCode,
  xIdType:querySubmitPreAuthDto.PatientInfo.IdType,
  xPolicyTypeCode :querySubmitPreAuthDto.PatientInfo.PolicyTypeCode,
  xServiceSettingCode:querySubmitPreAuthDto.PatientInfo.ServiceSettingCode,
  xSurgeryTypeCode:querySubmitPreAuthDto.PatientInfo.SurgeryTypeCode,
  xIllnessTypeCode:querySubmitPreAuthDto.PatientInfo.IllnessTypeCode,
  xRunningdocument:querySubmitPreAuthDto.PatientInfo.Runningdocument,
  xPreviousTreatmentDate:querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDate,
  xPreviousTreatmentDetail:querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail,
  xPreauthReferClaimNo:querySubmitPreAuthDto.PatientInfo.PreauthReferClaimNo,
  xPreauthReferOcc:querySubmitPreAuthDto.PatientInfo.PreauthReferOcc,
  xExpectedAdmitDate:querySubmitPreAuthDto.PatientInfo.ExpectedAdmitDate,
  xDxFreeText:querySubmitPreAuthDto.PatientInfo.DxFreeText,
  xDscDateTime:querySubmitPreAuthDto.PatientInfo.DscDateTime,
  xIndicationForAdmission:querySubmitPreAuthDto.PatientInfo.IndicationForAdmission,
 }
 
//--> get Patient  <--//
const getSubmitPreAuthPatient = await this.trakcareService.getOPDDischargePatient(RequesetBody.xHN);
let newResultPatientInfoDto: ResultPatientInfoDto ;
if (getSubmitPreAuthPatient && getSubmitPreAuthPatient.PatientInfo && getSubmitPreAuthPatient.PatientInfo.HN.length > 0) {
   newResultPatientInfoDto = {
      Dob: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.Dob,AIA_APISecretkey) ,
      Hn: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.HN,AIA_APISecretkey) ,
      Gender: getSubmitPreAuthPatient.PatientInfo.Gender
 };
}else{
   newResultPatientInfoDto = {
    Dob:'',
    Hn:'',
    Gender:''
  };
}

// //--> get Visit  <--//
const whereConditionsGetVisit = {
  ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
  ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
  ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
};
const existingVisitRecord = await prismaProgest.medicaltransactions.findFirst({
where: whereConditionsGetVisit
});
let newResultVisitInfoDto = new ResultVisitInfoDto()
if (existingVisitRecord){
  const newQueryVisitDatabaseBodyDto ={
    RefId: RequesetBody.xRefId,
    TransactionNo: RequesetBody.xTransactionNo,
    InsurerCode:RequesetBody.xInsurerCode,
    HN: RequesetBody.xHN,
    VN: RequesetBody.xVN,
  }
  const getvisitformDatabase = await this.utilsService.getvisitIPDformDatabase(newQueryVisitDatabaseBodyDto)
   newResultVisitInfoDto= {
    AccidentDate:getvisitformDatabase.Result.VisitInfo.AccidentDate,
    AdmitDateTime:getvisitformDatabase.Result.VisitInfo.VisitDateTime,
    AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote||'',
    AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated||false,
    An:  await this.utilsService.EncryptAESECB( getvisitformDatabase.Result.VisitInfo.VN,AIA_APISecretkey) ,
    ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint||'',
    ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore||'',
    DscDateTime:getvisitformDatabase.Result.VisitInfo.DscDateTime,
    DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText||'',
    ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery||'',
    ExpectedLos:null,
    ExpectedAdmitDate:getvisitformDatabase.Result.VisitInfo.ExpectedAdmitDate,
    Height: getvisitformDatabase.Result.VisitInfo.Height||'',
    IndicationForAdmission:getvisitformDatabase.Result.VisitInfo.IndicationForAdmission,
    PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam||'',
    PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment||'',
    Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant||false,
    PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness||'',
    PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate||'',
    PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail||'',
    PreauthReferClaimNo:getvisitformDatabase.Result.VisitInfo.PreauthReferClaimNo,
    PreauthReferOcc: getvisitformDatabase.Result.VisitInfo.PreauthReferOcc,
    PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase||false,
    SignSymptomsDate:getvisitformDatabase.Result.VisitInfo.SignSymptomsDate|| '',
    UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition||'',
    VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
    VisitDate:getvisitformDatabase.Result.VisitInfo.VisitDateTime.split(' ')[0],
    Vn:  await this.utilsService.EncryptAESECB( getvisitformDatabase.Result.VisitInfo.VN,AIA_APISecretkey) ,
    AnesthesiaList :getvisitformDatabase.Result.VisitInfo.AnesthesiaList,
    Weight: getvisitformDatabase.Result.VisitInfo.Weight||'',
    TotalEstimatedCost :getvisitformDatabase.Result.VisitInfo.TotalEstimatedCost,
    IsPackage :getvisitformDatabase.Result.VisitInfo.IsPackage
  }
}else{
  let VNForVisitinfo ;
 
  const getIPDDischargeVisit = await this.trakcareService.getIPDVisit(VNForVisitinfo);
  newResultVisitInfoDto= {
    AccidentDate: getIPDDischargeVisit.VisitInfo.AccidentDate,
    AdmitDateTime: getIPDDischargeVisit.VisitInfo.VisitDateTime,
    AdditionalNote: getIPDDischargeVisit.VisitInfo.AdditionalNote,
    AlcoholRelated: getIPDDischargeVisit.VisitInfo.AlcoholRelated,
    An:  await this.utilsService.EncryptAESECB( getIPDDischargeVisit.VisitInfo.vn,AIA_APISecretkey) ,
    ChiefComplaint: getIPDDischargeVisit.VisitInfo.ChiefComplaint,
    ComaScore: getIPDDischargeVisit.VisitInfo.ComaScore,
    DscDateTime: getIPDDischargeVisit.VisitInfo.DscDateTime,
    DxFreeText: getIPDDischargeVisit.VisitInfo.DxFreeText,
    ExpectedDayOfRecovery: '',
    ExpectedLos:null,
    ExpectedAdmitDate:getIPDDischargeVisit.VisitInfo.ExpectedAdmitDate,
    Height: '',
    IndicationForAdmission:RequesetBody.xIndicationForAdmission,
    PhysicalExam: '',
    PlanOfTreatment: '',
    Pregnant: getIPDDischargeVisit.VisitInfo.Pregnant,
    PresentIllness: '',
    PreviousTreatmentDate: '',
    PreviousTreatmentDetail: '',
    PreauthReferClaimNo:RequesetBody.xPreauthReferClaimNo||'',
    PreauthReferOcc:RequesetBody.xPreauthReferOcc||'',
    PrivateCase: getIPDDischargeVisit.VisitInfo.PrivateCase,
    SignSymptomsDate: '',
    UnderlyingCondition: '',
    VisitDateTime: getIPDDischargeVisit.VisitInfo.VisitDateTime,
    VisitDate:getIPDDischargeVisit.VisitInfo.VisitDateTime.split(' ')[0],
    Vn:  await this.utilsService.EncryptAESECB( getIPDDischargeVisit.VisitInfo.vn ,AIA_APISecretkey) ,
    Weight: '',
    AnesthesiaList:'',
    TotalEstimatedCost:'',
    IsPackage:null
  }
}

 newResultVisitInfoDto.ExpectedLos = this.calculateDaysBetweenDates(newResultVisitInfoDto.VisitDateTime, newResultVisitInfoDto.DscDateTime);

// //--> get VitalSignIn  <--//
let newResultVitalSignInfoDto: ResultVitalSignInfoDto[] = [];
newResultVitalSignInfoDto = [{
  DiastolicBp: '',
  HeartRate: '',
  OxygenSaturation: '',
  PainScore: '',
  RespiratoryRate: '',
  SystolicBp: '',
  Temperature: '',
  VitalSignEntryDateTime: '',
  
}];
// //--> get Diagnosis  <--//

let newQueryDiagnosisInfoDto: ResultDiagnosisInfoDto[] = [];
const newQueryPreDiagnosisDatabaseBodyDto ={
  RefId:RequesetBody.xRefId,
  TransactionNo:RequesetBody.xTransactionNo,
  InsurerCode:RequesetBody.xInsurerCode,
  HN:RequesetBody.xHN,
  VN:RequesetBody.xVN
}
const getDiagnosisformDatabase = await this.utilsService.getDiagnosisformDatabase(newQueryPreDiagnosisDatabaseBodyDto)
if (getDiagnosisformDatabase && getDiagnosisformDatabase.Result.DiagnosisInfo && getDiagnosisformDatabase.Result.DiagnosisInfo.length > 0) {
  newQueryDiagnosisInfoDto= await Promise.all(
    getDiagnosisformDatabase.Result.DiagnosisInfo.map(async (item) => {
    return {
      Icd10: item.Icd10,
      DxName: item.DxName,
      DxType: 'OT',
      
    };
  })
);

}else{
  newQueryDiagnosisInfoDto = [{
    DxName: '',
    DxType: '',
    Icd10: '',
  }];
}

let newAccidentDetail ; //= new ResultAccidentDetailDto();
if ((RequesetBody.xIllnessTypeCode='ACC')||(RequesetBody.xIllnessTypeCode='ER')){

  let newQueryAccidentDatabaseBodyDto = new QueryAccidentDatabaseBodyDto();
newQueryAccidentDatabaseBodyDto ={
  RefId: RequesetBody.xRefId,
  TransactionNo: RequesetBody.xTransactionNo,
  InsurerCode:RequesetBody.xInsurerCode,
  HN: RequesetBody.xHN,
  VN: RequesetBody.xVN,
}
const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
const accidentDetailInfo = new AccidentDetailDto();
accidentDetailInfo.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
accidentDetailInfo.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';

if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
  accidentDetailInfo.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
    const causeDetail = new CauseOfInjuryDetail();

      causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
      causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
      return causeDetail;
  });
} 
if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
  accidentDetailInfo.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
    const injuryDetail = new InjuryDetail();

      injuryDetail.WoundType = injury.WoundType || '';
      injuryDetail.InjurySide = injury.InjurySide || '';
      injuryDetail.InjuryArea = injury.InjuryArea || '';
      return injuryDetail;
  });
}
 newAccidentDetail = {    
  AccidentPlace: accidentDetailInfo.AccidentPlace,
  AccidentDate: accidentDetailInfo.AccidentDate,
  CauseOfInjuryDetail: accidentDetailInfo.CauseOfInjuryDetail,
  InjuryDetail: accidentDetailInfo.InjuryDetail
};

}else{
  newAccidentDetail= {
    "AccidentPlace": '',
    "AccidentDate": '',
    "CauseOfInjuryDetail": [
        {
            "CauseOfInjury": '',
            "CommentOfInjury": ''
        }
    ],
    "InjuryDetail": [
        {
            "WoundType": "",
            "InjurySide": "",
            "InjuryArea":''
        }
    ]
}
}
// console.log(newAccidentDetail)


let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];

 // console.log('old procedure')
  // RequesetBody.xRefId  ='ccXwZWYmukJdvzFrWaccN8bNr83caECQjC+vvuEaIKY=';
  // RequesetBody.xTransactionNo  ='5c5aabb3-b919-4ee8-ac42-848ae4d5f55a';
  // RequesetBody.xVN ='O415202-67'
  const newQueryProcedeureDatabaseBodyDto ={
    RefId:RequesetBody.xRefId,
    TransactionNo:RequesetBody.xTransactionNo,
    InsurerCode:RequesetBody.xInsurerCode,
    HN:RequesetBody.xHN,
    VN:RequesetBody.xVN
  }
 
   const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto)
  // console.log('33333')
  if (getIPDDischargeProcedure && getIPDDischargeProcedure.Result.ProcedureInfo && getIPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
     newResultProcedureInfoDto= await Promise.all(
      getIPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
      return {
        Icd9: item.Icd9,
        ProcedureName: item.ProcedureName,
        ProcedureDate: item.ProcedureDate,
        
      };
    })
  );
} else {
 // console.log('4444')
  newResultProcedureInfoDto = [{
    Icd9: '',
    ProcedureName: '',
    ProcedureDate: '',
  }];
}


// console.log('*******')
// console.log(getOPDDischargeProcedure.Result)
// console.log('*******')
 //getOPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 


// //--> get Investigation  <--//
let newResultInvestigationInfoDto: ResultInvestigationInfoDto[] = [];
newResultInvestigationInfoDto = [{
  InvestigationCode: '',
  InvestigationGroup: '',
  InvestigationName: '',
  InvestigationResult: '',
  ResultDateTime: ''
}];
// //--> get OrderItem  <--//
let newResultOrderItemInfoDto : ResultOrderItemInfoDto[] = [];
newResultOrderItemInfoDto = [{

  ItemId: '',
  ItemName: '',
  ItemAmount: '',
  Discount: '',
  Initial: '',
  LocalBillingCode: '',
  LocalBillingName: '',
  Location: '',
  NetAmount: '',
  SimbVersion: '',
  Terminology: ''
}];
// //--> get Doctor  <--//
let newResultDoctorInfoDto: ResultDoctorInfoDto[] = [];
newResultDoctorInfoDto = [{
  DoctorLicense: '0000000000',
  DoctorRole: '',
  DoctorFirstName: '',
  DoctorLastName: '',

}];
// //console.log(newResultDoctorInfoDto)
//  // ResultBillingInfoDto ,ResultTotalBillAmountInfoDto
// //--> get Billing  <--//
/*
const getOPDDischargeBilling = [] //await this.trakcareService.getIPDBilling(RequesetBody.xVN); 
let newResultBillingInfoDto : ResultBillingInfoDto[] = [];
let  newTotalBillAmount ;
   if (getOPDDischargeBilling && getOPDDischargeBilling.BillingInfo && getOPDDischargeBilling.BillingInfo.length > 0) {
       newTotalBillAmount = getOPDDischargeBilling.TotalBillAmount
       console.log('----- newTotalBillAmount')
      // console.log(newTotalBillAmount)
      newResultBillingInfoDto= await Promise.all(
      getOPDDischargeBilling.BillingInfo.map(async (item) => {
      return {
        LocalBillingCode: item.LocalBillingCode,
        LocalBillingName: item.LocalBillingName,
        SimbBillingCode: item.SimbBillingCode,
        PayorBillingCode: item.PayorBillingCode,
        BillingInitial: item.BillingInitial,
        BillingDiscount: item.BillingDiscount,
        BillingNetAmount: item.BillingNetAmount,
      };
    })
  );
} else {
  newResultBillingInfoDto = [{

    LocalBillingCode: '',
    LocalBillingName: '',
    SimbBillingCode: '',
    PayorBillingCode: '',
    BillingInitial: '',
    BillingDiscount: '',
    BillingNetAmount: '',
   
  }];
  newTotalBillAmount=0
}
newResultBillingInfoDto = [{

  LocalBillingCode: '2.1.1',
  LocalBillingName: 'ค่าห้องผู้ป่วยใน',
  SimbBillingCode: '2.1.1',
  PayorBillingCode: '2.1.1',
  BillingInitial: '10000',
  BillingDiscount: '8000',
  BillingNetAmount: '2000',
 
}];
*/
// const newQueryPreBillingDatabaseBodyDto ={
//   RefId:RequesetBody.xRefId,
//   TransactionNo:RequesetBody.xTransactionNo,
//   InsurerCode:RequesetBody.xInsurerCode,
//   HN:RequesetBody.xHN,
//   VN:RequesetBody.xVN
// }

// const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryPreBillingDatabaseBodyDto)
/*const newResultBillingInfoDto = [{

  LocalBillingCode: '2.1.1',
  LocalBillingName: 'ค่าห้องผู้ป่วยใน',
  SimbBillingCode: '2.1.1',
  PayorBillingCode: '2.1.1',
  BillingInitial: '10000',
  BillingDiscount: '8000',
  BillingNetAmount: '2000',
 
}]; */

let newTotalBillAmount =''



let newResultBillingInfoDto : ResultBillingInfoDto[] = [];
const newQueryBillingInfoDtoDatabaseBodyDto ={
  RefId:RequesetBody.xRefId,
  TransactionNo:RequesetBody.xTransactionNo,
  InsurerCode:RequesetBody.xInsurerCode,
  HN:RequesetBody.xHN,
  VN:RequesetBody.xVN
}
const getPreBillingformDatabase = await this.utilsService.getPreBillingformDatabase(newQueryBillingInfoDtoDatabaseBodyDto)

if (getPreBillingformDatabase && getPreBillingformDatabase.Result.PreBillingInfo && getPreBillingformDatabase.Result.PreBillingInfo.length > 0) {
  newResultBillingInfoDto= await Promise.all(
    getPreBillingformDatabase.Result.PreBillingInfo.map(async (item) => {
      newTotalBillAmount = item.TotalBillAmount     
    return {
      LocalBillingCode: item.LocalBillingCode,
      LocalBillingName: item.LocalBillingName,
      SimbBillingCode: item.SimbBillingCode,
      PayorBillingCode: item.PayorBillingCode,
      BillingDiscount: item.BillingDiscount,
      BillingInitial: item.BillingInitial,
      BillingNetAmount: item.BillingNetAmount,
      //TotalBillAmount: item.TotalBillAmount,    
    };
   

  })
);
}else{
  newResultBillingInfoDto = [{
    LocalBillingCode: '',
    LocalBillingName: '',
    SimbBillingCode: '',
    PayorBillingCode: '',
    BillingInitial: '',
    BillingDiscount: '',
    BillingNetAmount: '',
  }];
}
//  //  
//--> get PSS  Fixed<--//
const  newResultPSSInfoDto={
  "Exclusion": "0",
  "FinalScore": "0",
  "Findings": [
    {
      "Description": "0",
      "Exclusion": "0",
      "Medical": "0",
      "Reference": "0"
    }
  ],
  "Id": "0",
  "Medical": "0"
}


let newResultPreAuthNoteDto: ResultPreAuthNoteDto[] = [];
newResultPreAuthNoteDto = [{
  PreAuthDatetime: '',
  PreAuthDetail: '',
 
}];
// //--> get AttachDocList  <--//
// console.log('------')

const QueryCreateClaimDocumentDtoBody={
  RefId:RequesetBody.xRefId,
  TransactionNo:RequesetBody.xTransactionNo,
  InsurerCode:13, //RequesetBody.xInsurerCode,
  HN:RequesetBody.xHN,
  VN:RequesetBody.xVN,
  DocumentName:'',
  DocumenttypeCode:'',
  UploadedBy:'',
  Runningdocument:0
}


const getListDocumentByTransection = await this.utilsService.getListDocumentByTransactionNo(QueryCreateClaimDocumentDtoBody); 
let newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];
 newResultAttachDocListInfoDto = await Promise.all(
  getListDocumentByTransection.map(async (doc) => {
    const EncryptDocument = await this.utilsService.EncryptAESECB(doc.Base64Data, AIA_APISecretkey);
    return {
      Base64Data: EncryptDocument,
      DocName: doc.DocName,
    };
  })
);
const newIsPackage =newResultVisitInfoDto.IsPackage;
const newAnesthesiaList= [newResultVisitInfoDto.AnesthesiaList];
const newTotalEstimatedCost =newResultVisitInfoDto.TotalEstimatedCost;
//console.log(newResultBillingInfoDto)
let newResultDataJsonDto =new ResultDataJsonDto();
 newResultDataJsonDto ={
  Patient :newResultPatientInfoDto,
   Visit: newResultVisitInfoDto,
   VitalSign :newResultVitalSignInfoDto,
  Diagnosis :newQueryDiagnosisInfoDto,
  AccidentDetail:newAccidentDetail,
   Procedure :newResultProcedureInfoDto,
   AnesthesiaList:newAnesthesiaList,
   IsPackage:newIsPackage,
   Investigation :newResultInvestigationInfoDto,
   OrderItem :newResultOrderItemInfoDto,
  Doctor : newResultDoctorInfoDto,
  Billing :newResultBillingInfoDto,
  TotalEstimatedCost:newTotalEstimatedCost,
  TotalBillAmount:newTotalBillAmount,
   Pss: newResultPSSInfoDto,
   PreAuthNote: newResultPreAuthNoteDto
}

const newOPDDischargeResponseDto ={

  RefId: RequesetBody.xRefId ,
  TransactionNo:RequesetBody.xTransactionNo, 
  Username:AIA_APIHopitalUsername,
  HospitalCode:await this.utilsService.EncryptAESECB(AIA_APIHospitalCode,AIA_APISecretkey),
  InsurerCode: RequesetBody.xInsurerCode,
  ElectronicSignature: '',
  DataJsonType: "3",
  DataJson: newResultDataJsonDto,
  AttachDocList: newResultAttachDocListInfoDto

}
//const dummyDataRequest =new DummyDataRequest1();
//const newOPDDischargeResponseDto  =dummyDataRequest.PatientInfo
// DummyDataRequest1
// console.log('=++++++++++=')
// console.log(newOPDDischargeResponseDto.DataJson)
// console.log('=++++++++++=')

 //////////////////////////////////////
      const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       const apiURL= `${AIA_APIURL}/SmartClaim/preauthSubmission`;

  const body = newOPDDischargeResponseDto
  const headers = {
   'Content-Type': API_CONTENTTYPE,
   'Ocp-Apim-Subscription-Key': AIA_APISubscription,
   'Apim-Auth-Secure-Token': ObjAccessTokenKey
 };

  const responsefromAIA = await lastValueFrom(
    this.httpService
      .post(apiURL, body, { headers })
      .pipe(
        map((response) => response.data), 
        catchError((error) => {
          console.error('Error from AIA API:', error.response?.data || error.message);
          throw new Error('Failed to call AIA API');
        })
      )
  );
  // console.log(responsefromAIA)

  const responeInputcode = responsefromAIA.Result.Code
  if (responeInputcode !=='S'){
    this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA.Result.MessageTh,responsefromAIA.Result.MessageTh)
  }else{

    let xInsuranceResult= new InsuranceResult();
    xInsuranceResult ={
     Code:responsefromAIA.Result.Code ||'',
     Message:responsefromAIA.Result.Message ||'',
     MessageTh:responsefromAIA.Result.MessageTh ||'',
    }
    let xInsuranceData= new InsuranceData();

    xInsuranceData ={
      RefId:responsefromAIA.Data.RefId ||'',
      TransactionNo:responsefromAIA.Data.TransactionNo ||'',
      InsurerCode:responsefromAIA.Data.InsurerCode ||'',

      Message:responsefromAIA.Data.Message ||'',
      MessageTh:responsefromAIA.Data.MessageTh ||'',
      ClaimNo:responsefromAIA.Data.ClaimNo ||'',
      OccurrenceNo:responsefromAIA.Data.OccurrenceNo ||'',
      TotalApprovedAmount:responsefromAIA.Data.TotalApprovedAmount ||'',
      TotalExcessAmount:responsefromAIA.Data.TotalExcessAmount ||'',
      IsReimbursement:Boolean(responsefromAIA.Data.IsReimbursement),
      CoverageList: responsefromAIA.Data.CoverageList 
      ? responsefromAIA.Data.CoverageList.map((Coverage) => ({
        type: Coverage.type || '',
        status: Boolean(Coverage.status), // แปลงค่าให้เป็น boolean เสมอ
      }))
    : [],

       MessageList: responsefromAIA.Data.MessageList 
       ? responsefromAIA.Data.MessageList.map((message) => (
        
        {
          
        policyNo: message.policyNo ?  this.utilsService.DecryptAESECB(message.policyNo, AIA_APISecretkey) :'' ,
        planName: message.planName || '',
        messageTh: message.messageTh || '',
        messageEn: message.messageEn || '',
       }))
     : [],
     }
xResultInfo ={
    InsuranceResult: xInsuranceResult,
    InsuranceData:xInsuranceData
  } 
 /// save to database
 const existingRecord = await prismaProgest.transactionclaim.findFirst({
  where: {
    refid: RequesetBody.xRefId,
    transactionno: RequesetBody.xTransactionNo,
  },
});
//const effectiveDate = new Date(RequesetBody.xVisitDateTime);
//const formattedEffectiveDate = effectiveDate.toISOString().split('T')[0];
const formattedEffectiveDate = RequesetBody.xVisitDateTime.split(' ')[0];

if (existingRecord) {

  await prismaProgest.transactionclaim.update({
    where: {
      id: existingRecord.id, // Use the ID of the existing record
    },
    data: {
      claimno:responsefromAIA.Data.ClaimNo,
      // claimstatuscode:'',
      // claimstatusdesc:'Approve',
      // claimstatusdesc_en:'Approve',
      // claimstatusdesc_th:'อนุมัติการเรียกร้องสินไหม',
      occurrenceno:responsefromAIA.Data.OccurrenceNo,
      invoicenumber:responsefromAIA.Data.InvoiceNumber,
      totalapprovedamount:responsefromAIA.Data.TotalApprovedAmount,
      totalexcessamount:responsefromAIA.Data.TotalExcessAmount,
      isreimbursement:responsefromAIA.Data.IsReimbursement,
      totalbillamount: newTotalBillAmount,
      insurerid: RequesetBody.xInsurerCode ,
      refid: RequesetBody.xRefId,
      transactionno: RequesetBody.xTransactionNo,
      hn:RequesetBody.xHN,
      vn:RequesetBody.xVN,
      visitdate:formattedEffectiveDate ,
      visitdatetime:RequesetBody.xVisitDateTime,
      accidentdate:RequesetBody.xAccidentDate,
      policytypecode:RequesetBody.xPolicyTypeCode,
      idtype:RequesetBody.xIdType,
      //illnesstypecode:RequesetBody.xIllnessTypeCode,
      servicesettingcode:RequesetBody.xServiceSettingCode,
      surgerytypecode:RequesetBody.xSurgeryTypeCode,
      runningdocument:RequesetBody.xRunningdocument
    },
  });
}else{
  
  await prismaProgest.transactionclaim.create({
    data: {
      insurerid: RequesetBody.xInsurerCode ,
      refid: RequesetBody.xRefId,
      transactionno: RequesetBody.xTransactionNo,
      hn:RequesetBody.xHN,
      vn:RequesetBody.xVN,
      visitdate:formattedEffectiveDate ,
      claimno:responsefromAIA.Data.ClaimNo,
      occurrenceno:responsefromAIA.Data.OccurrenceNo,
      invoicenumber:responsefromAIA.Data.InvoiceNumber,
      totalapprovedamount:responsefromAIA.Data.TotalApprovedAmount,
      totalexcessamount:responsefromAIA.Data.TotalExcessAmount,
      isreimbursement:responsefromAIA.Data.IsReimbursement,
      visitdatetime:RequesetBody.xVisitDateTime,
      accidentdate:RequesetBody.xAccidentDate,
      policytypecode:RequesetBody.xPolicyTypeCode,
      idtype:RequesetBody.xIdType,
      //illnesstypecode:RequesetBody.xIllnessTypeCode,
      servicesettingcode:RequesetBody.xServiceSettingCode,
      surgerytypecode:RequesetBody.xSurgeryTypeCode,
      runningdocument:RequesetBody.xRunningdocument
    },
  });

}


  this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }
  let newResultSubmitIpdDischargeDto= new ResultSubmitPreAuthSubmissionDto();
  newResultSubmitIpdDischargeDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultSubmitIpdDischargeDto
}catch(error)
{
  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new HttpException(
     { 
      HTTPStatus: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
      },
      },HttpStatus.INTERNAL_SERVER_ERROR );
  }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new HttpException(
        {  
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
         },
        },HttpStatus.INTERNAL_SERVER_ERROR ); 
  }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
    if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Cannot connect to the database server. Please ensure it is running.',
        error: 'Cannot connect to the database server. Please ensure it is running.',
      },
      }, HttpStatus.SERVICE_UNAVAILABLE);
    }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid data format or conversion error.',
        error: 'Invalid data format or conversion error.',
      },
      }, HttpStatus.BAD_REQUEST);
    }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to perform this action.',
        error: 'You do not have permission to perform this action.',
      },
      }, HttpStatus.FORBIDDEN);
    }else if (error.message.includes('Unable to fit integer value')) {
      // Handle integer overflow or similar errors
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The integer value is too large for the database field.',
        error: 'The integer value is too large for the database field.',
      },
      }, HttpStatus.BAD_REQUEST);
    }
    else{
      throw new HttpException({  
        HTTPStatus: {
           statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
           message: 'An unexpected error occurred.',
           error: 'An unexpected error occurred.',
          },
        },HttpStatus.INTERNAL_SERVER_ERROR,);
    }
  }
}
}
 async checkeligiblePreAdmission(queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
    let RequesetBody ,PreauthInfo ,xResultInfo;
     try{
       RequesetBody ={

         xRefID:queryPreauthSubmissionDto.PatientInfo.RefId||'',
         xTransactionNo:queryPreauthSubmissionDto.PatientInfo.TransactionNo||'',
         xInsurerCode:queryPreauthSubmissionDto.PatientInfo.InsurerCode,
         xHN :queryPreauthSubmissionDto.PatientInfo.HN||'',
         xVN: queryPreauthSubmissionDto.PatientInfo.VN||'',
         xPID: queryPreauthSubmissionDto.PatientInfo.PID||'',
         xPassportnumber:queryPreauthSubmissionDto.PatientInfo.PassportNumber||'',
         xGivenNameTH : queryPreauthSubmissionDto.PatientInfo.GivenNameTH||'',
         xSurnameTH : queryPreauthSubmissionDto.PatientInfo.SurnameTH||'',
         xDateOfBirth :queryPreauthSubmissionDto.PatientInfo.DateOfBirth||''

       }
       const existingRecord = await prismaProgest.transactionclaim.findFirst({
        where: {
          refid: RequesetBody.xRefId,
          transactionno: RequesetBody.xTransactionNo,
        },
      });
      if (existingRecord){
         PreauthInfo = {
          xTransactionno :existingRecord.transactionno,
          xRefid :existingRecord.refid,
          xHN:existingRecord.hn,
          xVN:existingRecord.vn,
          xVisitDate:existingRecord.visitdate,
          xVisitDateTime:existingRecord.visitdatetime,
          xAccidentDate:existingRecord.accidentdate,
          xPolicyTypeCode:existingRecord.policytypecode,
          xSurgeryTypeCode:existingRecord.surgerytypecode,
          xIdType:existingRecord.idtype,
          xMembershipid:existingRecord.membershipid,
          xPolicynumber:existingRecord.policynumber,
          xCustomerid:existingRecord.customerid,
          xIllnessTypeCode:existingRecord.illnesstypecode,
          xPreauthReferClaimno:existingRecord.preauthreferclaimno,
          xPreauthReferOCC:existingRecord.preauthreferocc,
          xServiceSettingCode:"IPD",
          xInsurerCode:13,
          xClaimno:existingRecord.claimno,
          xOccurrenceno:existingRecord.occurrenceno
        }
      //  console.log('-----1----')
      //  console.log(RequesetBody)
      //  console.log('---------')
      //  console.log('---------'+PreauthInfo.xClaimno)

       
      //  console.log(PreauthInfo)
        const xRefId= await this.checkEligibleService.generateRefId('PRE'+PreauthInfo.xVN,PreauthInfo.xInsurerCode,PreauthInfo.xServiceSettingCode)
        const xUsername=AIA_APIHopitalUsername;
        const xHospitalCode =await this.utilsService.EncryptAESECB(AIA_APIHospitalCode,AIA_APISecretkey);
        const xInsurerCode=RequesetBody.xInsurerCode;
        const xElectronicSignature='';
        const xDataJsonType =3;
        let DataJson_Id;
        // console.log('-----2---')

        const xDataJson_IdType =PreauthInfo.xIdType

       if (xDataJson_IdType==='NATIONAL_ID'){DataJson_Id =RequesetBody.xPID;}
       else if (xDataJson_IdType==='PASSPORT'){DataJson_Id =RequesetBody.xPassportnumber;}
       else if (xDataJson_IdType==='MEMBERSHIP_ID'){DataJson_Id =PreauthInfo.xMembershipid;}
       else if (xDataJson_IdType==='POLICY_NUMBER'){DataJson_Id =PreauthInfo.xPolicynumber;}
       else if (xDataJson_IdType==='CUSTOMER_ID'){DataJson_Id =PreauthInfo.xCustomerid;}
       else{DataJson_Id =RequesetBody.xPID;}
       
      //  console.log('-----3----')

        const xDataJson_Id =await this.utilsService.EncryptAESECB(DataJson_Id,AIA_APISecretkey);
        const xPolicyType =PreauthInfo.xPolicyTypeCode;
        const xServiceSetting =PreauthInfo.xServiceSettingCode;
        const xIllnessType =PreauthInfo.xIllnessTypeCode;
        const xSurgeryType =PreauthInfo.xSurgeryTypeCode;
        let xFirstName =RequesetBody.xGivenNameTH;
        if (xFirstName){ xFirstName =await this.utilsService.EncryptAESECB(xFirstName,AIA_APISecretkey);}
        let xLastName =RequesetBody.xSurnameTH;
        if (xLastName){ xLastName =await this.utilsService.EncryptAESECB(xLastName,AIA_APISecretkey);}
        let xDob =RequesetBody.xDateOfBirth;
        if (xDob){ xDob =await this.utilsService.EncryptAESECB(xDob,AIA_APISecretkey);}
        const xVisitDateTime =PreauthInfo.xVisitDateTime||''; 
        const xAccidentDate=PreauthInfo.xAccidentDate||'';
        // console.log('-----4----')

          
   const body_DataJson = {
    IdType: xDataJson_IdType, 
    Id:  xDataJson_Id, 
    PolicyType: xPolicyType,
    ServiceSetting: xServiceSetting,
    IllnessType: xIllnessType,
    SurgeryType: xSurgeryType,
    Patient: {
      FirstName:xFirstName,  
      LastName: xLastName, 
      Dob: xDob,
      },
      Visit: {
        VisitDateTime: xVisitDateTime ,
        AccidentDate:xAccidentDate||''
      }
    }
    const body = {
      RefId: xRefId,
      Username: xUsername,
      HospitalCode: xHospitalCode,
      InsurerCode: xInsurerCode,
      ElectronicSignature: xElectronicSignature,
      DataJsonType: xDataJsonType,
      DataJson: body_DataJson
    };
    const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
    const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
    const apiURL= `${AIA_APIURL}/SmartClaim/checkEligible`;
    const headers = {
      'Content-Type':API_CONTENTTYPE,
      'Ocp-Apim-Subscription-Key': AIA_APISubscription,
      'Apim-Auth-Secure-Token': ObjAccessTokenKey
    };
    const responsefromAIA = await lastValueFrom(
      this.httpService.post(apiURL, body, { headers })
    );

  // console.log(responsefromAIA.data.Result)
  /*
  {
  Code: 'compare.date.before',
  Message: 'IncurredDate must be before or the same as SubmissionDate',
  MessageTh: 'IncurredDate จะต้องเกิดขึ้นก่อน หรือเป็นวันเดียวกันกับ SubmissionDate'
}
  */
  

    const responeInputcode =responsefromAIA.data.Result.Code
    if (responeInputcode !=='S'){


      this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA.data.Result.MessageTh,responsefromAIA.data.Result.MessageTh)
      // console.log(newHttpMessageDto)
      //return newHttpMessageDto
      // let newResultCheckeligiblePreAdmissionDto= new ResultCheckeligiblePreAdmissionDto();
      // newResultCheckeligiblePreAdmissionDto={
      //   HTTPStatus:newHttpMessageDto,
      //   Result:xResultInfo
      // }
      // console.log('-----5 end result error ----')

      // return newResultCheckeligiblePreAdmissionDto
    }else{
      // console.log('-----5 result no error ----')

      let xInsuranceResult= new InsuranceResult();
      xInsuranceResult ={
       Code:responsefromAIA.data.Result.Code ||'',
       Message:responsefromAIA.data.Result.Message ||'',
       MessageTh:responsefromAIA.data.Result.MessageTh ||'',
      }
      // console.log(xInsuranceResult)
      const xMessageList: MessageList[] = responsefromAIA.data.Data.CoverageList ? responsefromAIA.data.Data.CoverageList.flatMap((coverageItem) => {
        return coverageItem.MessageList.map((item) => {
         const decryptedPolicyNo = this.utilsService.DecryptAESECB(item.PolicyNo, AIA_APISecretkey) || '';
           return {
             PolicyNo: decryptedPolicyNo, 
             PlanName: item.PlanName,
             MessageTh: item.MessageTh,
             MessageEn: item.MessageEn,
             RuleNo: item.RuleNo
          };
        });
      }):[];
     //console.log(xMessageList)
      //console.log("xCoverageList")
      const xCoverageList: CoverageList[] = responsefromAIA.data.Data.CoverageList ? responsefromAIA.data.Data.CoverageList.map((item) => {
       const convertCoverageType =this.checkEligibleService.convertCoverageListType(item.Type)
       return {
          Type: convertCoverageType,  
          Status:item.Status,
          MessageList: Array.isArray(xMessageList) ? xMessageList : [] , 
        };
      }):[];
      //console.log(xCoverageList)
      //console.log("xPolicyInfoList")
      const xPolicyInfoList: PolicyInfoList[] = responsefromAIA.data.Data.PolicyInfoList  ?  responsefromAIA.data.Data.PolicyInfoList.map((item) => {
         const decryptedPolicyNo = this.utilsService.DecryptAESECB(item.PolicyNo, AIA_APISecretkey) || '';
         const decryptedMembershipNo = this.utilsService.DecryptAESECB(item.MembershipNo, AIA_APISecretkey) || '';
         const effectiveDate = new Date(item.EffectiveDate);
         const formattedEffectiveDate = effectiveDate.toISOString().split('T')[0];
       return {
         PolicyNo: decryptedPolicyNo,
         MembershipNo: decryptedMembershipNo,
         PolicyDescription: item.PolicyDescription,  
         EffectiveDate: formattedEffectiveDate,
         Remark1: item.Remark1,  
         Remark2:item.Remark2,
         SpecialRemark1: item.SpecialRemark1,  
         SpecialRemark2:item.SpecialRemark2
        };
      }):[];
      // console.log('------responsefromAIA -----')

      // console.log(responsefromAIA.data.Data)
      let xInsuranceData = new InsuranceEligibleData();
      xInsuranceData={
       RefId:responsefromAIA.data.Data.RefId ||'',
       TransactionNo:responsefromAIA.data.Data.TransactionNo ||'',
       InsurerCode:responsefromAIA.data.Data.InsurerCode ||'',
       CoverageClaimStatus:Boolean(responsefromAIA.data.Data.CoverageClaimStatus) ||false,
       RemarkList:[],
       PolicyCoverageDesc:[],
       CoverageList:Array.isArray(xCoverageList) ? xCoverageList : [] ,
       PolicyInfoList: Array.isArray(xPolicyInfoList) ? xPolicyInfoList : [] 
      }
      // console.log('---------- -----')

      // console.log(xInsuranceData)
      // console.log('------xInsuranceData -----')
     let xinsuranceCustomerDetail = new InsuranceCustomerDetail();
       xinsuranceCustomerDetail={
         PolicyNo: await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.PolicyNo,AIA_APISecretkey) ||'',
         MemberShipId:await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.MemberShipId,AIA_APISecretkey) ||'', //responsefromAIA.data.CustomerDetail.MemberShipId ||'',
         FirstName:await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.FirstName,AIA_APISecretkey) ||'', //responsefromAIA.data.CustomerDetail.FirstName ||'',
         LastName:await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.LastName,AIA_APISecretkey) ||'', //responsefromAIA.data.CustomerDetail.LastName ||'',
         NationalId:await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.NationalId,AIA_APISecretkey) ||'', //responsefromAIA.data.CustomerDetail.NationalId ||''
     
       }
        xResultInfo ={
         InsuranceResult: xInsuranceResult,
         InsuranceData: xInsuranceData,
         InsuranceCustomerDetail :  xinsuranceCustomerDetail
       } 
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     
       //#region  create transaction ipd
     if(xInsuranceData.CoverageClaimStatus =true){
      // console.log('---------'+PreauthInfo.xClaimno)
         const existingRecordTransactionc = await prismaProgest.transactionclaim.findFirst({
                 where: {
                   refid: xInsuranceData.RefId,
                   //transactionno: xInsuranceData.TransactionNo,       
                 },
               });
               if (!existingRecordTransactionc) {    
                  await prismaProgest.transactionclaim.create({
                   data: {
                     
                      visitdate:PreauthInfo.xVisitDate ,
                     insurerid: 13 ,
                     refid: xInsuranceData.RefId,
                     transactionno: xInsuranceData.TransactionNo,
                     hn:RequesetBody.xHN,
                     vn:RequesetBody.xVN,
                     idtype:PreauthInfo.xIdType,
                     servicesettingcode:'IPD',
                     policytypecode:PreauthInfo.xPolicyTypeCode,
                      illnesstypecode:PreauthInfo.xIllnessTypeCode,
                      surgerytypecode:PreauthInfo.xSurgeryTypeCode,
                      preauthreferclaimno:PreauthInfo.xClaimno,
                      preauthreferocc:PreauthInfo.xOccurrenceno,
                       visitdatetime:PreauthInfo.xVisitDateTime,
                       accidentdate:PreauthInfo.xAccidentDate,
                     runningdocument:0,
                     membershipid:PreauthInfo.xMembershipid,
                     policynumber:PreauthInfo.xPolicynumber,
                     customerid:PreauthInfo.xCustomerid,
                     claimstatusdesc:'waitting for discharge',
                     claimstatusdesc_en:'waitting for discharge',
                     claimstatusdesc_th:'รอการส่งเคลม',
                //      visitlocation:RequesetBody.xVisitlocation,
                    },
                  });
               }else{
                if (existingRecordTransactionc) {
                  await prismaProgest.transactionclaim.delete({
                    where: { id: existingRecordTransactionc.id },
                  });
                  await prismaProgest.transactionclaim.create({
                  data: {
                    
                     visitdate:PreauthInfo.xVisitDate ,
                    insurerid: 13 ,
                    refid: xInsuranceData.RefId,
                    transactionno: xInsuranceData.TransactionNo,
                    hn:RequesetBody.xHN,
                    vn:RequesetBody.xVN,
                    idtype:PreauthInfo.xIdType,
                    servicesettingcode:'IPD',
                    policytypecode:PreauthInfo.xPolicyTypeCode,
                     illnesstypecode:PreauthInfo.xIllnessTypeCode,
                     surgerytypecode:PreauthInfo.xSurgeryTypeCode,
                     preauthreferclaimno:PreauthInfo.xClaimno,
                     preauthreferocc:PreauthInfo.xOccurrenceno,
                      visitdatetime:PreauthInfo.xVisitDateTime,
                      accidentdate:PreauthInfo.xAccidentDate,
                    runningdocument:0,
                    membershipid:PreauthInfo.xMembershipid,
                    policynumber:PreauthInfo.xPolicynumber,
                    customerid:PreauthInfo.xCustomerid,
                  
                    claimstatusdesc:'waitting for discharge',
                    claimstatusdesc_en:'waitting for discharge',
                    claimstatusdesc_th:'รอการส่งเคลม',
               //      visitlocation:RequesetBody.xVisitlocation,
                   },
                 });
                }
               }
              }
       //#endregion
    } 
      }else{     
          this.addFormatHTTPStatus(newHttpMessageDto,400,'TransactionNo not found','TransactionNo not found')
      }

 
   let newResultCheckeligiblePreAdmissionDto= new ResultCheckeligiblePreAdmissionDto();
   newResultCheckeligiblePreAdmissionDto={
     HTTPStatus:newHttpMessageDto,
     Result:xResultInfo
   }
   return newResultCheckeligiblePreAdmissionDto
     }catch(error)
     {
       if (error instanceof Prisma.PrismaClientInitializationError) {
         throw new HttpException(
          { 
           HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
             error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
           },
           },HttpStatus.INTERNAL_SERVER_ERROR );
       }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
           throw new HttpException(
             {  
               HTTPStatus: {
                 statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                 message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                 error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              },
             },HttpStatus.INTERNAL_SERVER_ERROR ); 
       }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
         if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.SERVICE_UNAVAILABLE,
             message: 'Cannot connect to the database server. Please ensure it is running.',
             error: 'Cannot connect to the database server. Please ensure it is running.',
           },
           }, HttpStatus.SERVICE_UNAVAILABLE);
         }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.BAD_REQUEST,
             message: 'Invalid data format or conversion error.',
             error: 'Invalid data format or conversion error.',
           },
           }, HttpStatus.BAD_REQUEST);
         }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.FORBIDDEN,
             message: 'You do not have permission to perform this action.',
             error: 'You do not have permission to perform this action.',
           },
           }, HttpStatus.FORBIDDEN);
         }else if (error.message.includes('Unable to fit integer value')) {
           // Handle integer overflow or similar errors
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.BAD_REQUEST,
             message: 'The integer value is too large for the database field.',
             error: 'The integer value is too large for the database field.',
           },
           }, HttpStatus.BAD_REQUEST);
         }
         else{
           throw new HttpException({  
             HTTPStatus: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An unexpected error occurred.',
                error: 'An unexpected error occurred.',
               },
             },HttpStatus.INTERNAL_SERVER_ERROR,);
         }
       }
     }
   }
async ReviewPreAuth(queryPreauthSubmissionDto:QueryPreauthSubmissionDto){
  let xResultInfo;
try{
 const RequesetBody ={
  xRefId:queryPreauthSubmissionDto.PatientInfo.RefId, 
  xTransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
  xHN :queryPreauthSubmissionDto.PatientInfo.HN ,
  xInsurerCode: queryPreauthSubmissionDto.PatientInfo.InsurerCode, 
  xVN: queryPreauthSubmissionDto.PatientInfo.VN 
 }
//#region  review patient
 const getOPDDischargePatient = await this.trakcareService.getOPDDischargePatient(RequesetBody.xHN);
let newResultReviewPatientInfoDto: ResultReviewPatientInfoDto ;
if (getOPDDischargePatient && getOPDDischargePatient.PatientInfo && getOPDDischargePatient.PatientInfo.HN.length > 0) {
 let convertgender =getOPDDischargePatient.PatientInfo.Gender
 if (convertgender==='F'){convertgender = 'Female'}else{convertgender ='Male'}
  newResultReviewPatientInfoDto = {
      Dob: getOPDDischargePatient.PatientInfo.Dob ,
      Hn: getOPDDischargePatient.PatientInfo.HN ,
      Gender: convertgender //getOPDDischargePatient.PatientInfo.Gender
 };
}else{
  newResultReviewPatientInfoDto = {
    Dob:'',
    Hn:'',
    Gender:''
  };
}
//#endregion
//#region  review Visit
const newQueryVisitDatabaseBodyDto ={
  RefId: RequesetBody.xRefId,
  TransactionNo: RequesetBody.xTransactionNo,
  InsurerCode:RequesetBody.xInsurerCode,
  HN: RequesetBody.xHN,
  VN: RequesetBody.xVN,

}
const getvisitformDatabase = await this.utilsService.getvisitformDatabase(newQueryVisitDatabaseBodyDto)
const newResultReviewVisitInfoDto : ResultReviewVisitInfoDto= {
  FurtherClaimId: getvisitformDatabase.Result.VisitInfo.FurtherClaimId||'',
  AccidentCauseOver45Days: getvisitformDatabase.Result.VisitInfo.AccidentCauseOver45Days||'',
  AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote||'',
  AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated||false,
  ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint||'',
  ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore||'',
  DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText||'',
  ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery||'',
  Height: getvisitformDatabase.Result.VisitInfo.Height||'',
  PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam||'',
  PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment||'',
  Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant||false,
  PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness||'',
  PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate||'',
  PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail||'',
  PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase||false,
  ProcedureFreeText: getvisitformDatabase.Result.VisitInfo.ProcedureFreeText,
  SignSymptomsDate:getvisitformDatabase.Result.VisitInfo.SignSymptomsDate|| '',
  UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition||'',
  VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
  VN:  getvisitformDatabase.Result.VisitInfo.VN||'',
  Weight: getvisitformDatabase.Result.VisitInfo.Weight||''
}
//#endregion
//#region  review Vitalsign
const getOPDDischargeVitalSign = await this.trakcareService.getOPDDischargeVitalSign(RequesetBody.xVN);
let newResultReviewVitalSignInfoDto: ResultReviewVitalSignInfoDto[] = [];
  if (getOPDDischargeVitalSign && getOPDDischargeVitalSign.VitalSignInfo && getOPDDischargeVitalSign.VitalSignInfo.length > 0) {
    newResultReviewVitalSignInfoDto= await Promise.all(
      getOPDDischargeVitalSign.VitalSignInfo.map(async (item) => {
      return {
        DiastolicBp: +item.DiastolicBp,
        HeartRate:  +item.HeartRate,
        OxygenSaturation:  +item.OxygenSaturation,
        PainScore:  +item.PainScore,
        RespiratoryRate: +item.RespiratoryRate,
        SystolicBp:  +item.SystolicBp,
        Temperature:  +parseFloat(item.Temperature).toFixed(2),
        VitalSignEntryDateTime:  item.VitalSignEntryDateTime,
      };
    })
  ); 
} else {
  newResultReviewVitalSignInfoDto = [{
    DiastolicBp: '',
    HeartRate: '',
    OxygenSaturation: '',
    PainScore: '',
    RespiratoryRate: '',
    SystolicBp: '',
    Temperature: '',
    VitalSignEntryDateTime: '',
    
  }];
}
//#endregion
//#region  review Diagnosis
const getOPDDischargeDiagnosis = await this.trakcareService.getOPDDischargeDiagnosis(RequesetBody.xVN);
let getDiagnosisTypeMapping 
let newResultReviewDiagnosisInfoDto: ResultReviewDiagnosisInfoDto[] = [];
  if (getOPDDischargeDiagnosis && getOPDDischargeDiagnosis.DiagnosisInfo && getOPDDischargeDiagnosis.DiagnosisInfo.length > 0) {

   newResultReviewDiagnosisInfoDto= await Promise.all(
      getOPDDischargeDiagnosis.DiagnosisInfo.map(async (item) => {
       getDiagnosisTypeMapping = await this.utilsService.getDiagnosisTypeMapping(
        ''+RequesetBody.xInsurerCode, 
        item.DxTypeCode
      );
      if (item.DxTypeCode === getDiagnosisTypeMapping.dxtypecodetrakcare) {
        item.DxTypeCode = getDiagnosisTypeMapping.dxtypecodeinsurance;
      }
      return {
        DxName: item.DxName,
        DxType: item.Dxtypenameinsurance,
        Icd10: item.DxCode,
        
      };
    })
  );
  
} else {
  newResultReviewDiagnosisInfoDto = [{
    DxName: '',
    DxType: '',
    Icd10: '',
  }];
}
//#endregion
//#region  review Procedure
let newResultProcedureDatabaseInfoDto: ResultProcedureDatabaseInfoDto[] = [];
let newQueryProcedeureDatabaseBodyDto = new QueryProcedeureDatabaseBodyDto();
newQueryProcedeureDatabaseBodyDto ={
 
  RefId: RequesetBody.xRefId,
  TransactionNo: RequesetBody.xTransactionNo,
  InsurerCode:RequesetBody.xInsurerCode,
  HN: RequesetBody.xHN,
  VN: RequesetBody.xVN,

}

const getOPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto)
if (getOPDDischargeProcedure && getOPDDischargeProcedure.Result && getOPDDischargeProcedure.Result.ProcedureInfo && getOPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
  newResultProcedureDatabaseInfoDto = await Promise.all(
      getOPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
          return {
              Icd9: item.Icd9,
              ProcedureName: item.ProcedureName,
              ProcedureDate: item.ProcedureDate,
          };
      })
  );
}
else {
  newResultProcedureDatabaseInfoDto = [{
    Icd9: '',
    ProcedureName: '',
    ProcedureDate: '',
  }];
}
//#endregion
//#region  review AccidentDetail
let newQueryAccidentDatabaseBodyDto = new QueryAccidentDatabaseBodyDto();
newQueryAccidentDatabaseBodyDto ={
  RefId: RequesetBody.xRefId,
  TransactionNo: RequesetBody.xTransactionNo,
  InsurerCode:RequesetBody.xInsurerCode,
  HN: RequesetBody.xHN,
  VN: RequesetBody.xVN,
}
const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
const accidentDetailInfo = new AccidentDetailDto();
accidentDetailInfo.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
accidentDetailInfo.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';
// จัดการ CauseOfInjuryDetail
if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
    accidentDetailInfo.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
        const causeDetail = new CauseOfInjuryDetail();
        causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
        causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
        return causeDetail;
    });
} 
// จัดการ InjuryDetail
if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
    accidentDetailInfo.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
        const injuryDetail = new InjuryDetail();
        injuryDetail.WoundType = injury.WoundType || '';
        injuryDetail.InjurySide = injury.InjurySide || '';
        injuryDetail.InjuryArea = injury.InjuryArea || '';
        return injuryDetail;
    });
}
//#endregion
//#region  review Investigation
let newResultReviewInvestigationInfoDto: ResultReviewInvestigationInfoDto[] = [];
const getIPDInvestigation = await this.trakcareService.getIPDInvestigation(RequesetBody.xVN); 
  if (getIPDInvestigation && getIPDInvestigation.InvestigationInfo && getIPDInvestigation.InvestigationInfo.length > 0) {
    newResultReviewInvestigationInfoDto= await Promise.all(
      getIPDInvestigation.InvestigationInfo.map(async (item) => {
      return {
        InvestigationCode: item.InvestigationCode,
        InvestigationGroup: item.InvestigationGroup,
        InvestigationName: item.InvestigationName,
        InvestigationResult: item.InvestigationResult,
        ResultDateTime: item.ResultDateTime,
      };
    })
  );
} else {
  newResultReviewInvestigationInfoDto = [{
    InvestigationCode: '',
    InvestigationGroup: '',
    InvestigationName: '',
    InvestigationResult: '',
    ResultDateTime: ''
  }];
}
//#endregion
//#region  review Orderitem
let newResultReviewOrderItemInfoDto : ResultReviewOrderItemInfoDto[] = [];
const getOPDDischargeOrderItem = await this.trakcareService.getOPDDischargeOrderItem(RequesetBody.xVN); 
   if (getOPDDischargeOrderItem && getOPDDischargeOrderItem.OrderItemInfo && getOPDDischargeOrderItem.OrderItemInfo.length > 0) {
    newResultReviewOrderItemInfoDto= await Promise.all(
      getOPDDischargeOrderItem.OrderItemInfo.map(async (item) => {
      return {
        ItemId: item.ItemId,
        ItemName: item.ItemName,
        ItemAmount: item.ItemAmount,
        Discount: item.Discount,
        Initial: item.Initial,

        LocalBillingCode: item.LocalBillingCode,
        LocalBillingName: item.LocalBillingName,
        Location: item.Location,

        NetAmount: item.NetAmount,
        SimbVersion: item.SimbVersion,
        Terminology: item.Terminology,

      };
    })
  );
} else {
  newResultReviewOrderItemInfoDto = [{

    ItemId: '',
    ItemName: '',
    ItemAmount: '',
    Discount: '',
    Initial: '',
    LocalBillingCode: '',
    LocalBillingName: '',
    Location: '',
    NetAmount: '',
    SimbVersion: '',
    Terminology: ''
  }];
}
//#endregion// //--> get Doctor  <--//
//#region  review Doctor
let newResultReviewDoctorInfoDto: ResultReviewDoctorInfoDto[] = [];
const getOPDDischargeDoctor = await this.trakcareService.getOPDDischargeDoctor(RequesetBody.xVN); 
  if (getOPDDischargeDoctor && getOPDDischargeDoctor.DoctorInfo && getOPDDischargeDoctor.DoctorInfo.length > 0) {
    newResultReviewDoctorInfoDto= await Promise.all(
      getOPDDischargeDoctor.DoctorInfo.map(async (item) => {
      return {
        DoctorLicense: item.DoctorLicense.toString().padStart(10, '0'),
        DoctorRole: item.DoctorRole,
        DoctorFirstName: item.DoctorFirstName,
        DoctorLastName: '' //await this.utilsService.EncryptAESECB( item.DoctorLastName,AIA_APISecretkey) ,
      };
    })
  );
} else {
  newResultReviewDoctorInfoDto = [{
    DoctorLicense: '',
    DoctorRole: '',
    DoctorFirstName: '',
    DoctorLastName: '',
  
  }];
}
//#endregion 
//#region  review Billing
let newResultReviewBillingInfoDto : ResultReviewBillingInfoDto[] = [];
let  newTotalBillAmount ;
let newInvoiceNumber ;
const getOPDDischargeBilling = await this.trakcareService.getOPDDischargeBilling(RequesetBody.xVN); 
   if (getOPDDischargeBilling && getOPDDischargeBilling.BillingInfo && getOPDDischargeBilling.BillingInfo.length > 0) {
       newTotalBillAmount = getOPDDischargeBilling.TotalBillAmount
       newInvoiceNumber =getOPDDischargeBilling.InvoiceNumber
       newResultReviewBillingInfoDto= await Promise.all(
      getOPDDischargeBilling.BillingInfo.map(async (item) => {
      return {
        LocalBillingCode: item.LocalBillingCode,
        LocalBillingName: item.LocalBillingName,
        SimbBillingCode: item.SimbBillingCode,
        PayorBillingCode: item.PayorBillingCode,
        BillingInitial: item.BillingInitial,
        BillingDiscount: item.BillingDiscount,
        BillingNetAmount: item.BillingNetAmount,
      };
    })
  );
} else {
  newResultReviewBillingInfoDto = [{

    LocalBillingCode: '',
    LocalBillingName: '',
    SimbBillingCode: '',
    PayorBillingCode: '',
    BillingInitial: '',
    BillingDiscount: '',
    BillingNetAmount: '',
   
  }];
  newTotalBillAmount=0
}
//#endregion
//#region  review Note

const whereConditions = {
    
  ...(RequesetBody.xVN? { vn: { equals: RequesetBody.xVN } } : {}),
  ...(RequesetBody.xRefId? { refid: { equals: RequesetBody.xRefId  } } : {}),
  ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo  } } : {}),

};
const existingConcurrentNoteRecord = await prismaProgest.concurrentnotetransactions.findFirst({
  where: whereConditions
});
let newQueryConcurNote: QueryConcurNote[] = [];

if (existingConcurrentNoteRecord){

const newQueryConcurrentNoteDatabaseBodyDto ={
  RefId:queryPreauthSubmissionDto.PatientInfo.RefId,
  TransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
  InsurerCode:queryPreauthSubmissionDto.PatientInfo.InsurerCode,
  HN:queryPreauthSubmissionDto.PatientInfo.HN,
  VN:queryPreauthSubmissionDto.PatientInfo.VN
}
 const getConcurNoteformDatabase = await this.utilsService.getConcurNoteformDatabase(newQueryConcurrentNoteDatabaseBodyDto)

 if (getConcurNoteformDatabase && getConcurNoteformDatabase.Result.ConcurNoteList && getConcurNoteformDatabase.Result.ConcurNoteList.length > 0) {
  newQueryConcurNote= await Promise.all(
    getConcurNoteformDatabase.Result.ConcurNoteList.map(async (item) => {
     return {
      ConcurrentDatetime: item.ConcurrentDatetime,
      ConcurrentDetail: item.ConcurrentDetail,
       
     };
   })
 );
} else {
newQueryConcurNote = [{
  ConcurrentDatetime: '',
  ConcurrentDetail: '',
 }];
}
}else{
newQueryConcurNote = [{
  ConcurrentDatetime: '',
  ConcurrentDetail: '',
}];
}

//#endregion

let newResultReviewDataJsonDto =new ResultReviewDataJsonDto();
newResultReviewDataJsonDto ={
   Patient :newResultReviewPatientInfoDto,
   Visit: newResultReviewVisitInfoDto, 
   VitalSign :newResultReviewVitalSignInfoDto,
   Diagnosis :newResultReviewDiagnosisInfoDto,
   AccidentDetail:accidentDetailInfo,  
   Procedure :newResultProcedureDatabaseInfoDto, 
   Investigation :newResultReviewInvestigationInfoDto,
   OrderItem :newResultReviewOrderItemInfoDto,
   Doctor : newResultReviewDoctorInfoDto,
   Billing :newResultReviewBillingInfoDto,
   TotalBillAmount:newTotalBillAmount,
   InvoiceNumber:newInvoiceNumber,
   Note:newQueryConcurNote
}
    let xInsuranceResult= new InsuranceResult();
    xInsuranceResult ={
     Code:'200',
     Message:'sucess',
     MessageTh:'test'
    }
   
xResultInfo ={
    InsuranceResult: xInsuranceResult,
    InsuranceData:newResultReviewDataJsonDto
  } 



  this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  
  let newResultReviewOpdDischargeDto= new ResultReviewOpdDischargeDto();
  newResultReviewOpdDischargeDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultReviewOpdDischargeDto
}catch(error)
{
  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new HttpException(
     { 
      HTTPStatus: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
        error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
      },
      },HttpStatus.INTERNAL_SERVER_ERROR );
  }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new HttpException(
        {  
          HTTPStatus: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
            error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
         },
        },HttpStatus.INTERNAL_SERVER_ERROR ); 
  }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
    if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Cannot connect to the database server. Please ensure it is running.',
        error: 'Cannot connect to the database server. Please ensure it is running.',
      },
      }, HttpStatus.SERVICE_UNAVAILABLE);
    }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid data format or conversion error.',
        error: 'Invalid data format or conversion error.',
      },
      }, HttpStatus.BAD_REQUEST);
    }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to perform this action.',
        error: 'You do not have permission to perform this action.',
      },
      }, HttpStatus.FORBIDDEN);
    }else if (error.message.includes('Unable to fit integer value')) {
      // Handle integer overflow or similar errors
      throw new HttpException({
        HTTPStatus: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The integer value is too large for the database field.',
        error: 'The integer value is too large for the database field.',
      },
      }, HttpStatus.BAD_REQUEST);
    }
    else{
      throw new HttpException({  
        HTTPStatus: {
           statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
           message: 'An unexpected error occurred.',
           error: 'An unexpected error occurred.',
          },
        },HttpStatus.INTERNAL_SERVER_ERROR,);
    }
  }
}
}

   async getICDDx(xICDDxCode: string ){
    let arrayICDDxInfo;
    const newHttpMessageDto =new HttpMessageDto();
     try{
       
      const TrakcareICDDxInfo = await this.trakcareService.getICDDx(xICDDxCode)
  //console.log(TrakcarepatientInfo)
      if (TrakcareICDDxInfo.ICDDxInfo){
        arrayICDDxInfo = {
     
          ICDDxInfo: TrakcareICDDxInfo.ICDDxInfo.map((item) => ({
          ICDDxId: item.ICDDxId,
          ICDDxCode: item.ICDDxCode,
          ICDDx: item.ICDDx,
      
    }))
       }
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
 
      }else{
        arrayICDDxInfo = [{
 
          ICDDxId: '',
          ICDDxCode: '',
          ICDDx: '',
         }];
         this.addFormatHTTPStatus(newHttpMessageDto,400,'','')
      }
  
 
 
   let newResultlistBillingCheckBalanceDto= new ResultlistICDDxInfoDto();
   newResultlistBillingCheckBalanceDto={
     HTTPStatus:newHttpMessageDto,
     Result:  arrayICDDxInfo
   }
   
   return newResultlistBillingCheckBalanceDto
     }catch(error)
     {
       if (error instanceof Prisma.PrismaClientInitializationError) {
         throw new HttpException(
          { 
           HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
             error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
           },
           },HttpStatus.INTERNAL_SERVER_ERROR );
       }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
           throw new HttpException(
             {  
               HTTPStatus: {
                 statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                 message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                 error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              },
             },HttpStatus.INTERNAL_SERVER_ERROR ); 
       }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
         if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.SERVICE_UNAVAILABLE,
             message: 'Cannot connect to the database server. Please ensure it is running.',
             error: 'Cannot connect to the database server. Please ensure it is running.',
           },
           }, HttpStatus.SERVICE_UNAVAILABLE);
         }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.BAD_REQUEST,
             message: 'Invalid data format or conversion error.',
             error: 'Invalid data format or conversion error.',
           },
           }, HttpStatus.BAD_REQUEST);
         }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.FORBIDDEN,
             message: 'You do not have permission to perform this action.',
             error: 'You do not have permission to perform this action.',
           },
           }, HttpStatus.FORBIDDEN);
         }else if (error.message.includes('Unable to fit integer value')) {
           // Handle integer overflow or similar errors
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.BAD_REQUEST,
             message: 'The integer value is too large for the database field.',
             error: 'The integer value is too large for the database field.',
           },
           }, HttpStatus.BAD_REQUEST);
         }
         else{
           throw new HttpException({  
             HTTPStatus: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An unexpected error occurred.',
                error: 'An unexpected error occurred.',
               },
             },HttpStatus.INTERNAL_SERVER_ERROR,);
         }
       }
     }
   }
   async getICD9(xICD9Code: string ){
    let arrayICD9Info;
    const newHttpMessageDto =new HttpMessageDto();
     try{
       
      const TrakcareICD9Info = await this.trakcareService.getICD9(xICD9Code)
      if (TrakcareICD9Info.ObjICD9Info){
        arrayICD9Info = {
     
          ICD9Info: TrakcareICD9Info.ObjICD9Info.map((item) => ({
            ICD9Id: item.ICD9Id,
            ICD9Code: item.ICD9Code,
            ICD9Desc: item.ICD9Desc,
      
    }))
       }
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
 
      }else{
        arrayICD9Info = [{
          ICD9Id: '',
          ICD9Code: '',
          ICD9Desc: '',
         }];
         this.addFormatHTTPStatus(newHttpMessageDto,400,'','')
      }

 
 
   let newResultlistBillingCheckBalanceDto= new ResultlistICD9InfoDto();
   newResultlistBillingCheckBalanceDto={
     HTTPStatus:newHttpMessageDto,
     Result:  arrayICD9Info
   }
   
   return newResultlistBillingCheckBalanceDto
     }catch(error)
     {
       if (error instanceof Prisma.PrismaClientInitializationError) {
         throw new HttpException(
          { 
           HTTPStatus: {
             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
             error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR)),
           },
           },HttpStatus.INTERNAL_SERVER_ERROR );
       }else if (error instanceof Prisma.PrismaClientKnownRequestError) {
           throw new HttpException(
             {  
               HTTPStatus: {
                 statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                 message: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
                 error: httpStatusMessageService.getHttpStatusMessage( (HttpStatus.INTERNAL_SERVER_ERROR),error.code),
              },
             },HttpStatus.INTERNAL_SERVER_ERROR ); 
       }else{    // กรณีเกิดข้อผิดพลาดอื่น ๆ
         if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.SERVICE_UNAVAILABLE,
             message: 'Cannot connect to the database server. Please ensure it is running.',
             error: 'Cannot connect to the database server. Please ensure it is running.',
           },
           }, HttpStatus.SERVICE_UNAVAILABLE);
         }else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.BAD_REQUEST,
             message: 'Invalid data format or conversion error.',
             error: 'Invalid data format or conversion error.',
           },
           }, HttpStatus.BAD_REQUEST);
         }else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.FORBIDDEN,
             message: 'You do not have permission to perform this action.',
             error: 'You do not have permission to perform this action.',
           },
           }, HttpStatus.FORBIDDEN);
         }else if (error.message.includes('Unable to fit integer value')) {
           // Handle integer overflow or similar errors
           throw new HttpException({
             HTTPStatus: {
             statusCode: HttpStatus.BAD_REQUEST,
             message: 'The integer value is too large for the database field.',
             error: 'The integer value is too large for the database field.',
           },
           }, HttpStatus.BAD_REQUEST);
         }
         else{
           throw new HttpException({  
             HTTPStatus: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An unexpected error occurred.',
                error: 'An unexpected error occurred.',
               },
             },HttpStatus.INTERNAL_SERVER_ERROR,);
         }
       }
     }
   }
   
/// Utils ///
async convertDxTypeCode(inputInsurerCode:string,inputdxTypeCodeTrakcare:string) {
  const convertDxtypename = await this.utilsService.getDiagnosisTypeMapping(inputInsurerCode,inputdxTypeCodeTrakcare);
 return convertDxtypename
}
calculateDaysBetweenDates(startDate: string, endDate: string): number {
  
  const start = new Date(startDate.split(' ')[0]);
  const end = new Date(endDate.split(' ')[0]);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format. Please use a valid date string (e.g., 'YYYY-MM-DD').");
  }
  const differenceInMilliseconds = end.getTime() - start.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.ceil(differenceInDays) === 0 ? 1 : differenceInDays; //Math.ceil(differenceInDays); // ปัดขึ้นให้เป็นจำนวนเต็ม
}

  addFormatHTTPStatus(data: HttpMessageDto,inputstatusCode:number,inputmessage:string,inputerror:string):void{  
    if(inputstatusCode !==200){
        if(data){
          data.statusCode=inputstatusCode
          data.message=inputmessage||''
          data.error=inputerror||''
        }
      }
      else{
        if(data){
          data.statusCode=200
          data.message='success'
          data.error=''
        }
      }
      
  }
}
