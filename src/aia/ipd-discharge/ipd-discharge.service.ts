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


import { QueryIpdDischargeDto } from './dto/query-ipd-discharge.dto'

import { ResultIpdDischargeVisitDto ,QueryVisit ,ResultIPDVisitInfoDto} from './dto/result-visit-ipd-discharge.dto';
import { ResultIPDVitalSignDto ,QueryVitalSign } from './dto/result-vitalsign-ipd-discharge.dto';
import { ResultIpdDischargeDoctorDto ,QueryDoctor } from './dto/result-doctor-ipd-discharge.dto';
import { ResultIpdDischargeDiagnosisDto ,QueryDiagnosis} from './dto/result-diagnosis-ipd-discharge.dto';
import { ResultIpdDischargeInvestigationDto ,QueryInvestigation} from './dto/result-investigation-ipd-discharge.dto';
import { ResultIpdDischargeOrderItemDto ,QueryOrderItem} from './dto/result-orderitem-ipd-discharge.dto';
import { ResultIpdDischargeBillingDto ,QueryBilling} from './dto/result-billing-ipd-discharge.dto';
import { ResultIpdDischargeProcedurDto, QueryProcedure} from './dto/result-procedure-ipd-discharge.dto'
import { ResultIpdDischargeAccidentDto ,AccidentDetailDto } from './dto/result-accident-ipd-discharge.dto';
import { ResultConcurNoteDto ,QueryConcurNote} from './dto/result-concurnote-ipd-discharge.dto';
import { ResultSubmitIPDVisitDto ,QueryIPDVisitDto } from './dto/query-visit-ipd-discharge.dto'
import { ResultSubmitProcedureDto ,QueryProcedureDto} from './dto/query-procedure-ipd-discharge.dto';
import { ResultSubmitAccidentDto ,QueryAccidentDto } from './dto/query-accident-ipd-discharge.dto'
import { ResultSubmitConcurNoteDto ,QueryConcurNoteDto} from './dto/query-concurrentnote-ipd-discharge.dto';
import { QuerySubmitIpdDischargeDto } from './dto/query-submit-ipd-discharge.dto';
import { ResultSubmitIpdDischargeDto ,ResultPatientInfoDto ,ResultVisitInfoDto

 ,ResultDiagnosisInfoDto ,ResultProcedureInfoDto ,ResultVitalSignInfoDto ,ResultInvestigationInfoDto ,ResultOrderItemInfoDto ,ResultDoctorInfoDto ,ResultBillingInfoDto ,ResultAttachDocListInfoDto
  ,ResultConcurrentNoteDto ,ResultDataJsonDto ,InsuranceResult ,InsuranceData
} from './dto/result-submit-ipd-discharge.dto';
import { QueryAccidentDatabaseBodyDto  ,
  CauseOfInjuryDetail,InjuryDetail
}  from '../../utils/dto/result-accident-databse.dto';

import { ResultReviewPatientInfoDto  ,ResultReviewVisitInfoDto ,ResultReviewVitalSignInfoDto ,ResultReviewDiagnosisInfoDto
  ,ResultReviewBillingInfoDto  ,ResultReviewInvestigationInfoDto ,ResultReviewOrderItemInfoDto
  ,ResultReviewDoctorInfoDto ,ResultReviewOpdDischargeDto
  ,ResultReviewDataJsonDto
} from './dto/review-ipd-discharge.dto';
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
export class IpdDischargeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService
  ) {}



