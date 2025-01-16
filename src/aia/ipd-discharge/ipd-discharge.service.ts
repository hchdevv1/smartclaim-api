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

import { ResultIpdDischargeVisitDto ,QueryVisit} from './dto/result-visit-ipd-discharge.dto';
import { ResultIPDVitalSignDto ,QueryVitalSign } from './dto/result-vitalsign-ipd-discharge.dto';
import { ResultIpdDischargeDoctorDto ,QueryDoctor } from './dto/result-doctor-ipd-discharge.dto';
import { ResultIpdDischargeDiagnosisDto ,QueryDiagnosis} from './dto/result-diagnosis-ipd-discharge.dto';
import { ResultIpdDischargeInvestigationDto ,QueryInvestigation} from './dto/result-investigation-ipd-discharge.dto';
import { ResultIpdDischargeOrderItemDto ,QueryOrderItem} from './dto/result-orderitem-ipd-discharge.dto';
import { ResultIpdDischargeBillingDto ,QueryBilling} from './dto/result-billing-ipd-discharge.dto';
import { ResultIpdDischargeProcedurDto, QueryProcedure} from './dto/result-procedure-ipd-discharge.dto'
import { ResultIpdDischargeAccidentDto ,QueryAccident} from './dto/result-accident-ipd-discharge.dto';
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

