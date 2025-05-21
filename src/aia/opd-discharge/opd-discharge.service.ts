import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { prismaProgest } from '../../database/database';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';

import { QueryOpdDischargeDto } from   './dto/query-opd-discharge.dto';
import { QuerySubmitOpdDischargeDto } from './dto/query-submit-opd-discharge.dto';

import { ResultOpdDischargeVitalSignDto ,QueryVitalSign } from './dto/result-vitalsign-opd-discharge.dto';
import { ResultOpdDischargeDoctorDto ,QueryDoctor } from './dto/result-doctor-opd-discharge.dto';
import { ResultOpdDischargeDiagnosisDto ,QueryDiagnosis } from './dto/result-diagnosis-opd-discharge.dto';
import { ResultOpdDischargeInvestigationDto ,QueryInvestigation } from './dto/result-investigation-opd-discharge.dto';
import { ResultOpdDischargeOrderItemDto ,QueryOrderItem } from './dto/result-orderitem-opd-discharge.dto';
import { ResultOpdDischargeBillingDto, QueryBilling} from './dto/result-billing-opd-discharge.dto';
import { ResultOpdDischargeProcedurDto, QueryProcedure} from './dto/result-procedure-opd-discharge.dto';
import { ResultOpdDischargeAccidentDto ,QueryAccident} from './dto/result-accident-opd-discharge.dto';
import { ResultOpdDischargeVisitDto ,QueryVisit} from './dto/result-visit-opd-discharge.dto';
import { ResultSubmitOpdDischargeDto , InsuranceResult, InsuranceData,
  ResultDataJsonDto ,ResultPatientInfoDto ,ResultVisitInfoDto ,ResultVitalSignInfoDto,ResultDiagnosisInfoDto ,ResultDoctorInfoDto,
  ResultProcedureInfoDto ,ResultInvestigationInfoDto,ResultOrderItemInfoDto ,ResultBillingInfoDto,
  ResultAttachDocListInfoDto 
} from './dto/result-submit-opd-discharge.dto';
import { QueryProcedureDto ,ResultSubmitProcedureDto} from './dto/query-procedure-opd-discharge.dto';
import { QueryAccidentDto ,ResultSubmitAccidentDto} from './dto/query-accident-opd-discharge.dto';
import { QueryVisitDto } from './dto/query-visit-opd-discharge.dto';
import { QueryReviewOpdDischargeDto ,ResultReviewOpdDischargeDto,ResultReviewDataJsonDto,
  ResultReviewPatientInfoDto,ResultReviewVisitInfoDto ,ResultReviewVitalSignInfoDto,ResultReviewDiagnosisInfoDto,
  ResultReviewInvestigationInfoDto,ResultReviewOrderItemInfoDto,ResultReviewDoctorInfoDto,
  ResultReviewBillingInfoDto ,AccidentDetailDto
} from './dto/review-opd-discharge.dto';
import { QueryProcedeureDatabaseBodyDto ,ResultProcedureDatabaseInfoDto } from '../../utils/dto/result-procedure-databse.dto';
import { QueryAccidentDatabaseBodyDto  ,
  CauseOfInjuryDetail,InjuryDetail
}  from '../../utils/dto/result-accident-databse.dto';
import { QueryUpdateFurtherClaimVNBodyDto  ,ResultSubmitUpdateFurtherClaimVNDto} from './dto/query-updatefurtherclaimvn-opd-discharge.dto'
import { ResultClaimFormListDto ,QueryClaimFormListInfo } from './dto/result-listclaim-opd-discharge.dto'
// import { DummyDataRequest1 }  from './dummyRequest';
// import { DummyDataRespone1 } from './dummyRespone';
const httpStatusMessageService = new HttpStatusMessageService();

const newHttpMessageDto =new HttpMessageDto();
const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE


@Injectable()
export class OpdDischargeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService
  ) {}