async getIPDVisit(queryIpdDischargeDto:QueryIpdDischargeDto){
    let xResultInfo;
  try{
    const newQueryVisitDatabaseBodyDto ={
      RefId: queryIpdDischargeDto.PatientInfo.RefId,
      TransactionNo: queryIpdDischargeDto.PatientInfo.TransactionNo,
      InsurerCode:queryIpdDischargeDto.PatientInfo.InsurerCode,
      HN: queryIpdDischargeDto.PatientInfo.HN,
      VN: queryIpdDischargeDto.PatientInfo.VN,
      IsIPDDischarge :queryIpdDischargeDto.PatientInfo.IsIPDDischarge,
      PreauthReferClaimNo:queryIpdDischargeDto.PatientInfo.PreauthReferClaimNo,
    }

let getvisitformDatabase :any
let DxFreeTextTemp,PhysicalExamTemp ,PresentIllnessTemp ,ChiefComplaintTemp ,PlanOfTreatmenTemp:any

if (newQueryVisitDatabaseBodyDto.IsIPDDischarge == true){
  const getvisitformDatabaseIsIPDDischarge = await this.trakcareService.getIPDVisitIsDischarge(queryIpdDischargeDto.PatientInfo.VN);
  const DxFreeTextIsDischarge = getvisitformDatabaseIsIPDDischarge.VisitInfo.DxFreeText.slice(0,200)
  const PhysicalExamIsDischarge = getvisitformDatabaseIsIPDDischarge.VisitInfo.PhysicalExam.slice(0,1000)
  const PresentIllnessIsDischarge = getvisitformDatabaseIsIPDDischarge.VisitInfo.PresentIllness.slice(0,500)
  const ChiefComplaintTempIsDischarge = getvisitformDatabaseIsIPDDischarge.VisitInfo.ChiefComplaint.slice(0,200)
  const PlanOfTreatmenTempIsDischarge = getvisitformDatabaseIsIPDDischarge.VisitInfo.PlanOfTreatment.slice(0,500)


  DxFreeTextTemp= DxFreeTextIsDischarge
  PhysicalExamTemp= PhysicalExamIsDischarge
  PresentIllnessTemp =PresentIllnessIsDischarge
  ChiefComplaintTemp = ChiefComplaintTempIsDischarge
  PlanOfTreatmenTemp = PlanOfTreatmenTempIsDischarge
}else{

  getvisitformDatabase = await this.utilsService.getvisitIPDformDatabase(newQueryVisitDatabaseBodyDto)
   //anesthesialist
  

  DxFreeTextTemp= getvisitformDatabase.Result.VisitInfo.DxFreeText? getvisitformDatabase.Result.VisitInfo.DxFreeText.slice(0,200):''
  PhysicalExamTemp=getvisitformDatabase.Result.VisitInfo.PhysicalExam? getvisitformDatabase.Result.VisitInfo.PhysicalExam.slice(0,1000):''
  PresentIllnessTemp = getvisitformDatabase.Result.VisitInfo.PresentIllness? getvisitformDatabase.Result.VisitInfo.PresentIllness.slice(0,500):''
  ChiefComplaintTemp = getvisitformDatabase.Result.VisitInfo.ChiefComplaint? getvisitformDatabase.Result.VisitInfo.ChiefComplaint.slice(0,200):''
  PlanOfTreatmenTemp = getvisitformDatabase.Result.VisitInfo.PlanOfTreatment? getvisitformDatabase.Result.VisitInfo.PlanOfTreatment.slice(0,200):''
}

    if (getvisitformDatabase?.Result?.VisitInfo?.VisitDateTime?.length >0){ 

      const newResultReviewVisitInfoDto : ResultIPDVisitInfoDto= {
        
        AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote||'',
        AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated||false,
        ChiefComplaint: ChiefComplaintTemp||'' ,//getvisitformDatabase.Result.VisitInfo.ChiefComplaint||'',
        ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore||'',
        DxFreeText:DxFreeTextTemp||'', // getvisitformDatabase.Result.VisitInfo.DxFreeText||'',
        ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery||'',
        Height: getvisitformDatabase.Result.VisitInfo.Height||'',
        PhysicalExam: PhysicalExamTemp? PhysicalExamTemp.slice(0,1000):'', //getvisitformDatabase.Result.VisitInfo.PhysicalExam||'',
        PlanOfTreatment: PlanOfTreatmenTemp ||'',//getvisitformDatabase.Result.VisitInfo.PlanOfTreatment||'',
        Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant||false,
        PresentIllness: PresentIllnessTemp||'', // getvisitformDatabase.Result.VisitInfo.PresentIllness||'',
        PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate||'',
        PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail||'',
        PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase||false,
        ProcedureFreeText: getvisitformDatabase.Result.VisitInfo.ProcedureFreeText,
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
        AnesthesiaList:getvisitformDatabase.Result.VisitInfo.AnesthesiaList
      }
      console.log('----00000----')
      console.log(newResultReviewVisitInfoDto.AnesthesiaList)
      console.log('----00000----')
 this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      xResultInfo ={
        VisitInfo: newResultReviewVisitInfoDto,
       } 
    }else{
      let TrakcarepatientInfo:any
      if (newQueryVisitDatabaseBodyDto.IsIPDDischarge == true){

       TrakcarepatientInfo = await this.trakcareService.getIPDVisitIsDischarge(queryIpdDischargeDto.PatientInfo.VN);

     }else{

       TrakcarepatientInfo = await this.trakcareService.getIPDVisit(queryIpdDischargeDto.PatientInfo.VN);

     }
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
            ChiefComplaint: TrakcarepatientInfo.VisitInfo.ChiefComplaint || '',
            ComaScore: TrakcarepatientInfo.VisitInfo.ComaScore || '',
            DxFreeText: TrakcarepatientInfo.VisitInfo.DxFreeText || '',
            ExpectedDayOfRecovery: TrakcarepatientInfo.VisitInfo.ExpectedDayOfRecovery || '',
            ExpectedLos: TrakcarepatientInfo.VisitInfo.ExpectedLos || '',
            Height: TrakcarepatientInfo.VisitInfo.Height || '',
            IndicationForAdmission: TrakcarepatientInfo.VisitInfo.IndicationForAdmission || '',
            PhysicalExam: TrakcarepatientInfo.VisitInfo.PhysicalExam || '',
            PlanOfTreatment: TrakcarepatientInfo.VisitInfo.PlanOfTreatment || '',
            PreauthReferClaimNo: TrakcarepatientInfo.VisitInfo.PreauthReferClaimNo || '',
            PreauthOcc: TrakcarepatientInfo.VisitInfo.PreauthOcc || '',
            Pregnant: TrakcarepatientInfo.VisitInfo.Pregnant || false,
            PresentIllness: TrakcarepatientInfo.VisitInfo.PresentIllness || '',
            PreviousTreatmentDate: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDate || '',
            PreviousTreatmentDetail: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDetail || '',
            PrivateCase: TrakcarepatientInfo.VisitInfo.PrivateCase || false,
            ProcedureFreeText: TrakcarepatientInfo.VisitInfo.ProcedureFreeText || '',
            SignSymptomsDate: TrakcarepatientInfo.VisitInfo.SignSymptomsDate || '',
            UnderlyingCondition: TrakcarepatientInfo.VisitInfo.UnderlyingCondition || '',
            VisitDate: TrakcarepatientInfo.VisitInfo.VisitDate || '',
            VisitDateTime: TrakcarepatientInfo.VisitInfo.VisitDateTime || '',
            DscDateTime: TrakcarepatientInfo.VisitInfo.DscDateTime || '',
            Vn: TrakcarepatientInfo.VisitInfo.Vn || '',
            An: TrakcarepatientInfo.VisitInfo.An || '',
            Weight: TrakcarepatientInfo.VisitInfo.Weight || '',
            IsIPDDischarge: Boolean(TrakcarepatientInfo.VisitInfo.IsIPDDischarge) || false
        } : {};
        xResultInfo ={
          VisitInfo: xQueryVisit,
         } 
      }
     // console.log(' -----get data from trakcare ----')
    }
    let newResultIpdDischargeVisitDto= new ResultIpdDischargeVisitDto();
    newResultIpdDischargeVisitDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  console.log('newResultIpdDischargeVisitDto')

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
async getIPDVitalSign(queryIpdDischargeDto:QueryIpdDischargeDto){
    let xResultInfo;
 try{
   
    const TrakcarepatientInfo = await this.trakcareService.getIPDVitalSign(queryIpdDischargeDto.PatientInfo.VN);
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
    let newResultIPDVitalSignDto= new ResultIPDVitalSignDto();
    newResultIPDVitalSignDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
 
return newResultIPDVitalSignDto
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
async getIPDDischargeDoctor(queryIpdDischargeDto:QueryIpdDischargeDto){
  let xResultInfo;
try{

  const TrakcarepatientInfo = await this.trakcareService.getIPDDoctor(queryIpdDischargeDto.PatientInfo.VN);
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
  let newResultIpdDischargeDoctorDto= new ResultIpdDischargeDoctorDto();
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
async getIPDDischargeDiagnosis(queryIpdDischargeDto:QueryIpdDischargeDto){
  let xResultInfo;
try{

  const TrakcarepatientInfo = await this.trakcareService.getIPDDiagnosis(queryIpdDischargeDto.PatientInfo.VN);
  const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
  if (TrakcarepatientInfoStatusCode !==200){
    this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
   
   
   
    const xQueryDiagnosis ={    
      DxTypeCode: '', 
      DxCode: '',
      DxName: '',
      Dxtypenametrakcare: '',
      Dxtypecodeinsurance: '',
      Dxtypenameinsurance: ''
     }
     xResultInfo ={
      DiagnosisInfo: [xQueryDiagnosis],
     } 
  }else{
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    const xQueryDiagnosis: QueryDiagnosis[] = TrakcarepatientInfo.DiagnosisInfo ? 
    await Promise.all(  TrakcarepatientInfo.DiagnosisInfo.map(async (item) => {
      const convertDxtypename = await this.convertDxTypeCode(''+queryIpdDischargeDto.PatientInfo.InsurerCode,item.DxTypeCode);
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
  let newResultIpdDischargeDiagnosisDto= new ResultIpdDischargeDiagnosisDto();
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
async getIPDDischargeInvestigation(queryIpdDischargeDto:QueryIpdDischargeDto){
  let xResultInfo;
try{
 
  const TrakcarepatientInfo = await this.trakcareService.getIPDInvestigation(queryIpdDischargeDto.PatientInfo.VN);
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
  let newResultIpdDischargeInvestigationDto= new ResultIpdDischargeInvestigationDto();
  newResultIpdDischargeInvestigationDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultIpdDischargeInvestigationDto
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
async getIPDDischargeOrderItem(queryIpdDischargeDto:QueryIpdDischargeDto){
  let xResultInfo;
try{
 
  const TrakcarepatientInfo = await this.trakcareService.getIPDOrderItem(queryIpdDischargeDto.PatientInfo.VN);
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
  let newResultIpdDischargeOrderItemDto= new ResultIpdDischargeOrderItemDto();
  newResultIpdDischargeOrderItemDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultIpdDischargeOrderItemDto
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
async getIPDDischargeBilling(queryIpdDischargeDto:QueryIpdDischargeDto){
  let xResultInfo;
try{
 
  const TrakcarepatientInfo = await this.trakcareService.getIPDBilling(queryIpdDischargeDto.PatientInfo.VN);
  // console.log(TrakcarepatientInfo)
  const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
  if (TrakcarepatientInfoStatusCode !==200){


   
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    const xQueryBilling = { 
    LocalBillingCode: '2.1.1',
    LocalBillingName: 'ค่าห้องผู้ป่วยใน',
    SimbBillingCode: '2.1.1',
    PayorBillingCode: '2.1.1',
    BillingInitial: '10000',
    BillingDiscount: '8000',
    BillingNetAmount: '2000',
  };
/* 
    this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
   const xQueryBilling ={    
      LocalBillingCode: '', 
      LocalBillingName: '',
      SimbBillingCode: '',
      PayorBillingCode: '',
      BillingInitial:'',
      BillingDiscount: '',
      BillingNetAmount:''
     }*/
     xResultInfo ={
      BillingInfo: [xQueryBilling],
      TotalBillAmount:'2000',
      InvoiceNumber:''
     } 
  }else{
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    const xQueryBilling: QueryBilling[] = TrakcarepatientInfo.BillingInfo ? 
    TrakcarepatientInfo.BillingInfo.map((item) => {


 if (item.LocalBillingCode =='0101015'){
  console.log('Vitamin')
  item.LocalBillingCode ='0101012'
  item.LocalBillingName ='1.1.1(12) ค่ายาผู้ป่วยใน'
  item.SimbBillingCode ='1.1.1(12)'
  item.PayorBillingCode ='1.1.1(12)'

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
  let newResultIpdDischargeBillingDto= new ResultIpdDischargeBillingDto();
  newResultIpdDischargeBillingDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultIpdDischargeBillingDto
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
async getIPDDischargeProcedure(queryIpdDischargeDto:QueryIpdDischargeDto){
  let xResultInfo;
try{
// console.log('--------<<<<P>>>>>-----------')
// console.log(queryIpdDischargeDto.PatientInfo.PreauthReferClaimNo)
// console.log('--------<<<<P>>>>>')

  const whereConditions = {
    
    ...(queryIpdDischargeDto.PatientInfo.VN ? { vn: { equals: queryIpdDischargeDto.PatientInfo.VN } } : {}),
    ...(queryIpdDischargeDto.PatientInfo.RefId ? { refid: { equals: queryIpdDischargeDto.PatientInfo.RefId  } } : {}),
    ...(queryIpdDischargeDto .PatientInfo. TransactionNo ? { transactionno: { equals: queryIpdDischargeDto .PatientInfo. TransactionNo } } : {}),

  };
  console.log(whereConditions)
  const existingProcedureRecord = await prismaProgest.proceduretransactions.findFirst({
    where: whereConditions
  });

  console.log(existingProcedureRecord)

 if (existingProcedureRecord){

  const newQueryProcedeureDatabaseBodyDto ={
    RefId:queryIpdDischargeDto.PatientInfo.RefId,
    TransactionNo: queryIpdDischargeDto.PatientInfo.TransactionNo,
    InsurerCode:queryIpdDischargeDto.PatientInfo.InsurerCode,
    HN:queryIpdDischargeDto.PatientInfo.HN,
    VN:queryIpdDischargeDto.PatientInfo.VN
  }
  //const getOPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 
   let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];
   const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto)
// console .log("getOPDDischargeProcedure")
// console .log(getOPDDischargeProcedure)
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

  


  
  const TrakcarepatientInfo = await this.trakcareService.getIPDProcedure(queryIpdDischargeDto.PatientInfo.VN);
  //console.log(TrakcarepatientInfo)
  const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
  if (TrakcarepatientInfoStatusCode !==200){
   

    const existingTransactionRecord = await prismaProgest.transactionclaim.findFirst({
      where: { refid: queryIpdDischargeDto.PatientInfo.RefId,
        transactionno: queryIpdDischargeDto.PatientInfo.TransactionNo,  
      } 
    });
    if (existingTransactionRecord){
      const preauthreferclaimno =existingTransactionRecord.preauthreferclaimno
      if (preauthreferclaimno){
        console.log('ssss')
        const existingPreauthreferclaimno = await prismaProgest.transactionclaim.findFirst({
          where: { claimno:preauthreferclaimno
          
          } 
        });
        const PreauthreferxHN =existingPreauthreferclaimno.hn
        const PreauthreferxVN =existingPreauthreferclaimno.vn

        const PreauthreferxRefid =existingPreauthreferclaimno.refid
        const PreauthreferxTransactionno =existingPreauthreferclaimno.transactionno


        const whereConditions = {
    
          ...(PreauthreferxVN? { vn: { equals: PreauthreferxVN } } : {}),
          ...(PreauthreferxRefid ? { refid: { equals: PreauthreferxRefid  } } : {}),
          ...(PreauthreferxTransactionno ? { transactionno: { equals: PreauthreferxTransactionno } } : {}),
      
        };
        const existingProcedurePreauthreRecord = await prismaProgest.proceduretransactions.findFirst({
          where: whereConditions
        });

//#region  pp
if (existingProcedurePreauthreRecord){
const newQueryProcedeureDatabaseBodyDto ={
  RefId:PreauthreferxRefid,
  TransactionNo: PreauthreferxTransactionno,
  InsurerCode:13,
  HN:PreauthreferxHN,
  VN:PreauthreferxVN
}
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
}else{
  this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
  const xQueryProcedure =[{    
    Icd9: '', 
    ProcedureName: '',
    ProcedureDate: '',
   }]
   xResultInfo ={
    ProcedureInfo: [xQueryProcedure],
   } 
}
}
//#endregion
      }else{
        this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
        const xQueryProcedure =[{    
          Icd9: '', 
          ProcedureName: '',
          ProcedureDate: '',
         }]
         xResultInfo ={
          ProcedureInfo: [xQueryProcedure],
         } 
      }
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
      const xQueryProcedure =[{    
        Icd9: '', 
        ProcedureName: '',
        ProcedureDate: '',
       }]
       xResultInfo ={
        ProcedureInfo: [xQueryProcedure],
       } 
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

  let newResultIpdDischargeProcedurDto= new ResultIpdDischargeProcedurDto();
  newResultIpdDischargeProcedurDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultIpdDischargeProcedurDto
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
async getIPDDischargeAccident(queryIpdDischargeDto:QueryIpdDischargeDto){
  let xResultInfo;
try{
const newQueryAccidentDatabaseBodyDto ={
  RefId: queryIpdDischargeDto.PatientInfo.RefId,
  TransactionNo: queryIpdDischargeDto.PatientInfo.TransactionNo,
  InsurerCode:queryIpdDischargeDto.PatientInfo.InsurerCode,
  VN: queryIpdDischargeDto.PatientInfo.VN,
  HN:queryIpdDischargeDto.PatientInfo.HN,

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
  let newResultIpdDischargeAccidentDto= new ResultIpdDischargeAccidentDto();
  newResultIpdDischargeAccidentDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultIpdDischargeAccidentDto
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

async getIPDDischargeConcurNote(queryIpdDischargeDto:QueryIpdDischargeDto){
  let xResultInfo;
try{

  const whereConditions = {
    
    ...(queryIpdDischargeDto.PatientInfo.VN ? { vn: { equals: queryIpdDischargeDto.PatientInfo.VN } } : {}),
    ...(queryIpdDischargeDto.PatientInfo.RefId ? { refid: { equals: queryIpdDischargeDto.PatientInfo.RefId  } } : {}),
    ...(queryIpdDischargeDto .PatientInfo. TransactionNo ? { transactionno: { equals: queryIpdDischargeDto .PatientInfo. TransactionNo } } : {}),

  };
  const existingConcurrentNoteRecord = await prismaProgest.concurrentnotetransactions.findFirst({
    where: whereConditions
  });
  let newQueryConcurNote: QueryConcurNote[] = [];

 if (existingConcurrentNoteRecord){

  const newQueryConcurrentNoteDatabaseBodyDto ={
    RefId:queryIpdDischargeDto.PatientInfo.RefId,
    TransactionNo: queryIpdDischargeDto.PatientInfo.TransactionNo,
    InsurerCode:queryIpdDischargeDto.PatientInfo.InsurerCode,
    HN:queryIpdDischargeDto.PatientInfo.HN,
    VN:queryIpdDischargeDto.PatientInfo.VN
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
   this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
   xResultInfo ={
    ConcurNoteList: newQueryConcurNote,
   } 
  
 } else {
  newQueryConcurNote = [{
    ConcurrentDatetime: '',
    ConcurrentDetail: '',
   }];
   this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
   xResultInfo ={
    ConcurNoteList: newQueryConcurNote,
   } 
 }
 }else{
  newQueryConcurNote = [{
    ConcurrentDatetime: '',
    ConcurrentDetail: '',
  }];
  this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  xResultInfo ={
    ConcurNoteList: newQueryConcurNote,
  } 
 }

  let newResultConcurNoteDto= new ResultConcurNoteDto();
  newResultConcurNoteDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultConcurNoteDto
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
async SubmitIPDVisit(queryIPDVisitDto:QueryIPDVisitDto){
  let medicalTransaction;
  try{
    const xRefId =queryIPDVisitDto.PatientInfo.RefId;
    const xTransactionNo =queryIPDVisitDto.PatientInfo.TransactionNo;
    const xInsurerCode =queryIPDVisitDto.PatientInfo.InsurerCode;
    const xHN =queryIPDVisitDto.PatientInfo.HN;
    const xVN =queryIPDVisitDto.PatientInfo.VN;

    const xVisitDateTime =queryIPDVisitDto.PatientInfo.VisitDateTime||'';
    const xDxFreeText =queryIPDVisitDto.PatientInfo.DxFreeText.slice(0,200)||'';
    const xPresentIllness =queryIPDVisitDto.PatientInfo.PresentIllness.slice(0,500)||'';
    const xChiefComplaint =queryIPDVisitDto.PatientInfo.ChiefComplaint.slice(0,200)||'';
    const xUnderlyingCondition =queryIPDVisitDto.PatientInfo.UnderlyingCondition||'';
    const xPhysicalExam =queryIPDVisitDto.PatientInfo.PhysicalExam.slice(0,1000)||'';
    const xPlanOfTreatment =queryIPDVisitDto.PatientInfo.PlanOfTreatment.slice(0,500)||'';
    const xProcedureFreeText =queryIPDVisitDto.PatientInfo.ProcedureFreeText.slice(0,500)||'';
    const xAdditionalNote =queryIPDVisitDto.PatientInfo.AdditionalNote||'';
    const xSignSymptomsDate =queryIPDVisitDto.PatientInfo.SignSymptomsDate||'';
    const xComaScore =queryIPDVisitDto.PatientInfo.ComaScore||'';
    const xExpectedDayOfRecovery =queryIPDVisitDto.PatientInfo.ExpectedDayOfRecovery||'';

    const xHaveProcedure =Boolean(queryIPDVisitDto.PatientInfo.HaveProcedure) || false;
    const xHaveAccidentCauseOfInjuryDetail =Boolean(queryIPDVisitDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false;
    const xHaveAccidentInjuryDetail =Boolean(queryIPDVisitDto.PatientInfo.HaveAccidentInjuryDetail) || false;
    const xAlcoholRelated =(queryIPDVisitDto.PatientInfo.AlcoholRelated) || false;
    const xPregnant =(queryIPDVisitDto.PatientInfo.Pregnant) || false;
    const xPrivateCase =(queryIPDVisitDto.PatientInfo.PrivateCase) || false;
    const xHeight =queryIPDVisitDto.PatientInfo.Height||'';
    const xWeight =queryIPDVisitDto.PatientInfo.Weight||'';

    const xExpectedAdmitDate =queryIPDVisitDto.PatientInfo.ExpectedAdmitDate||'';
    const xIndicationForAdmission =queryIPDVisitDto.PatientInfo.IndicationForAdmission||'';
    const xPreauthReferClaimNo =queryIPDVisitDto.PatientInfo.PreauthReferClaimNo||'';
    const xPreauthReferOcc =queryIPDVisitDto.PatientInfo.PreauthReferOcc||'';
    const xPreviousTreatmentDate =queryIPDVisitDto.PatientInfo.PreviousTreatmentDate||'';
    const xPreviousTreatmentDetail =queryIPDVisitDto.PatientInfo.PreviousTreatmentDetail.slice(0,20)||'';

    const xDscDateTime =queryIPDVisitDto.PatientInfo.DscDateTime||'';
    const xIsPackage =Boolean(queryIPDVisitDto.PatientInfo.IsPackage) || false;
    const xTotalEstimatedCost =queryIPDVisitDto.PatientInfo.TotalEstimatedCost||null;

    const xAnesthesiaList =queryIPDVisitDto.PatientInfo.AnesthesiaList||'';
    const xAdmitDateTime =queryIPDVisitDto.PatientInfo.AdmitDateTime||'';
    const xIsIPDDischarge = queryIPDVisitDto.PatientInfo.IsIPDDischarge||null ;
  
  
  console.log('----llll----')
    console.log(queryIPDVisitDto.PatientInfo)
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
        indicationforadmission: xIndicationForAdmission,
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
        weight:xWeight,
         expectedadmitdate:xExpectedAdmitDate,
         preauthreferclaimno:xPreauthReferClaimNo,
         preauthreferocc:xPreauthReferOcc,
         previoustreatmentdate:xPreviousTreatmentDate,
         previoustreatmentdetail:xPreviousTreatmentDetail,
        dscdatetime:xDscDateTime,
        ispackage:xIsPackage,
        totalestimatedcost:xTotalEstimatedCost,
        anesthesialist:xAnesthesiaList,
        admitdatetime:xAdmitDateTime,
        isipddischarge:xIsIPDDischarge,
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
          preauthreferocc:xPreauthReferOcc,
          isipddischarge:xIsIPDDischarge
        },
      });
    }
    }


  }catch (error) {
    console.log('ooo'+error)
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
async SubmitConcurNote(queryConcurNoteDto:QueryConcurNoteDto){
  //let ResponeTrakcareHTTPStatus;
  try{
    const xRefId =queryConcurNoteDto.PatientInfo.RefId;
    const xTransactionNo =queryConcurNoteDto.PatientInfo.TransactionNo;
    const xInsurerCode =queryConcurNoteDto.PatientInfo.InsurerCode;
    const xHN =queryConcurNoteDto.PatientInfo.HN;
    const xVN =queryConcurNoteDto.PatientInfo.VN;
    const xHaveConcurNote = queryConcurNoteDto.PatientInfo.HaveConcurNote;
  
let ConcurNoteList;
if (xHaveConcurNote ==true){

    if (Array.isArray(queryConcurNoteDto.PatientInfo.ConcurNoteInfo)) {
      ConcurNoteList = queryConcurNoteDto.PatientInfo.ConcurNoteInfo.map((concurnote) => ({
        ConcurrentDatetime: concurnote.ConcurrentDatetime || '',
        ConcurrentDetail: concurnote.ConcurrentDetail || '',
        }));
        const existingConcurnote = await prismaProgest.concurrentnotetransactions.findMany({
          where: {
              refid: xRefId,
              transactionno: xTransactionNo
          }
      });
     
      if (existingConcurnote.length > 0) {
        await Promise.all(
          existingConcurnote.map(async (concurnote) => {
                return await prismaProgest.concurrentnotetransactions.delete({
                    where: {
                        id: concurnote.id // ใช้ id ในการลบ
                    }
                });
            })
        );
    }
        await Promise.all(
          ConcurNoteList.map(async (concurnote) => {
              return await prismaProgest.concurrentnotetransactions.create({
                  data: {
                      insurerid: xInsurerCode,
                      refid: xRefId,
                      transactionno: xTransactionNo,
                      hn: xHN,
                      vn: xVN,
                      concurrentdatetime:concurnote.ConcurrentDatetime,
                      concurrentdetail: concurnote.ConcurrentDetail,
                    
                  }
              });
          })
      );

    } else {
      ConcurNoteList = [
        {
          "ConCurrentDatetime": "",
          "ConCurrentDetail": "",
      }
      ];
    } 
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
}else{
  ConcurNoteList = [
        {
            "ConcurrentDatetime": "",
            "ConcurrentDetail": "",
        }
    ]
 // console.log(xHaveProcedure)
    this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid ConCurrent Note','')
}

  
    
    let newResultSubmitConcurNoteDto= new ResultSubmitConcurNoteDto();
    newResultSubmitConcurNoteDto={
            HTTPStatus:newHttpMessageDto,
            Result:ConcurNoteList
      }

    return newResultSubmitConcurNoteDto
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
async SubmitIPDDischargeToAIA(querySubmitIpdDischargeDto:QuerySubmitIpdDischargeDto){
  let xResultInfo;
  
try{
 const RequesetBody ={
  xRefId:querySubmitIpdDischargeDto.PatientInfo.RefId, //'oljhnklefhbilubsEFJKLb65255555',
  xTransactionNo: querySubmitIpdDischargeDto.PatientInfo.TransactionNo,//'6f49b02c-4102-44e4-bd6a-c5bed5dc8b1c',
  xHN :querySubmitIpdDischargeDto.PatientInfo.HN ,//'62-027770',
  xInsurerCode: querySubmitIpdDischargeDto.PatientInfo.InsurerCode, //'13', 
  xVN: querySubmitIpdDischargeDto.PatientInfo.VN ,//'O415202-67',
  xVisitDateTime :querySubmitIpdDischargeDto.PatientInfo.VisitDateTime,
  xAccidentDate:querySubmitIpdDischargeDto.PatientInfo.AccidentDate,
  xAccidentPlaceCode :querySubmitIpdDischargeDto.PatientInfo.AccidentPlaceCode,
  xIdType:querySubmitIpdDischargeDto.PatientInfo.IdType,
  xPolicyTypeCode :querySubmitIpdDischargeDto.PatientInfo.PolicyTypeCode,
  xServiceSettingCode:querySubmitIpdDischargeDto.PatientInfo.ServiceSettingCode,

  xSurgeryTypeCode:querySubmitIpdDischargeDto.PatientInfo.SurgeryTypeCode,
  xIllnessTypeCode:querySubmitIpdDischargeDto.PatientInfo.IllnessTypeCode,
  xRunningdocument:querySubmitIpdDischargeDto.PatientInfo.Runningdocument,
  xIndicationForAdmission:querySubmitIpdDischargeDto.PatientInfo.IndicationForAdmission,
  xPreauthReferClaimNo:querySubmitIpdDischargeDto.PatientInfo.PreauthReferClaimNo,
  xPreauthReferOcc:querySubmitIpdDischargeDto.PatientInfo.PreauthReferOcc,
  xIsIPDDischarge:querySubmitIpdDischargeDto.PatientInfo.IsIPDDischarge,
  xOtherInsurer:querySubmitIpdDischargeDto.PatientInfo.OtherInsurer
  
 }
 ////////////////////////////////////////)'
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
    ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint ? getvisitformDatabase.Result.VisitInfo.ChiefComplaint.slice(0,200):'',
    ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore||'',
    DscDateTime:getvisitformDatabase.Result.VisitInfo.DscDateTime,
    DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText? getvisitformDatabase.Result.VisitInfo.DxFreeText.slice(0,200):'',
    ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery||'',
    ExpectedLos:null,
    Height: getvisitformDatabase.Result.VisitInfo.Height||'',
    IndicationForAdmission:getvisitformDatabase.Result.VisitInfo.IndicationForAdmission,
    PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam? getvisitformDatabase.Result.VisitInfo.PhysicalExam.slice(0,1000):'',
    PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment? getvisitformDatabase.Result.VisitInfo.PlanOfTreatment.slice(0,500):'',
    Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant||false,
    PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness?getvisitformDatabase.Result.VisitInfo.PresentIllness.slice(0,500):'',
    PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate||'',
    PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail?  getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail.slice(0,20):'',
    PreauthReferClaimNo:getvisitformDatabase.Result.VisitInfo.PreauthReferClaimNo,
    PreauthReferOcc: getvisitformDatabase.Result.VisitInfo.PreauthReferOcc,
    PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase||false,
    SignSymptomsDate:getvisitformDatabase.Result.VisitInfo.SignSymptomsDate|| '',
    UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition||'',
    VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
    //Vn:  getvisitformDatabase.Result.VisitInfo.VN||'',
    Vn:  await this.utilsService.EncryptAESECB( getvisitformDatabase.Result.VisitInfo.VN,AIA_APISecretkey) ,
  
    Weight: getvisitformDatabase.Result.VisitInfo.Weight||'',
    IsIPDDischarge:getvisitformDatabase.Result.VisitInfo.IsIPDDischarge

  }
  // console.log('getOPDDischargeVisit done from database')
}else{
  let VNForVisitinfo ;
  const getIPDDischargeVisit = await this.trakcareService.getIPDVisit(VNForVisitinfo);
  newResultVisitInfoDto= {
    AccidentDate: getIPDDischargeVisit.VisitInfo.AccidentDate,
    AdmitDateTime: getIPDDischargeVisit.VisitInfo.VisitDateTime,
    AdditionalNote: getIPDDischargeVisit.VisitInfo.AdditionalNote,
    AlcoholRelated: getIPDDischargeVisit.VisitInfo.AlcoholRelated,
    An:  await this.utilsService.EncryptAESECB( getIPDDischargeVisit.VisitInfo.vn,AIA_APISecretkey) ,
    ChiefComplaint: getIPDDischargeVisit.VisitInfo.ChiefComplaint? getIPDDischargeVisit.VisitInfo.ChiefComplaint.slice(0,200):'',
    ComaScore: getIPDDischargeVisit.VisitInfo.ComaScore,
    DscDateTime: getIPDDischargeVisit.VisitInfo.DscDateTime,
    DxFreeText: getIPDDischargeVisit.VisitInfo.DxFreeText?getIPDDischargeVisit.VisitInfo.DxFreeText.slice(0.200):'',
    ExpectedDayOfRecovery: '',
    ExpectedLos:null,
    Height: '',
    IndicationForAdmission:RequesetBody.xIndicationForAdmission,
    PhysicalExam: getIPDDischargeVisit.VisitInfo.PhysicalExam,
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
    Vn:  await this.utilsService.EncryptAESECB( getIPDDischargeVisit.VisitInfo.vn ,AIA_APISecretkey) ,
    Weight: '',
    IsIPDDischarge:null
  }
  // console.log('getOPDDischargeVisit done from trakcare')
}

 newResultVisitInfoDto.ExpectedLos = this.calculateDaysBetweenDates(newResultVisitInfoDto.VisitDateTime, newResultVisitInfoDto.DscDateTime);

// //--> get VitalSignIn  <--//
const getIPDDischargeVitalSign = await this.trakcareService.getIPDVitalSign(RequesetBody.xVN);
let newResultVitalSignInfoDto: ResultVitalSignInfoDto[] = [];
  if (getIPDDischargeVitalSign && getIPDDischargeVitalSign.VitalSignInfo && getIPDDischargeVitalSign.VitalSignInfo.length > 0) {
      newResultVitalSignInfoDto= await Promise.all(
        getIPDDischargeVitalSign.VitalSignInfo.map(async (item) => {
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
// console.log('getIPDitalSign done')
// //--> get Diagnosis  <--//
 console.log('get --> Diagnosis start ')

const getIPDDischargeDiagnosis = await this.trakcareService.getIPDDiagnosis(RequesetBody.xVN);
console.log('get --> Diagnosis')

let getDiagnosisTypeMapping 
let newQueryDiagnosisInfoDto: ResultDiagnosisInfoDto[] = [];
  if (getIPDDischargeDiagnosis && getIPDDischargeDiagnosis?.DiagnosisInfo && getIPDDischargeDiagnosis?.DiagnosisInfo.length > 0) {
    console.log('get --> Diagnosis 0')

   newQueryDiagnosisInfoDto= await Promise.all(
    getIPDDischargeDiagnosis?.DiagnosisInfo.map(async (item) => {
       getDiagnosisTypeMapping = await this.utilsService.getDiagnosisTypeMapping(
        ''+RequesetBody.xInsurerCode, 
        item.DxTypeCode
      );
      if (item.DxTypeCode === getDiagnosisTypeMapping?.Result?.dxtypecodetrakcare) {
        item.DxTypeCode = getDiagnosisTypeMapping?.Result?.dxtypecodeinsurance;
      }
      console.log('get --> Diagnosis 1')

      if (item.DxCode){
        console.log('get --> Diagnosis 1.1')

        return {
          DxName: item.DxName,
          DxType: item.DxTypeCode,
          Icd10: item.DxCode,
          
        };
      }else{
        console.log('get --> Diagnosis 1.2')

        if (newResultVisitInfoDto.IsIPDDischarge==true){

          return {
            DxName: '',
            DxType:'',
            Icd10: ''
          };
        }else{
          return {
            DxName: '',
            DxType:'OT',
            Icd10: 'J10.1'
            
          };
        }
      }
    })
  );
  
} else {
  if (newResultVisitInfoDto.IsIPDDischarge==true){
    newQueryDiagnosisInfoDto = [{
      DxName: '',
      DxType: '',
      Icd10: '',
    }];
  }
 else{
  newQueryDiagnosisInfoDto = [{
    DxName: '',
    DxType: 'OT',
    Icd10: 'J10.1',
  }];
 } 
  
}
// console.log(newQueryDiagnosisInfoDto)
 console.log('getIPDDischargeDiagnosis done')

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


    const whereConditions = {
    
      ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
      ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
      ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
    };
let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];
const existingProcedureRecord = await prismaProgest.proceduretransactions.findFirst({
  where: whereConditions
});
let getIPDDischargeProcedure ;
if(existingProcedureRecord){

  //getIPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 
   //if (getIPDDischargeProcedure && getIPDDischargeProcedure.ProcedureInfo && getIPDDischargeProcedure.ProcedureInfo.length > 0) {
  if (existingProcedureRecord){
    //     newResultProcedureInfoDto= await Promise.all(
  //       getIPDDischargeProcedure.ProcedureInfo.map(async (item) => {
  //      return {
  //        Icd9: item.Icd9,
  //        ProcedureName: item.ProcedureName,
  //        ProcedureDate: item.ProcedureDate,
         
  //      };
  //    })
  //  );
  newResultProcedureInfoDto = [{
    Icd9: existingProcedureRecord.icd9,
    ProcedureName: existingProcedureRecord.procedurename,
    ProcedureDate: existingProcedureRecord.proceduredate,
  }];
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
 
   getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto)
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
const getIPDDischargeInvestigation = await this.trakcareService.getIPDInvestigation(RequesetBody.xVN); 
let newResultInvestigationInfoDto: ResultInvestigationInfoDto[] = [];
  if (getIPDDischargeInvestigation && getIPDDischargeInvestigation.InvestigationInfo && getIPDDischargeInvestigation.InvestigationInfo.length > 0) {
    newResultInvestigationInfoDto= await Promise.all(
      getIPDDischargeInvestigation.InvestigationInfo.map(async (item) => {
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
// console.log('Investigation done')
// //--> get OrderItem  <--//
const getOPDDischargeOrderItem = await this.trakcareService.getIPDOrderItem(RequesetBody.xVN); 
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
// console.log('OrderItem done')
// //--> get Doctor  <--//
const getOPDDischargeDoctor = await this.trakcareService.getIPDDoctor(RequesetBody.xVN); 
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
 console.log('------>>>> Doctor done')
console.log(newResultDoctorInfoDto)
//  // ResultBillingInfoDto ,ResultTotalBillAmountInfoDto
// //--> get Billing  <--//
const getOPDDischargeBilling = await this.trakcareService.getIPDBilling(RequesetBody.xVN); 
let newResultBillingInfoDto : ResultBillingInfoDto[] = [];
let  newTotalBillAmount ;
   if (getOPDDischargeBilling && getOPDDischargeBilling.BillingInfo && getOPDDischargeBilling.BillingInfo.length > 0) {
       newTotalBillAmount = getOPDDischargeBilling.TotalBillAmount
      newResultBillingInfoDto= await Promise.all(
      getOPDDischargeBilling.BillingInfo.map(async (item) => {

        if (item.LocalBillingCode =='0101015'){
          console.log('Vitamin')
          item.LocalBillingCode ='0101012'
          item.LocalBillingName ='1.1.1(12) ค่ายาผู้ป่วยใน'
          item.SimbBillingCode ='1.1.1(12)'
          item.PayorBillingCode ='1.1.1(12)'
        
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
  if (newResultVisitInfoDto.IsIPDDischarge==true){
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
  }else{
    
newResultBillingInfoDto = [{

  LocalBillingCode: '2.1.1',
  LocalBillingName: 'ค่าห้องผู้ป่วยใน',
  SimbBillingCode: '2.1.1',
  PayorBillingCode: '2.1.1',
  BillingInitial: '10000',
  BillingDiscount: '8000',
  BillingNetAmount: '2000',
 
}];
newTotalBillAmount=2000 

  
  }

}

// console.log('billing done')
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


let newResultConcurrentNoteDto: ResultConcurrentNoteDto[] = [];

newResultConcurrentNoteDto = [{
  ConcurrentDateTimeDate: '',
  ConcurrentNoteDetail: '',
 
}];
// //--> get AttachDocList  <--//

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
console.log('-- QueryCreateClaimDocumentDtoBody ---')
console.log(QueryCreateClaimDocumentDtoBody)


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
console.log('newResultVisitInfoDto')

console.log(newResultVisitInfoDto)
// console.log(newResultBillingInfoDto)
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
   OtherInsurer:RequesetBody.xOtherInsurer,
   Pss: newResultPSSInfoDto,
   ConcurrentNote: newResultConcurrentNoteDto
}
console.log('------> Diagnosis')
console.log(newResultDataJsonDto.Diagnosis)
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
 console.log(newResultVisitInfoDto.IsIPDDischarge)
      const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       let apiURL;
       if (RequesetBody.xIsIPDDischarge == true){
         apiURL= `${AIA_APIURL}/SmartClaim/ipdDischarge`;
       }else{
         apiURL= `${AIA_APIURL}/SmartClaim/ipdAdmission`;
       }
console.log('================= apiURL =================')
console.log(RequesetBody.xIsIPDDischarge)
console.log(apiURL)
console.log('================= apiURL =================')
// apiURL= `${AIA_APIURL}/SmartClaim/ipdAdmission`;

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
     console.log(responsefromAIA)
       
 
  // console.log('======> responeInputcode =')
  // console.log(responeInputcode)
  if ((responsefromAIA?.Result?.Code !=='S')||(responsefromAIA?.returnMsgTh?.length >0)){
    if (responsefromAIA?.returnMsgTh?.length >0){
      console.log('ffffff 111')

      this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA?.returnMsgTh,responsefromAIA?.returnMsgTh)
 
    }else{
      console.log('ffffff 222')

      this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA?.Result?.Message,responsefromAIA?.Result?.MessageTh)
 
    }
    
  }else{
    const responeInputcode = responsefromAIA?.Result?.Code
    const responereturnMsgTh = responsefromAIA?.returnMsgTh
    console.log('yyyyyy')

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
      isipddischarge:RequesetBody.xIsIPDDischarge
      
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
      isipddischarge:RequesetBody.xIsIPDDischarge

    },
  });

}

 if  (  RequesetBody.xIsIPDDischarge == true ) {
  const ExistingMedicaltransactions = await prismaProgest.medicaltransactions.findFirst({
    where: {
      refid: RequesetBody.xRefId,
      transactionno: RequesetBody.xTransactionNo,
    },
  });
  if (ExistingMedicaltransactions) {
    await prismaProgest.medicaltransactions.update({
      where: {
        id: ExistingMedicaltransactions.id, 
      },
      data: {
     isipddischarge : RequesetBody.xIsIPDDischarge
      },
    });
  }
}
  

  this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }
  let newResultSubmitIpdDischargeDto= new ResultSubmitIpdDischargeDto();
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
async ReviewIPDDischarge(queryIpdDischargeDto:QueryIpdDischargeDto){
  let xResultInfo;
try{
 const RequesetBody ={
  xRefId:queryIpdDischargeDto.PatientInfo.RefId, 
  xTransactionNo: queryIpdDischargeDto.PatientInfo.TransactionNo,
  xHN :queryIpdDischargeDto.PatientInfo.HN ,
  xInsurerCode: queryIpdDischargeDto.PatientInfo.InsurerCode, 
  xVN: queryIpdDischargeDto.PatientInfo.VN 
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
  RefId:queryIpdDischargeDto.PatientInfo.RefId,
  TransactionNo: queryIpdDischargeDto.PatientInfo.TransactionNo,
  InsurerCode:queryIpdDischargeDto.PatientInfo.InsurerCode,
  HN:queryIpdDischargeDto.PatientInfo.HN,
  VN:queryIpdDischargeDto.PatientInfo.VN
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

// if ((newResultReviewDataJsonDto.TotalBillAmount)||(newResultReviewDataJsonDto.InvoiceNumber)){

//   const QueryUpdateBill = {
//     ...(newResultReviewDataJsonDto.TotalBillAmount ? { totalbillamount: newResultReviewDataJsonDto.TotalBillAmount } : {}),
//     ...(newResultReviewDataJsonDto.InvoiceNumber ? { invoicenumber: newResultReviewDataJsonDto.InvoiceNumber } : {}),
//   };


//   await prismaProgest.transactionclaim.updateMany({
//     where: {
//       refid: RequesetBody.xRefId,
//       transactionno: RequesetBody.xTransactionNo,
//       vn: RequesetBody.xVN
//     },
//     data: QueryUpdateBill 
//   });

// }

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


/// Utils ///
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

}