import { ResultReviewIPDVisitInfoDto  ,AccidentDetailDto} from './dto/review-ipd-discharge.dto';

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
    
    }
    const getvisitformDatabase = await this.utilsService.getvisitIPDformDatabase(newQueryVisitDatabaseBodyDto)
    if (getvisitformDatabase?.Result?.VisitInfo?.VisitDateTime?.length >0){ 

      const newResultReviewVisitInfoDto : ResultReviewIPDVisitInfoDto= {
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
        Weight: getvisitformDatabase.Result.VisitInfo.Weight||'',
        An:  getvisitformDatabase.Result.VisitInfo.VN||'',

        PreauthReferClaimNo: getvisitformDatabase.Result.VisitInfo.PreauthReferClaimNo||'',
        PreauthReferOcc: getvisitformDatabase.Result.VisitInfo.PreauthReferOcc||'',
        IndicationForAdmission: getvisitformDatabase.Result.VisitInfo.IndicationForAdmission||'',
        DscDateTime: getvisitformDatabase.Result.VisitInfo.DscDateTime||'',
        AdmitDateTime: getvisitformDatabase.Result.VisitInfo.AdmitDateTime||'',


      }
 this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      xResultInfo ={
        VisitInfo: newResultReviewVisitInfoDto,
       } 
    //  console.log(newResultReviewVisitInfoDto)
    //   console.log('----get visit from database---')
    }else{
     
      const TrakcarepatientInfo = await this.trakcareService.getIPDVisit(queryIpdDischargeDto.PatientInfo.VN);
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
        
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
          const xQueryVisit: QueryVisit = TrakcarepatientInfo.VisitInfo ? {
            
            AccidentDate: TrakcarepatientInfo.VisitInfo.AccidentDate || '',
            AdditionalNote: TrakcarepatientInfo.VisitInfo.AdditionalNote || '',
            AdmitDateTime: TrakcarepatientInfo.VisitInfo.AdmitDateTime || '',
            AlcoholRelated: Boolean(TrakcarepatientInfo.VisitInfo.AlcoholRelated) || false,
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
            Pregnant: Boolean(TrakcarepatientInfo.VisitInfo.Pregnant) || false,
            PresentIllness: TrakcarepatientInfo.VisitInfo.PresentIllness || '',
            PreviousTreatmentDate: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDate || '',
            PreviousTreatmentDetail: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDetail || '',
            PrivateCase: Boolean(TrakcarepatientInfo.VisitInfo.PrivateCase) || false,
            ProcedureFreeText: TrakcarepatientInfo.VisitInfo.ProcedureFreeText || '',
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
    let newResultIpdDischargeVisitDto= new ResultIpdDischargeVisitDto();
    newResultIpdDischargeVisitDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  
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

  const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeDiagnosis(queryIpdDischargeDto.PatientInfo.VN);
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
      const convertDxtypename = await this.convertDxTypeCode(''+queryIpdDischargeDto.PatientInfo.InsurerCode,item.DxTypeCode);
      const dxtypenametrakcare = convertDxtypename?.Result?.[0]?.dxtypenametrakcare || '';
      const dxtypecodeinsurance = convertDxtypename?.Result?.[0]?.dxtypecodeinsurance || '';
      const dxtypenameinsurance = convertDxtypename?.Result?.[0]?.dxtypenameinsurance || '';
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

  const whereConditions = {
    
    ...(queryIpdDischargeDto.PatientInfo.VN ? { vn: { equals: queryIpdDischargeDto.PatientInfo.VN } } : {}),
    ...(queryIpdDischargeDto.PatientInfo.RefId ? { refid: { equals: queryIpdDischargeDto.PatientInfo.RefId  } } : {}),
    ...(queryIpdDischargeDto .PatientInfo. TransactionNo ? { transactionno: { equals: queryIpdDischargeDto .PatientInfo. TransactionNo } } : {}),

  };
  const existingProcedureRecord = await prismaProgest.proceduretransactions.findFirst({
    where: whereConditions
  });
 if (existingProcedureRecord){
// queryOpdDischargeDto.PatientInfo.RefId  ='ccXwZWYmukJdvzFrWaccN8bNr83caECQjC+vvuEaIKY=';
// queryOpdDischargeDto.PatientInfo.TransactionNo  ='5c5aabb3-b919-4ee8-ac42-848ae4d5f55a';
//   queryOpdDischargeDto.PatientInfo.VN ='O415202-67'
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
  console.log(TrakcarepatientInfo)
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

    const TrakcarepatientInfo = await this.trakcareService.getIPDAccident(queryIpdDischargeDto.PatientInfo.VN);
    const xAccientdata =queryIpdDischargeDto.PatientInfo.AccidentDate
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
    const xDxFreeText =queryIPDVisitDto.PatientInfo.DxFreeText||'';
    const xPresentIllness =queryIPDVisitDto.PatientInfo.PresentIllness||'';
    const xChiefComplaint =queryIPDVisitDto.PatientInfo.ChiefComplaint||'';
    const xUnderlyingCondition =queryIPDVisitDto.PatientInfo.UnderlyingCondition||'';
    const xPhysicalExam =queryIPDVisitDto.PatientInfo.PhysicalExam||'';
    const xPlanOfTreatment =queryIPDVisitDto.PatientInfo.PlanOfTreatment||'';
    const xProcedureFreeText =queryIPDVisitDto.PatientInfo.ProcedureFreeText||'';
    const xAdditionalNote =queryIPDVisitDto.PatientInfo.AdditionalNote||'';
    const xSignSymptomsDate =queryIPDVisitDto.PatientInfo.SignSymptomsDate||'';
    const xComaScore =queryIPDVisitDto.PatientInfo.ComaScore||'';
    const xExpectedDayOfRecovery =queryIPDVisitDto.PatientInfo.ExpectedDayOfRecovery||'';

    const xHaveProcedure =Boolean(queryIPDVisitDto.PatientInfo.HaveProcedure) || false;
    const xHaveAccidentCauseOfInjuryDetail =Boolean(queryIPDVisitDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false;
    const xHaveAccidentInjuryDetail =Boolean(queryIPDVisitDto.PatientInfo.HaveAccidentInjuryDetail) || false;
    const xAlcoholRelated =Boolean(queryIPDVisitDto.PatientInfo.AlcoholRelated) || false;
    const xPregnant =Boolean(queryIPDVisitDto.PatientInfo.Pregnant) || false;
    const xPrivateCase =Boolean(queryIPDVisitDto.PatientInfo.PrivateCase) || false;
    const xHeight =queryIPDVisitDto.PatientInfo.Height||'';
    const xWeight =queryIPDVisitDto.PatientInfo.Weight||'';

    const xExpectedAdmitDate =queryIPDVisitDto.PatientInfo.ExpectedAdmitDate||'';
    const xIndicationForAdmission =queryIPDVisitDto.PatientInfo.IndicationForAdmission||'';
    const xPreauthReferClaimNo =queryIPDVisitDto.PatientInfo.PreauthReferClaimNo||'';
    const xPreauthOcc =queryIPDVisitDto.PatientInfo.PreauthOcc||'';
    const xPreviousTreatmentDate =queryIPDVisitDto.PatientInfo.PreviousTreatmentDate||'';
    const xPreviousTreatmentDetail =queryIPDVisitDto.PatientInfo.PreviousTreatmentDetail||'';

    const xDscDateTime =queryIPDVisitDto.PatientInfo.DscDateTime||'';
    const xIsPackage =Boolean(queryIPDVisitDto.PatientInfo.IsPackage) || false;
    const xTotalEstimatedCost =queryIPDVisitDto.PatientInfo.TotalEstimatedCost||null;

    const xAnesthesiaList =queryIPDVisitDto.PatientInfo.AnesthesiaList||'';
    const xAdmitDateTime =queryIPDVisitDto.PatientInfo.AdmitDateTime||'';


console.log(queryIPDVisitDto)
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
         preauthreferocc:xPreauthOcc,
         previoustreatmentdate:xPreviousTreatmentDate,
         previoustreatmentdetail:xPreviousTreatmentDetail,
        dscdatetime:xDscDateTime,
        ispackage:xIsPackage,
        totalestimatedcost:xTotalEstimatedCost,
        anesthesialist:xAnesthesiaList,
        admitdatetime:xAdmitDateTime,
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
          preauthreferocc:xPreauthOcc
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
        ConCurrentDatetime: concurnote.ConCurrentDatetime || '',
        ConCurrentDetail: concurnote.ConCurrentDetail || '',
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
                      concurrentdatetime: concurnote.ConCurrentDatetime,
                      concurrentdetail: concurnote.ConCurrentDetail,
                    
                  }
              });
          })
      );

    } else {
      ConcurNoteList = [];
    }
   // console.log(xHaveProcedure)
    
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
async SubmitIPDDischargeToAIA(querySubmitOpdDischargeDto:QuerySubmitIpdDischargeDto){
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
  xAccidentDate:querySubmitOpdDischargeDto.PatientInfo.AccidentDate,
  xAccidentPlaceCode :querySubmitOpdDischargeDto.PatientInfo.AccidentPlaceCode,
  xIdType:querySubmitOpdDischargeDto.PatientInfo.IdType,
  xPolicyTypeCode :querySubmitOpdDischargeDto.PatientInfo.PolicyTypeCode,
  xServiceSettingCode:querySubmitOpdDischargeDto.PatientInfo.ServiceSettingCode,
  xSurgeryTypeCode:querySubmitOpdDischargeDto.PatientInfo.SurgeryTypeCode,
  xIllnessTypeCode:querySubmitOpdDischargeDto.PatientInfo.IllnessTypeCode,
  xRunningdocument:querySubmitOpdDischargeDto.PatientInfo.Runningdocument,
  xIndicationForAdmission:querySubmitOpdDischargeDto.PatientInfo.IndicationForAdmission,
  xPreauthReferClaimNo:querySubmitOpdDischargeDto.PatientInfo.PreauthReferClaimNo,
  xxPreauthReferOcc:querySubmitOpdDischargeDto.PatientInfo.PreauthReferOcc,
 }
 
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
    //Vn:  getvisitformDatabase.Result.VisitInfo.VN||'',
    Vn:  await this.utilsService.EncryptAESECB( getvisitformDatabase.Result.VisitInfo.VN,AIA_APISecretkey) ,
  
    Weight: getvisitformDatabase.Result.VisitInfo.Weight||''
  }
  console.log('getOPDDischargeVisit done from database')
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
    Height: '',
    IndicationForAdmission:RequesetBody.xIndicationForAdmission,
    PhysicalExam: '',
    PlanOfTreatment: '',
    Pregnant: getIPDDischargeVisit.VisitInfo.Pregnant,
    PresentIllness: '',
    PreviousTreatmentDate: '',
    PreviousTreatmentDetail: '',
    PreauthReferClaimNo:RequesetBody.xPreauthReferClaimNo||'',
    PreauthReferOcc:RequesetBody.xxPreauthReferOcc||'',
    PrivateCase: getIPDDischargeVisit.VisitInfo.PrivateCase,
    SignSymptomsDate: '',
    UnderlyingCondition: '',
    VisitDateTime: getIPDDischargeVisit.VisitInfo.VisitDateTime,
    Vn:  await this.utilsService.EncryptAESECB( getIPDDischargeVisit.VisitInfo.vn ,AIA_APISecretkey) ,
    Weight: ''
  }
  console.log('getOPDDischargeVisit done from trakcare')
}

 newResultVisitInfoDto.ExpectedLos = this.calculateDaysBetweenDates(newResultVisitInfoDto.VisitDateTime, newResultVisitInfoDto.DscDateTime);