async getOPDDischargeVisit(queryOpdDischargeDto:QueryOpdDischargeDto){
  let xResultInfo;
try{
  const newQueryVisitDatabaseBodyDto ={
    RefId: queryOpdDischargeDto.PatientInfo.RefId,
    TransactionNo: queryOpdDischargeDto.PatientInfo.TransactionNo,
    InsurerCode:queryOpdDischargeDto.PatientInfo.InsurerCode,
    HN: queryOpdDischargeDto.PatientInfo.HN,
    VN: queryOpdDischargeDto.PatientInfo.VN,
  
  }

  const existingTransaction = await prismaProgest.transactionclaim.findFirst({
    where: {
      refid: queryOpdDischargeDto.PatientInfo.RefId,
      transactionno: queryOpdDischargeDto.PatientInfo.TransactionNo,
    },
  });
let xAccidentcauseover45days=''
if (existingTransaction?.accidentcauseover45days){
   xAccidentcauseover45days =existingTransaction.accidentcauseover45days
}else{xAccidentcauseover45days=''}

  const getvisitformDatabase = await this.utilsService.getvisitformDatabase(newQueryVisitDatabaseBodyDto)
  if (getvisitformDatabase?.Result?.VisitInfo?.VisitDateTime?.length >0){ 
    const newResultReviewVisitInfoDto : ResultReviewVisitInfoDto= {
      FurtherClaimId: getvisitformDatabase.Result.VisitInfo.FurtherClaimId||'',
      AccidentCauseOver45Days: getvisitformDatabase.Result.VisitInfo.AccidentCauseOver45Days||'',
      AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote||'',
      AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated||false,
      ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint ? getvisitformDatabase.Result.VisitInfo.ChiefComplaint.slice(0,200):'',
      ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore||'',
      DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText ? getvisitformDatabase.Result.VisitInfo.DxFreeText.slice(0,200):'',
      ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery||'',
      Height: getvisitformDatabase.Result.VisitInfo.Height||'',
      PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam? getvisitformDatabase.Result.VisitInfo.PhysicalExam.slice(0,1000):'',
      PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment ?getvisitformDatabase.Result.VisitInfo.PlanOfTreatment.slice(0,500):'',
      Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant||false,
      PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness? getvisitformDatabase.Result.VisitInfo.PresentIllness.slice(0,500):'',
      PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate||'',
      PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail? getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail.slice(0,20):'',
      PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase||false,
      ProcedureFreeText: getvisitformDatabase.Result.VisitInfo.ProcedureFreeText? getvisitformDatabase.Result.VisitInfo.ProcedureFreeText.slice(0,500):'',
      SignSymptomsDate:getvisitformDatabase.Result.VisitInfo.SignSymptomsDate|| '',
      UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition||'',
      VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
      VN:  getvisitformDatabase.Result.VisitInfo.VN||'',
      Weight: getvisitformDatabase.Result.VisitInfo.Weight||'',
    }
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    xResultInfo ={
      VisitInfo: newResultReviewVisitInfoDto,
     } 
  }else{
     const FurtherClaimVN =queryOpdDischargeDto.PatientInfo.FurtherClaimVN
     if (FurtherClaimVN){queryOpdDischargeDto.PatientInfo.VN = FurtherClaimVN}
    const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeVisit(queryOpdDischargeDto.PatientInfo.VN);
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
       }
       xResultInfo ={
        VisitInfo: xQueryVisit,
       } 
    }else{

      if (FurtherClaimVN){
        const getVisitDateTimeCurrentVN = await this.trakcareService.getEpisodeInfoByVN(queryOpdDischargeDto.PatientInfo.VN);
        const CurrentVisitDateTime =getVisitDateTimeCurrentVN?.VisitInfo?.VisitDateTime
        TrakcarepatientInfo.VisitInfo.VisitDateTime =CurrentVisitDateTime
      }
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
        const xQueryVisit: QueryVisit = TrakcarepatientInfo.VisitInfo ? {
          FurtherClaimId: TrakcarepatientInfo.VisitInfo.FurtherClaimId || '', 
          AccidentCauseOver45Days: xAccidentcauseover45days , //TrakcarepatientInfo.VisitInfo.AccidentCauseOver45Days || '', // here adjust 45 day condition
          AdditionalNote: TrakcarepatientInfo.VisitInfo.AdditionalNote || '',
          AlcoholRelated: Boolean(TrakcarepatientInfo.VisitInfo.AlcoholRelated) || false,
          ChiefComplaint: TrakcarepatientInfo.VisitInfo.ChiefComplaint.slice(0,200) || '',
          ComaScore: TrakcarepatientInfo.VisitInfo.ComaScore || '',
          DxFreeText: TrakcarepatientInfo.VisitInfo.DxFreeText.slice(0,200) || '',
          ExpectedDayOfRecovery: TrakcarepatientInfo.VisitInfo.ExpectedDayOfRecovery || '',
          Height: TrakcarepatientInfo.VisitInfo.Height || '',
          PhysicalExam: TrakcarepatientInfo.VisitInfo.PhysicalExam.slice(0,1000)|| '',
          PlanOfTreatment: TrakcarepatientInfo.VisitInfo.PlanOfTreatment.slice(0,500) || '',
          Pregnant: Boolean(TrakcarepatientInfo.VisitInfo.Pregnant) || false,
          PresentIllness: TrakcarepatientInfo.VisitInfo.PresentIllness.slice(0,500) || '',
          PreviousTreatmentDate: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDate || '',
          PreviousTreatmentDetail: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDetail.slice(0,20) || '',
          PrivateCase: Boolean(TrakcarepatientInfo.VisitInfo.PrivateCase) || false,
          ProcedureFreeText: TrakcarepatientInfo.VisitInfo.ProcedureFreeText.slice(0,500) || '',
          SignSymptomsDate: TrakcarepatientInfo.VisitInfo.SignSymptomsDate || '',
          UnderlyingCondition: TrakcarepatientInfo.VisitInfo.UnderlyingCondition || '',
          VisitDateTime: TrakcarepatientInfo.VisitInfo.VisitDateTime || '',
          Vn: TrakcarepatientInfo.VisitInfo.Vn || '',
          Weight: TrakcarepatientInfo.VisitInfo.Weight || '',
        
      } : {};
      xResultInfo ={
        VisitInfo: xQueryVisit,
       } 
    }
   // console.log(' -----get data from trakcare ----')
  }
  let newResultOpdDischargeVisitDto= new ResultOpdDischargeVisitDto();
  newResultOpdDischargeVisitDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultOpdDischargeVisitDto
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
async getOPDDischargeVitalSign(queryOpdDischargeDto:QueryOpdDischargeDto){
    let xResultInfo;
 try{
   
    const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeVitalSign(queryOpdDischargeDto.PatientInfo.VN);
    const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
    if (TrakcarepatientInfoStatusCode !==200){
      this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
      const xQueryVitalSign ={    
          DiastolicBp: '', 
          HeartRate: '',
          OxygenSaturation: '',
          PainScore: '',
          RespiratoryRate: '',
          SystolicBp:'',
          Temperature: '',
          VitalSignEntryDateTime: '',
       }
       xResultInfo ={
        VitalSignInfo: [xQueryVitalSign],
       } 
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      const xQueryVitalSign: QueryVitalSign[] = TrakcarepatientInfo.VitalSignInfo ? TrakcarepatientInfo.VitalSignInfo.map((item) => {
        return {
          DiastolicBp: item.DiastolicBp||'', 
          HeartRate: item.HeartRate||'',
          OxygenSaturation: item.OxygenSaturation||'',
          PainScore: item.PainScore||'',
          RespiratoryRate: item.RespiratoryRate||'',
          SystolicBp: item.SystolicBp||'',
          Temperature: item.Temperature||'',
          VitalSignEntryDateTime: item.VitalSignEntryDateTime||'',
         };
       }):[];
      xResultInfo ={
        VitalSignInfo: xQueryVitalSign,
       } 
    }
    let newResultOpdDischargeVitalSignDto= new ResultOpdDischargeVitalSignDto();
        newResultOpdDischargeVitalSignDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
 
return newResultOpdDischargeVitalSignDto
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
async getOPDDischargeDoctor(queryOpdDischargeDto:QueryOpdDischargeDto){
    let xResultInfo;
 try{
  const FurtherClaimVN =queryOpdDischargeDto.PatientInfo.FurtherClaimVN
  if (FurtherClaimVN){queryOpdDischargeDto.PatientInfo.VN = FurtherClaimVN}
   
    const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeDoctor(queryOpdDischargeDto.PatientInfo.VN);
    const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
    if (TrakcarepatientInfoStatusCode !==200){
      this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
      const xQueryDoctor ={    
        DoctorLicense: '', 
        DoctorRole: '',
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
    let newResultOpdDischargeDoctorDto= new ResultOpdDischargeDoctorDto();
    newResultOpdDischargeDoctorDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
 
return newResultOpdDischargeDoctorDto
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
async getOPDDischargeDiagnosis(queryOpdDischargeDto:QueryOpdDischargeDto){
    let xResultInfo;
 try{
  const FurtherClaimVN =queryOpdDischargeDto.PatientInfo.FurtherClaimVN
  if (FurtherClaimVN){queryOpdDischargeDto.PatientInfo.VN = FurtherClaimVN}
    const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeDiagnosis(queryOpdDischargeDto.PatientInfo.VN);
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
        const convertDxtypename = await this.convertDxTypeCode(''+queryOpdDischargeDto.PatientInfo.InsurerCode,item.DxTypeCode);
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
    }
    let newResultOpdDischargeDiagnosisDto= new ResultOpdDischargeDiagnosisDto();
    newResultOpdDischargeDiagnosisDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
 
return newResultOpdDischargeDiagnosisDto
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
async getOPDDischargeInvestigation(queryOpdDischargeDto:QueryOpdDischargeDto){
  let xResultInfo;
try{
 
  const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeInvestigation(queryOpdDischargeDto.PatientInfo.VN);
  // console.log(TrakcarepatientInfo)
  const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
  if (TrakcarepatientInfoStatusCode !==200){
    this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
   
    const xQueryInvestigation =[{
      InvestigationCode: '', 
      InvestigationGroup: '',
      InvestigationName: '',
      InvestigationResult: '',
      ResultDateTime: ''
     } ]
    
     xResultInfo ={
      InvestigationInfo: [xQueryInvestigation],
     } 
  }else{
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    const xQueryInvestigation: QueryInvestigation[] = TrakcarepatientInfo.InvestigationInfo ? 
    TrakcarepatientInfo.InvestigationInfo.map((item) => {
    return {
        InvestigationCode: item.InvestigationCode||'', 
        InvestigationGroup: item.InvestigationGroup||'',
        InvestigationName: item.InvestigationName||'',
        InvestigationResult: item.InvestigationResult||'',
        ResultDateTime:item.ResultDateTime||''
      };
    }):[];
    xResultInfo ={
      InvestigationInfo: xQueryInvestigation,
     } 
  }
  let newResultOpdDischargeInvestigationDto= new ResultOpdDischargeInvestigationDto();
  newResultOpdDischargeInvestigationDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultOpdDischargeInvestigationDto
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
async getOPDDischargeOrderItem(queryOpdDischargeDto:QueryOpdDischargeDto){
  let xResultInfo;
try{
 
  const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeOrderItem(queryOpdDischargeDto.PatientInfo.VN);
  // console.log(TrakcarepatientInfo)
  const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
  if (TrakcarepatientInfoStatusCode !==200){
    this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
    const xQueryOrderItem ={    
      ItemId: '', 
      ItemName: '',
      ItemAmount: '',
      Discount: '',
      Initial: '',
      LocalBillingCode: '',
      LocalBillingName: '',
      Location: '',
      NetAmount: '',
      SimbVersion:'',
      Terminology: ''
     }
     xResultInfo ={
      OrderItemInfo: [xQueryOrderItem],
     } 
  }else{
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    const xQueryOrderItem: QueryOrderItem[] = TrakcarepatientInfo.OrderItemInfo ? 
    TrakcarepatientInfo.OrderItemInfo.map((item) => {
    return {
      ItemId: item.ItemId||'', 
      ItemName: item.ItemName||'',
      ItemAmount: item.ItemAmount||'',
      Discount: item.Discount||'',
      Initial: item.Initial||'',
      LocalBillingCode: item.LocalBillingCode||'',
      LocalBillingName: item.LocalBillingName||'',
      Location: item.Location||'',
      NetAmount: item.NetAmount||'',
      SimbVersion: item.SimbVersion||'',
      Terminology:item.Terminology||''
      };
    }):[];
    xResultInfo ={
      OrderItemInfo: xQueryOrderItem,
     } 
  }
  let newResultOpdDischargeOrderItemDto= new ResultOpdDischargeOrderItemDto();
  newResultOpdDischargeOrderItemDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultOpdDischargeOrderItemDto
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
async getOPDDischargeBilling(queryOpdDischargeDto:QueryOpdDischargeDto){
  let xResultInfo;
try{
 
  const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeBilling(queryOpdDischargeDto.PatientInfo.VN);
  // console.log(TrakcarepatientInfo)
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
      BillingInfo: [xQueryBilling],
      TotalBillAmount:'',
      InvoiceNumber:''
     } 
  }else{
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    const xQueryBilling: QueryBilling[] = TrakcarepatientInfo.BillingInfo ? 
    TrakcarepatientInfo.BillingInfo.map((item) => {

     
      if (item.LocalBillingCode =='0101015'){
        console.log('Vitamin')
        item.LocalBillingCode ='0101013'
        item.LocalBillingName ='1.1.1(13) ค่ายาผู้ป่วยนอก'
        item.SimbBillingCode ='1.1.1(13)'
        item.PayorBillingCode ='1.1.1(13)'
  
      }
      if (item.LocalBillingCode =='01230001'){
        console.log('ค่าวิสัญญีแพทย์')
        item.LocalBillingCode ='0121001'
        item.LocalBillingName ='1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก'
        item.SimbBillingCode ='1.2.1(1)'
        item.PayorBillingCode ='1.2.1(1)'
  
      }

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
      BillingInfo: xQueryBilling,
      TotalBillAmount: TrakcarepatientInfo.TotalBillAmount ? TrakcarepatientInfo.TotalBillAmount : '',
      InvoiceNumber:TrakcarepatientInfo.InvoiceNumber ? TrakcarepatientInfo.InvoiceNumber : '',
     } 
  }
  let newResultOpdDischargeBillingDto= new ResultOpdDischargeBillingDto();
  newResultOpdDischargeBillingDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultOpdDischargeBillingDto
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
async getOPDDischargeProcedure(queryOpdDischargeDto:QueryOpdDischargeDto){
  let xResultInfo;
try{

  const whereConditions = {
    
    ...(queryOpdDischargeDto.PatientInfo.VN ? { vn: { equals: queryOpdDischargeDto.PatientInfo.VN } } : {}),
    ...(queryOpdDischargeDto.PatientInfo.RefId ? { refid: { equals: queryOpdDischargeDto.PatientInfo.RefId  } } : {}),
    ...(queryOpdDischargeDto .PatientInfo. TransactionNo ? { transactionno: { equals: queryOpdDischargeDto .PatientInfo. TransactionNo } } : {}),

  };
  const existingProcedureRecord = await prismaProgest.proceduretransactions.findFirst({
    where: whereConditions
  });
 if (existingProcedureRecord){
// queryOpdDischargeDto.PatientInfo.RefId  ='ccXwZWYmukJdvzFrWaccN8bNr83caECQjC+vvuEaIKY=';
// queryOpdDischargeDto.PatientInfo.TransactionNo  ='5c5aabb3-b919-4ee8-ac42-848ae4d5f55a';
//   queryOpdDischargeDto.PatientInfo.VN ='O415202-67'
  const newQueryProcedeureDatabaseBodyDto ={
    RefId:queryOpdDischargeDto.PatientInfo.RefId,
    TransactionNo: queryOpdDischargeDto.PatientInfo.TransactionNo,
    InsurerCode:queryOpdDischargeDto.PatientInfo.InsurerCode,
    HN:queryOpdDischargeDto.PatientInfo.HN,
    VN:queryOpdDischargeDto.PatientInfo.VN
  }
  //const getOPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 
   let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];
   const getOPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto)
// console .log("getOPDDischargeProcedure")
// console .log(getOPDDischargeProcedure)
   if (getOPDDischargeProcedure && getOPDDischargeProcedure.Result.ProcedureInfo && getOPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
      newResultProcedureInfoDto= await Promise.all(
       getOPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
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

  const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeProcedure(queryOpdDischargeDto.PatientInfo.VN);
 // console.log(TrakcarepatientInfo)
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

  let newResultOpdDischargeProcedurDto= new ResultOpdDischargeProcedurDto();
  newResultOpdDischargeProcedurDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultOpdDischargeProcedurDto
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
async getOPDDischargeAccident(queryOpdDischargeDto:QueryOpdDischargeDto){
  let xResultInfo;
try{
const newQueryAccidentDatabaseBodyDto ={
  RefId: queryOpdDischargeDto.PatientInfo.RefId,
  TransactionNo: queryOpdDischargeDto.PatientInfo.TransactionNo,
  InsurerCode:queryOpdDischargeDto.PatientInfo.InsurerCode,
  VN: queryOpdDischargeDto.PatientInfo.VN,
  HN:queryOpdDischargeDto.PatientInfo.HN,

}
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
  const FurtherClaimVN =queryOpdDischargeDto.PatientInfo.FurtherClaimVN
    if (FurtherClaimVN){queryOpdDischargeDto.PatientInfo.VN = FurtherClaimVN}
    const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeAccident(queryOpdDischargeDto.PatientInfo.VN);
    const xAccientdata =queryOpdDischargeDto.PatientInfo.AccidentDate
    const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
    if (TrakcarepatientInfoStatusCode !==200){
      this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
      let xCauseOfInjuryDetail,xInjuryDetail,xQueryAccident
     if (xAccientdata){

       xCauseOfInjuryDetail =[{
        CauseOfInjury: 'X599',
        CommentOfInjury: '',
       } ]
        xInjuryDetail =[{
        WoundType: '',
        InjurySide: '',
        InjuryArea: 'T149',
       } ]
       xQueryAccident ={    
        AccidentPlace: '', 
        AccidentDate: '',
        CauseOfInjuryDetail:xCauseOfInjuryDetail,
        InjuryDetail:xInjuryDetail
       }
     }else{

       xCauseOfInjuryDetail =[{
        CauseOfInjury: '',
        CommentOfInjury: '',
       } ]
        xInjuryDetail =[{
        WoundType: '',
        InjurySide: '',
        InjuryArea: '',
       } ]
       xQueryAccident ={    
        AccidentPlace: '', 
        AccidentDate: '',
        CauseOfInjuryDetail:xCauseOfInjuryDetail,
        InjuryDetail:xInjuryDetail
       }
     }
      
       xResultInfo ={
        AccidentDetailInfo: xQueryAccident,
       } 
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      const xQueryAccident:QueryAccident= TrakcarepatientInfo.AccidentDetailInfo ? {
        AccidentPlace: TrakcarepatientInfo.AccidentDetailInfo.AccidentPlace || '', 
        AccidentDate: TrakcarepatientInfo.AccidentDetailInfo.AccidentDate || '',
        CauseOfInjuryDetail: TrakcarepatientInfo.AccidentDetailInfo.CauseOfInjuryDetail 
          ? TrakcarepatientInfo.AccidentDetailInfo.CauseOfInjuryDetail.map((cause) => ({
              CauseOfInjury: cause.CauseOfInjury || '',
              CommentOfInjury: cause.CommentOfInjury || ''
            }))
          : [],
        InjuryDetail: TrakcarepatientInfo.AccidentDetailInfo.InjuryDetail 
          ? TrakcarepatientInfo.AccidentDetailInfo.InjuryDetail.map((injury) => ({
              WoundType: injury.WoundType || '',
              InjurySide: injury.InjurySide || '',
              InjuryArea: injury.InjuryArea || ''
            }))
          : []
      }
    : {};
      xResultInfo ={
        AccidentDetailInfo: xQueryAccident,
       } 
     
    }

}
  let newResultOpdDischargeAccidentDto= new ResultOpdDischargeAccidentDto();
  newResultOpdDischargeAccidentDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultOpdDischargeAccidentDto
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

async getListVisitClaimAIA(queryOpdDischargeDto:QueryOpdDischargeDto){
  let xResultInfo;
try{
 
  const TrakcarepatientInfo = await this.trakcareService.getListVisitClaimAIA(queryOpdDischargeDto.PatientInfo.VN);
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





async SubmitVisit(queryVisitDto:QueryVisitDto){
  let medicalTransaction;
  try{
    const xRefId =queryVisitDto.PatientInfo.RefId;
    const xTransactionNo =queryVisitDto.PatientInfo.TransactionNo;
    const xInsurerCode =queryVisitDto.PatientInfo.InsurerCode;
    const xHN =queryVisitDto.PatientInfo.HN;
    const xVN =queryVisitDto.PatientInfo.VN;

    const xVisitDateTime =queryVisitDto.PatientInfo.VisitDateTime||'';
    const xDxFreeText =queryVisitDto.PatientInfo.DxFreeText||'';
    const xPresentIllness =queryVisitDto.PatientInfo.PresentIllness||'';
    const xChiefComplaint =queryVisitDto.PatientInfo.ChiefComplaint||'';
    const xAccidentCauseOver45Days =queryVisitDto.PatientInfo.AccidentCauseOver45Days||'';
    const xUnderlyingCondition =queryVisitDto.PatientInfo.UnderlyingCondition||'';
    const xPhysicalExam =queryVisitDto.PatientInfo.PhysicalExam||'';
    const xPlanOfTreatment =queryVisitDto.PatientInfo.PlanOfTreatment||'';
    const xProcedureFreeText =queryVisitDto.PatientInfo.ProcedureFreeText||'';
    const xAdditionalNote =queryVisitDto.PatientInfo.AdditionalNote||'';
    const xSignSymptomsDate =queryVisitDto.PatientInfo.SignSymptomsDate||'';
    const xComaScore =queryVisitDto.PatientInfo.ComaScore||'';
    const xExpectedDayOfRecovery =queryVisitDto.PatientInfo.ExpectedDayOfRecovery||'';

    const xHaveProcedure =Boolean(queryVisitDto.PatientInfo.HaveProcedure) || false;
    const xHaveAccidentCauseOfInjuryDetail =Boolean(queryVisitDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false;
    const xHaveAccidentInjuryDetail =Boolean(queryVisitDto.PatientInfo.HaveAccidentInjuryDetail) || false;
    const xAlcoholRelated =Boolean(queryVisitDto.PatientInfo.AlcoholRelated) || false;
    const xPregnant =Boolean(queryVisitDto.PatientInfo.Pregnant) || false;
    const xPrivateCase =Boolean(queryVisitDto.PatientInfo.PrivateCase) || false;
    const xHeight =queryVisitDto.PatientInfo.Height||'';
    const xWeight =queryVisitDto.PatientInfo.Weight||'';


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
        vn: xVN,
        dxfreetext: xDxFreeText,
        presentillness:xPresentIllness,
        chiefcomplaint: xChiefComplaint,
        accidentcauseover45days: xAccidentCauseOver45Days,
        underlyingcondition: xUnderlyingCondition,
        physicalexam:xPhysicalExam,
        planoftreatment: xPlanOfTreatment,
        procedurefreetext: xProcedureFreeText,
        additionalnote:xAdditionalNote,
        signsymptomsdate: xSignSymptomsDate,
        comascore: xComaScore,
        expecteddayofrecovery: xExpectedDayOfRecovery,
        pregnant:xPregnant,
        alcoholrelated: xAlcoholRelated,
        haveaccidentinjurydetail: xHaveAccidentInjuryDetail,
        haveaccidentcauseofinjurydetail: xHaveAccidentCauseOfInjuryDetail,
        haveprocedure: xHaveProcedure,
        privatecase:xPrivateCase,
        visitdatetime:xVisitDateTime,
        height:xHeight,
        weight:xWeight
      },
    });
  }catch (error) {
    throw new Error(`Error creating medical transaction: ${error.message}`);
  }
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
}else{
    this.addFormatHTTPStatus(newHttpMessageDto,400,'Invalid VisitDetail','')
}

    let newResultSubmitProcedureDto= new ResultSubmitProcedureDto();
    newResultSubmitProcedureDto={
            HTTPStatus:newHttpMessageDto,
            Result:medicalTransaction
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

async SubmitAccident(queryAccidentDto:QueryAccidentDto){
  let xResultInfo,xCauseOfInjuryDetail ,xInjuryDetail;
  try{
    const xRefId =queryAccidentDto.PatientInfo.RefId;
    const xTransactionNo =queryAccidentDto.PatientInfo.TransactionNo;
    const xInsurerCode =queryAccidentDto.PatientInfo.InsurerCode;
    const xHN =queryAccidentDto.PatientInfo.HN;
    const xVN =queryAccidentDto.PatientInfo.VN;
    const xHaveAccidentCauseOfInjuryDetail =Boolean(queryAccidentDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false
    const xHaveAccidentInjuryDetail =Boolean(queryAccidentDto.PatientInfo.HaveAccidentInjuryDetail) || false
    const xAccidentPlace =queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentPlace;
    const xAccidentDate =queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentDate;
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

async SubmitOPDDischargeToAIA(querySubmitOpdDischargeDto:QuerySubmitOpdDischargeDto){
  let xResultInfo;
  // console.log('--------0000000--------')
  // console.log(querySubmitOpdDischargeDto)
  // console.log('--------1111111--------')
try{
 const RequesetBody ={
  xRefId:querySubmitOpdDischargeDto.PatientInfo.RefId, //'oljhnklefhbilubsEFJKLb65255555',
  xTransactionNo: querySubmitOpdDischargeDto.PatientInfo.TransactionNo,//'6f49b02c-4102-44e4-bd6a-c5bed5dc8b1c',
  xHN :querySubmitOpdDischargeDto.PatientInfo.HN ,//'62-027770',
  xInsurerCode: querySubmitOpdDischargeDto.PatientInfo.InsurerCode, //'13', 
  xVN: querySubmitOpdDischargeDto.PatientInfo.VN ,//'O415202-67',
  xVisitDateTime :querySubmitOpdDischargeDto.PatientInfo.VisitDateTime,
  xFurtherClaimId : querySubmitOpdDischargeDto.PatientInfo.FurtherClaimId,
  xFurtherClaimNo : querySubmitOpdDischargeDto.PatientInfo.FurtherClaimNo,
  xAccidentDate:querySubmitOpdDischargeDto.PatientInfo.AccidentDate,
  xAccidentPlaceCode :querySubmitOpdDischargeDto.PatientInfo.AccidentPlaceCode,
  xIdType:querySubmitOpdDischargeDto.PatientInfo.IdType,
  xPolicyTypeCode :querySubmitOpdDischargeDto.PatientInfo.PolicyTypeCode,
  xServiceSettingCode:querySubmitOpdDischargeDto.PatientInfo.ServiceSettingCode,
  xSurgeryTypeCode:querySubmitOpdDischargeDto.PatientInfo.SurgeryTypeCode,
  xIllnessTypeCode:querySubmitOpdDischargeDto.PatientInfo.IllnessTypeCode,
  xRunningdocument:querySubmitOpdDischargeDto.PatientInfo.Runningdocument,
  xFurtherClaimVN :querySubmitOpdDischargeDto.PatientInfo.FurtherClaimVN,
  xOrderVitamin: querySubmitOpdDischargeDto.PatientInfo.OrderVitamin,
 }
 const FurtherClaimVN =RequesetBody.xFurtherClaimVN
 
////////////////////////////////////////
//--> get Patient  <--//
const getOPDDischargePatient = await this.trakcareService.getOPDDischargePatient(RequesetBody.xHN);
let newResultPatientInfoDto: ResultPatientInfoDto ;
if (getOPDDischargePatient && getOPDDischargePatient.PatientInfo && getOPDDischargePatient.PatientInfo.HN.length > 0) {
   newResultPatientInfoDto = {
      Dob: await this.utilsService.EncryptAESECB(getOPDDischargePatient.PatientInfo.Dob,AIA_APISecretkey) ,
      Hn: await this.utilsService.EncryptAESECB(getOPDDischargePatient.PatientInfo.HN,AIA_APISecretkey) ,
      Gender: getOPDDischargePatient.PatientInfo.Gender
 };
}else{
   newResultPatientInfoDto = {
    Dob:'',
    Hn:'',
    Gender:''
  };
}
console.log('getOPDDischargePatient done')
//console.log(newResultPatientInfoDto)
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
  const getvisitformDatabase = await this.utilsService.getvisitformDatabase(newQueryVisitDatabaseBodyDto)
   newResultVisitInfoDto= {
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
    Vn:  getvisitformDatabase.Result.VisitInfo.VN||'',
    Weight: getvisitformDatabase.Result.VisitInfo.Weight||''
  }
  console.log('getOPDDischargeVisit done from database')
}else{
  let VNForVisitinfo ;
  if (FurtherClaimVN){VNForVisitinfo = FurtherClaimVN}
  else {VNForVisitinfo =RequesetBody.xVN}
 
  const getOPDDischargeVisit = await this.trakcareService.getOPDDischargeVisit(VNForVisitinfo);
  newResultVisitInfoDto= {
    FurtherClaimId: '',
    AccidentCauseOver45Days: '',
    AdditionalNote: getOPDDischargeVisit.VisitInfo.AdditionalNote,
    AlcoholRelated: getOPDDischargeVisit.VisitInfo.AlcoholRelated,
    ChiefComplaint: getOPDDischargeVisit.VisitInfo.ChiefComplaint,
    ComaScore: getOPDDischargeVisit.VisitInfo.ComaScore,
    DxFreeText: getOPDDischargeVisit.VisitInfo.DxFreeText,
    ExpectedDayOfRecovery: '',
    Height: '',
    PhysicalExam: '',
    PlanOfTreatment: '',
    Pregnant: getOPDDischargeVisit.VisitInfo.Pregnant,
    PresentIllness: '',
    PreviousTreatmentDate: '',
    PreviousTreatmentDetail: '',
    PrivateCase: getOPDDischargeVisit.VisitInfo.PrivateCase,
    ProcedureFreeText: getOPDDischargeVisit.VisitInfo.ProcedureFreeText,
    SignSymptomsDate: '',
    UnderlyingCondition: '',
    VisitDateTime: getOPDDischargeVisit.VisitInfo.VisitDateTime,
    Vn:  await this.utilsService.EncryptAESECB( getOPDDischargeVisit.VisitInfo.VisitDateTime,AIA_APISecretkey) ,
    Weight: ''
  }
  console.log('getOPDDischargeVisit done from trakcare')
}


// //console.log(newResultVisitInfoDto)
// //--> get VitalSignIn  <--//
const getOPDDischargeVitalSign = await this.trakcareService.getOPDDischargeVitalSign(RequesetBody.xVN);
let newResultVitalSignInfoDto: ResultVitalSignInfoDto[] = [];
  if (getOPDDischargeVitalSign && getOPDDischargeVitalSign.VitalSignInfo && getOPDDischargeVitalSign.VitalSignInfo.length > 0) {
      newResultVitalSignInfoDto= await Promise.all(
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
}
console.log('getOPDDischargeVitalSign done')
// //--> get Diagnosis  <--//
let VNForDiagnosisinfo ;
if (FurtherClaimVN){VNForDiagnosisinfo = FurtherClaimVN}
else {VNForDiagnosisinfo =RequesetBody.xVN}
const getOPDDischargeDiagnosis = await this.trakcareService.getOPDDischargeDiagnosis(VNForDiagnosisinfo);
let getDiagnosisTypeMapping 
let newQueryDiagnosisInfoDto: ResultDiagnosisInfoDto[] = [];
  if (getOPDDischargeDiagnosis && getOPDDischargeDiagnosis?.DiagnosisInfo && getOPDDischargeDiagnosis?.DiagnosisInfo.length > 0) {

   newQueryDiagnosisInfoDto= await Promise.all(
      getOPDDischargeDiagnosis.DiagnosisInfo.map(async (item) => {
       getDiagnosisTypeMapping = await this.utilsService.getDiagnosisTypeMapping(
        ''+RequesetBody.xInsurerCode, 
        item.DxTypeCode
      );
      if (item.DxTypeCode === getDiagnosisTypeMapping.Result.dxtypecodetrakcare) {
        item.DxTypeCode = getDiagnosisTypeMapping.Result.dxtypecodeinsurance;
      }
     /* const countDiag =getOPDDischargeDiagnosis.DiagnosisInfo.length
      const FirstTextDxCode = item.DxCode[0]
      if ((countDiag ===1) &&(FirstTextDxCode ==='Z')){
        return {
          DxName: item.DxName,
          DxType: item.DxTypeCode,
          Icd10: '0000000000',
          
        };
      }else{

        return {
          DxName: item.DxName,
          DxType: item.DxTypeCode,
          Icd10: item.DxCode,
          
        };
      } */
      return {
        DxName: item.DxName,
        DxType: item.DxTypeCode,
        Icd10: item.DxCode,
        
      };
     
    })
  );
  
} else {
  newQueryDiagnosisInfoDto = [{
    DxName: '',
    DxType: '',
    Icd10: '',
  }];
}
console.log("newQueryDiagnosisInfoDto")
console.log(newQueryDiagnosisInfoDto)
console.log('getOPDDischargeDiagnosis done')

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

  // if (accidentDatabase){
  //   newAccidentDetail.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
  //   newAccidentDetail.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';
     
  //   newAccidentDetail= {
  //     "AccidentPlace": accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '',
  //     "AccidentDate": accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '',
  //     "CauseOfInjuryDetail": [
  //         {
  //             "CauseOfInjury": 'W1099',
  //             "CommentOfInjury": ''
  //         }
  //     ],
  //     "InjuryDetail": [
  //         {
  //             "WoundType": "",
  //             "InjurySide": "",
  //             "InjuryArea":'S099'
  //         }
  //     ]
  // }
  // }
  
 
//   if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
//     newAccidentDetail.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
        
//         causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
//         causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
//         return causeDetail;
//     });
// } 
// if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
//   newAccidentDetail.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
         
//         injuryDetail.WoundType = injury.WoundType || '';
//         injuryDetail.InjurySide = injury.InjurySide || '';
//         injuryDetail.InjuryArea = injury.InjuryArea || '';
//         return injuryDetail;
//     });
// }
//console.log(newAccidentDetail)
// const xQueryAccident ={    
//   AccidentPlace: '', 
//   AccidentDate: '',
//   CauseOfInjuryDetail:[causeDetail] ,
//   InjuryDetail:[injuryDetail]
//  }


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

// //--> get AccidentDetail  <--//

// //--> get Procedure  <--//
// step 1 query in database

    const whereConditions = {
    
      ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
      ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
      ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
    };
let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];
const existingProcedureRecord = await prismaProgest.proceduretransactions.findFirst({
  where: whereConditions
});
let getOPDDischargeProcedure ;
if(existingProcedureRecord){
   getOPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 
   if (getOPDDischargeProcedure && getOPDDischargeProcedure.ProcedureInfo && getOPDDischargeProcedure.ProcedureInfo.length > 0) {
      newResultProcedureInfoDto= await Promise.all(
       getOPDDischargeProcedure.ProcedureInfo.map(async (item) => {
       return {
         Icd9: item.Icd9,
         ProcedureName: item.ProcedureName,
         ProcedureDate: item.ProcedureDate,
         
       };
     })
   );
 } else {
 newResultProcedureInfoDto = [{
     Icd9: '',
     ProcedureName: '',
     ProcedureDate: '',
   }];
 }
}else{
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
 
   getOPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto)
  // console.log('33333')
  if (getOPDDischargeProcedure && getOPDDischargeProcedure.Result.ProcedureInfo && getOPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
     newResultProcedureInfoDto= await Promise.all(
      getOPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
      return {
        Icd9: item.Icd9,
        ProcedureName: item.ProcedureName,
        ProcedureDate: item.ProcedureDate,
        
      };
    })
  );
  // console.log('555555')
  // console.log(newResultProcedureInfoDto)
  // console.log('555555')

} else {
 // console.log('4444')
  newResultProcedureInfoDto = [{
    Icd9: '',
    ProcedureName: '',
    ProcedureDate: '',
  }];
}
/*
{
  HTTPStatus: HttpMessageDto { statusCode: 200, message: 'success', error: '' },
  Result: ProcedeureDatabaseResultInfo {
    ProcedureInfo: [ [Object], [Object] ]
  }
}
*/
}
// console.log('*******')
// console.log(getOPDDischargeProcedure.Result)
// console.log('*******')
 //getOPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 


// //--> get Investigation  <--//
const getOPDDischargeInvestigation = await this.trakcareService.getOPDDischargeInvestigation(RequesetBody.xVN); 
let newResultInvestigationInfoDto: ResultInvestigationInfoDto[] = [];
  if (getOPDDischargeInvestigation && getOPDDischargeInvestigation.InvestigationInfo && getOPDDischargeInvestigation.InvestigationInfo.length > 0) {
    newResultInvestigationInfoDto= await Promise.all(
      getOPDDischargeInvestigation.InvestigationInfo.map(async (item) => {
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
  newResultInvestigationInfoDto = [{
    InvestigationCode: '',
    InvestigationGroup: '',
    InvestigationName: '',
    InvestigationResult: '',
    ResultDateTime: ''
  }];
}
console.log('Investigation done')
// //--> get OrderItem  <--//
const getOPDDischargeOrderItem = await this.trakcareService.getOPDDischargeOrderItem(RequesetBody.xVN); 
let newResultOrderItemInfoDto : ResultOrderItemInfoDto[] = [];
   if (getOPDDischargeOrderItem && getOPDDischargeOrderItem.OrderItemInfo && getOPDDischargeOrderItem.OrderItemInfo.length > 0) {
    newResultOrderItemInfoDto= await Promise.all(
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
}
console.log('OrderItem done')
// //--> get Doctor  <--//
let VNForDoctorinfo ;
if (FurtherClaimVN){VNForDoctorinfo = FurtherClaimVN}
else {VNForDoctorinfo =RequesetBody.xVN}
const getOPDDischargeDoctor = await this.trakcareService.getOPDDischargeDoctor(VNForDoctorinfo); 
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
console.log('Doctor done')
// //console.log(newResultDoctorInfoDto)
//  // ResultBillingInfoDto ,ResultTotalBillAmountInfoDto
// //--> get Billing  <--//
const getOPDDischargeBilling = await this.trakcareService.getOPDDischargeBilling(RequesetBody.xVN); 
let newResultBillingInfoDto : ResultBillingInfoDto[] = [];
let  newTotalBillAmount ;
   if (getOPDDischargeBilling && getOPDDischargeBilling.BillingInfo && getOPDDischargeBilling.BillingInfo.length > 0) {
       newTotalBillAmount = getOPDDischargeBilling.TotalBillAmount
      // console.log(newTotalBillAmount)
      newResultBillingInfoDto= await Promise.all(
      getOPDDischargeBilling.BillingInfo.map(async (item) => {
      if (item.LocalBillingCode =='0101015'){
                console.log('Vitamin')
            item.LocalBillingCode ='0101013'
            item.LocalBillingName ='1.1.1(13) ค่ายาผู้ป่วยนอก'
            item.SimbBillingCode ='1.1.1(13)'
            item.PayorBillingCode ='1.1.1(13)'  
          }
          if (item.LocalBillingCode =='01230001'){
            console.log('ค่าวิสัญญีแพทย์ และ/ หรือ วิสัญญีพยาบาล')
            item.LocalBillingCode ='0121001'
            item.LocalBillingName ='1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก'
            item.SimbBillingCode ='1.2.1(1)'
            item.PayorBillingCode ='1.2.1(1)'
          }
    
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
console.log('billing done')
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


let newResultDataJsonDto =new ResultDataJsonDto();
 newResultDataJsonDto ={
  Patient :newResultPatientInfoDto,
   Visit: newResultVisitInfoDto,
   VitalSign :newResultVitalSignInfoDto,
  Diagnosis :newQueryDiagnosisInfoDto,
  AccidentDetail:newAccidentDetail,
   Procedure :newResultProcedureInfoDto,
   Investigation :newResultInvestigationInfoDto,
  OrderItem :newResultOrderItemInfoDto,
  Doctor : newResultDoctorInfoDto,
  Billing :newResultBillingInfoDto,
   TotalBillAmount:newTotalBillAmount,
   Pss: newResultPSSInfoDto
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

 //////////////////////////////////////
      const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       const apiURL= `${AIA_APIURL}/SmartClaim/opdDischarge`;

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
 
    //const xDummyDataRespone1 =new DummyDataRespone1();
//const responsefromAIA  =xDummyDataRespone1.res
    
  const responeInputcode = responsefromAIA.Result.Code
  // console.log('======> responeInputcode =')
  // console.log(responeInputcode)
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
      furtherclaimid:RequesetBody.xFurtherClaimId,
      furtherclaimno: RequesetBody.xFurtherClaimNo,
      visitdatetime:RequesetBody.xVisitDateTime,
      accidentdate:RequesetBody.xAccidentDate,
      policytypecode:RequesetBody.xPolicyTypeCode,
      idtype:RequesetBody.xIdType,
      //illnesstypecode:RequesetBody.xIllnessTypeCode,
      servicesettingcode:RequesetBody.xServiceSettingCode,
      surgerytypecode:RequesetBody.xSurgeryTypeCode,
      // runningdocument:RequesetBody.xRunningdocument
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
      // claimstatuscode:'02',
      // claimstatusdesc:'Approve',
      // claimstatusdesc_en:'Approve',
      // claimstatusdesc_th:'อนุมัติการเรียกร้องสินไหม',
      occurrenceno:responsefromAIA.Data.OccurrenceNo,
      invoicenumber:responsefromAIA.Data.InvoiceNumber,
      totalapprovedamount:responsefromAIA.Data.TotalApprovedAmount,
      totalexcessamount:responsefromAIA.Data.TotalExcessAmount,
      isreimbursement:responsefromAIA.Data.IsReimbursement,
      furtherclaimid:RequesetBody.xFurtherClaimId,
      furtherclaimno: RequesetBody.xFurtherClaimNo,
      visitdatetime:RequesetBody.xVisitDateTime,
      accidentdate:RequesetBody.xAccidentDate,
      policytypecode:RequesetBody.xPolicyTypeCode,
      idtype:RequesetBody.xIdType,
      //illnesstypecode:RequesetBody.xIllnessTypeCode,
      servicesettingcode:RequesetBody.xServiceSettingCode,
      surgerytypecode:RequesetBody.xSurgeryTypeCode,
      // runningdocument:RequesetBody.xRunningdocument
    },
  });

}


  this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }
  let newResultSubmitOpdDischargeDto= new ResultSubmitOpdDischargeDto();
  newResultSubmitOpdDischargeDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultSubmitOpdDischargeDto
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

async ReviewOPDDischarge(queryReviewOpdDischargeDto:QueryReviewOpdDischargeDto){
  let xResultInfo;
try{
 const RequesetBody ={
  xRefId:queryReviewOpdDischargeDto.PatientInfo.RefId, //'oljhnklefhbilubsEFJKLb65255555',
  xTransactionNo: queryReviewOpdDischargeDto.PatientInfo.TransactionNo,//'6f49b02c-4102-44e4-bd6a-c5bed5dc8b1c',
  xHN :queryReviewOpdDischargeDto.PatientInfo.HN ,//'62-027770',
  xInsurerCode: queryReviewOpdDischargeDto.PatientInfo.InsurerCode, //'13', 
  xVN: queryReviewOpdDischargeDto.PatientInfo.VN ,//'O415202-67',
  xHaveProcedure: queryReviewOpdDischargeDto.PatientInfo.VN ,//'O415202-67',
  xHaveAccidentCauseOfInjuryDetail: queryReviewOpdDischargeDto.PatientInfo.HaveAccidentCauseOfInjuryDetail ,//'O415202-67',
  xHaveAccidentInjuryDetail: queryReviewOpdDischargeDto.PatientInfo.HaveAccidentInjuryDetail ,//'O415202-67',

 }

//--> get Patient  <--//
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
console.log('getOPDDischargePatient done')
// //--> get Visit  <--//
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

 //const getOPDDischargeVisit = await this.trakcareService.getOPDDischargeVisit(RequesetBody.xVN);
// //let newResultVisitInfoDto : ResultVisitInfoDto;
// const newResultReviewVisitInfoDto : ResultReviewVisitInfoDto= {
//   FurtherClaimId: '',
//   AccidentCauseOver45Days: '',
//   AdditionalNote: getOPDDischargeVisit.VisitInfo.AdditionalNote,
//   AlcoholRelated: getOPDDischargeVisit.VisitInfo.AlcoholRelated,
//   ChiefComplaint: getOPDDischargeVisit.VisitInfo.ChiefComplaint,
//   ComaScore: getOPDDischargeVisit.VisitInfo.ComaScore,
//   DxFreeText: getOPDDischargeVisit.VisitInfo.DxFreeText,
//   ExpectedDayOfRecovery: '',
//   Height: '',
//   PhysicalExam: '',
//   PlanOfTreatment: '',
//   Pregnant: getOPDDischargeVisit.VisitInfo.Pregnant,
//   PresentIllness: '',
//   PreviousTreatmentDate: '',
//   PreviousTreatmentDetail: '',
//   PrivateCase: getOPDDischargeVisit.VisitInfo.PrivateCase,
//   ProcedureFreeText: getOPDDischargeVisit.VisitInfo.ProcedureFreeText,
//   SignSymptomsDate: '',
//   UnderlyingCondition: '',
//   VisitDateTime: getOPDDischargeVisit.VisitInfo.VisitDateTime,
//   VN:  '',
//   Weight: ''
// }
//


console.log('getOPDDischargeVisit done')
// //console.log(newResultVisitInfoDto)
// //--> get VitalSignIn  <--//
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
console.log('getOPDDischargeVitalSign done')
// //--> get Diagnosis  <--//
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
console.log('getOPDDischargeDiagnosis done')
// //--> get Procedure  <--//
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
console.log('Procedure done')
// //--> get AccidentDetail  <--//

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
console.log('AccidentDatabase done')
// //--> get Investigation  <--//
let newResultReviewInvestigationInfoDto: ResultReviewInvestigationInfoDto[] = [];
const getOPDDischargeInvestigation = await this.trakcareService.getOPDDischargeInvestigation(RequesetBody.xVN); 
  if (getOPDDischargeInvestigation && getOPDDischargeInvestigation.InvestigationInfo && getOPDDischargeInvestigation.InvestigationInfo.length > 0) {
    newResultReviewInvestigationInfoDto= await Promise.all(
      getOPDDischargeInvestigation.InvestigationInfo.map(async (item) => {
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
console.log('Investigation done')
// //--> get OrderItem  <--//
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
console.log('OrderItem done')
// //--> get Doctor  <--//
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
console.log('Doctor done')
// //console.log(newResultDoctorInfoDto)
//  // ResultBillingInfoDto ,ResultTotalBillAmountInfoDto
// //--> get Billing  <--//
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
console.log('billing done')
//  //  

let newResultReviewDataJsonDto =new ResultReviewDataJsonDto();
newResultReviewDataJsonDto ={
  Patient :newResultReviewPatientInfoDto,
   Visit: newResultReviewVisitInfoDto,  // --->>>>> Here
   VitalSign :newResultReviewVitalSignInfoDto,
  Diagnosis :newResultReviewDiagnosisInfoDto,
  AccidentDetail:accidentDetailInfo,  // --->>>>> Here
   Procedure :newResultProcedureDatabaseInfoDto,  // --->>>>> Here  done
   Investigation :newResultReviewInvestigationInfoDto,
  OrderItem :newResultReviewOrderItemInfoDto,
  Doctor : newResultReviewDoctorInfoDto,
  Billing :newResultReviewBillingInfoDto,
   TotalBillAmount:newTotalBillAmount,
   InvoiceNumber:newInvoiceNumber
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

if ((newResultReviewDataJsonDto.TotalBillAmount)||(newResultReviewDataJsonDto.InvoiceNumber)){

  const QueryUpdateBill = {
    ...(newResultReviewDataJsonDto.TotalBillAmount ? { totalbillamount: newResultReviewDataJsonDto.TotalBillAmount } : {}),
    ...(newResultReviewDataJsonDto.InvoiceNumber ? { invoicenumber: newResultReviewDataJsonDto.InvoiceNumber } : {}),
  };


  await prismaProgest.transactionclaim.updateMany({
    where: {
      refid: RequesetBody.xRefId,
      transactionno: RequesetBody.xTransactionNo,
      vn: RequesetBody.xVN
    },
    data: QueryUpdateBill  // ใช้ filteredQueryUpdateBill ที่ถูกต้อง
  });



  // await prismaProgest.transactionclaim.update({
  //    where: {
  //       refid: RequesetBody.xRefId,
  //       transactionno: RequesetBody.xTransactionNo,
  //      vn:RequesetBody.xVN
  //     },data:filteredQueryUpdateBill
  // });

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

async UpdateFurtherClaimVN(queryVisitDto:QueryUpdateFurtherClaimVNBodyDto){
  let updatestatus;
  try{
    const xRefId =queryVisitDto.PatientInfo.RefId;
    const xTransactionNo =queryVisitDto.PatientInfo.TransactionNo;
    const xHN =queryVisitDto.PatientInfo.HN;
    const xVN =queryVisitDto.PatientInfo.VN
    const xFurtherClaimVN =queryVisitDto.PatientInfo.FurtherClaimVN;
if ((xTransactionNo)&&(xFurtherClaimVN)){
 
    const checkVisitNumberAvailable = await this.trakcareService.checkVisitNumberAvailable(xHN ,xFurtherClaimVN); 
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
            furtherclaimvn:xFurtherClaimVN
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

    let newResultSubmitUpdateFurtherClaimVNDto= new ResultSubmitUpdateFurtherClaimVNDto();
    newResultSubmitUpdateFurtherClaimVNDto={
            HTTPStatus:newHttpMessageDto,
            Result:updatestatus
      }

    return newResultSubmitUpdateFurtherClaimVNDto
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

async convertDxTypeCode(inputInsurerCode:string,inputdxTypeCodeTrakcare:string) {
    const convertDxtypename = await this.utilsService.getDiagnosisTypeMapping(inputInsurerCode,inputdxTypeCodeTrakcare);
   return convertDxtypename
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
          data.message=inputmessage||'success'
          data.error=''
        }
      }
      
  }
}