console.log('-----newResultVisitInfoDto')
console.log(newResultVisitInfoDto)
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
console.log('getIPDitalSign done')
// //--> get Diagnosis  <--//

const getIPDDischargeDiagnosis = await this.trakcareService.getIPDDiagnosis(RequesetBody.xVN);
let getDiagnosisTypeMapping 
let newQueryDiagnosisInfoDto: ResultDiagnosisInfoDto[] = [];
  if (getIPDDischargeDiagnosis && getIPDDischargeDiagnosis.DiagnosisInfo && getIPDDischargeDiagnosis.DiagnosisInfo.length > 0) {

   newQueryDiagnosisInfoDto= await Promise.all(
    getIPDDischargeDiagnosis.DiagnosisInfo.map(async (item) => {
       getDiagnosisTypeMapping = await this.utilsService.getDiagnosisTypeMapping(
        ''+RequesetBody.xInsurerCode, 
        item.DxTypeCode
      );
      if (item.DxTypeCode === getDiagnosisTypeMapping.Result.dxtypecodetrakcare) {
        item.DxTypeCode = getDiagnosisTypeMapping.Result.dxtypecodeinsurance;
      }
      const countDiag =getIPDDischargeDiagnosis.DiagnosisInfo.length
      const FirstTextDxCode = item.DxCode[0]
      if ((countDiag ===1) &&(FirstTextDxCode ==='Z')){
        return {
          DxName: item.DxName,
          DxType: item.DxTypeCode,
          Icd10: item.DxCode,
          
        };
      }else{

        return {
          DxName: item.DxName,
          DxType: item.DxTypeCode,
          Icd10: item.DxCode,
          
        };
      }

     
    })
  );
  
} else {
  newQueryDiagnosisInfoDto = [{
    DxName: '',
    DxType: '',
    Icd10: '',
  }];
}
console.log(newQueryDiagnosisInfoDto)
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
  getIPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 
   if (getIPDDischargeProcedure && getIPDDischargeProcedure.ProcedureInfo && getIPDDischargeProcedure.ProcedureInfo.length > 0) {
      newResultProcedureInfoDto= await Promise.all(
        getIPDDischargeProcedure.ProcedureInfo.map(async (item) => {
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
console.log('Investigation done')
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
console.log('OrderItem done')
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
console.log('Doctor done')
// //console.log(newResultDoctorInfoDto)
//  // ResultBillingInfoDto ,ResultTotalBillAmountInfoDto
// //--> get Billing  <--//
const getOPDDischargeBilling = await this.trakcareService.getIPDBilling(RequesetBody.xVN); 
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
newTotalBillAmount=2000
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


let newResultConcurrentNoteDto: ResultConcurrentNoteDto[] = [];

newResultConcurrentNoteDto = [{
  ConcurrentDateTimeDate: '',
  ConcurrentNoteDetail: '',
 
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
console.log('-- QueryCreateClaimDocumentDtoBody ---')
//console.log(QueryCreateClaimDocumentDtoBody)


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

console.log(newResultBillingInfoDto)
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
   Pss: newResultPSSInfoDto,
   ConcurrentNote: newResultConcurrentNoteDto
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
console.log(newResultDataJsonDto.Visit)
 //////////////////////////////////////
      const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       const apiURL= `${AIA_APIURL}/SmartClaim/ipdDischarge`;

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
