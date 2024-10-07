import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
// import { prismaProgest } from '../../database/database';
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
// const DUMMY_National_ID = process.env.DUMMY_National_ID


@Injectable()
export class OpdDischargeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService
  ) {}
// 
async getOPDDischargeVisit(queryOpdDischargeDto:QueryOpdDischargeDto){
  let xResultInfo;
try{
 
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
      Weight:  ''
   
     }
     xResultInfo ={
      VisitInfo: xQueryVisit,
     } 
  }else{
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    console.log(TrakcarepatientInfo.VisitInfo)
      const xQueryVisit: QueryVisit = TrakcarepatientInfo.VisitInfo ? {
        FurtherClaimId: TrakcarepatientInfo.VisitInfo.FurtherClaimId || '', 
        AccidentCauseOver45Days: TrakcarepatientInfo.VisitInfo.AccidentCauseOver45Days || '',
        AdditionalNote: TrakcarepatientInfo.VisitInfo.AdditionalNote || '',
        AlcoholRelated: Boolean(TrakcarepatientInfo.VisitInfo.AlcoholRelated) || false,
        ChiefComplaint: TrakcarepatientInfo.VisitInfo.ChiefComplaint || '',
        ComaScore: TrakcarepatientInfo.VisitInfo.ComaScore || '',
        DxFreeText: TrakcarepatientInfo.VisitInfo.DxFreeText || '',
        ExpectedDayOfRecovery: TrakcarepatientInfo.VisitInfo.ExpectedDayOfRecovery || '',
        Height: TrakcarepatientInfo.VisitInfo.Height || '',
        PhysicalExam: TrakcarepatientInfo.VisitInfo.PhysicalExam || '',
        PlanOfTreatment: TrakcarepatientInfo.VisitInfo.PlanOfTreatment || '',
        Pregnant: Boolean(TrakcarepatientInfo.VisitInfo.Pregnant) || false,
        PresentIllness: TrakcarepatientInfo.VisitInfo.PresentIllness || '',
        PreviousTreatmentDate: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDate || '',
        PreviousTreatmentDetail: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDetail || '',
        PrivateCase: Boolean(TrakcarepatientInfo.VisitInfo.PrivateCase) || false,
        ProcedureFreeText: TrakcarepatientInfo.VisitInfo.ProcedureFreeText || '',
        SignSymptomsDate: TrakcarepatientInfo.VisitInfo.SignSymptomsDate || '',
        UnderlyingCondition: TrakcarepatientInfo.VisitInfo.UnderlyingCondition || '',
        VisitDateTime: TrakcarepatientInfo.VisitInfo.VisitDateTime || '',
        Vn: TrakcarepatientInfo.VisitInfo.Vn || '',
        Weight: TrakcarepatientInfo.VisitInfo.Weight || ''
    } : {};
    xResultInfo ={
      VisitInfo: xQueryVisit,
     } 
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
        VitalSignInfo: xQueryVitalSign,
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
        DoctorInfo: xQueryDoctor,
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
        DiagnosisInfo: xQueryDiagnosis,
       } 
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      const xQueryDiagnosis: QueryDiagnosis[] = TrakcarepatientInfo.DiagnosisInfo ? 
      await Promise.all(  TrakcarepatientInfo.DiagnosisInfo.map(async (item) => {
        const convertDxtypename = await this.convertDxTypeCode(''+queryOpdDischargeDto.PatientInfo.InsurerCode,item.DxTypeCode);
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
  console.log(TrakcarepatientInfo)
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
      InvestigationInfo: xQueryInvestigation,
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
  console.log(TrakcarepatientInfo)
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
      OrderItemInfo: xQueryOrderItem,
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
  console.log(TrakcarepatientInfo)
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
      BillingInfo: xQueryBilling,
     } 
  }else{
    console.log('fff')
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
 
  const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeProcedure(queryOpdDischargeDto.PatientInfo.VN);
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
      ProcedureInfo: xQueryProcedure,
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
 
  const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeAccident(queryOpdDischargeDto.PatientInfo.VN);
  console.log(TrakcarepatientInfo)
 const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode :400
  if (TrakcarepatientInfoStatusCode !==200){
    this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)
   const xCauseOfInjuryDetail =[{
      CauseOfInjury: '',
      CommentOfInjury: '',
     } ]
     const xInjuryDetail =[{
      WoundType: '',
      InjurySide: '',
      InjuryArea: '',
     } ]
    const xQueryAccident ={    
      AccidentPlace: '', 
      AccidentDate: '',
      ProcedureDate: '',
      CauseOfInjuryDetail:xCauseOfInjuryDetail,
      InjuryDetail:xInjuryDetail
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

async SubmitOPDDischargeToAIA(querySubmitOpdDischargeDto:QuerySubmitOpdDischargeDto){
  let xResultInfo;
  console.log('--------0000000--------')
  console.log(querySubmitOpdDischargeDto)
  console.log('--------1111111--------')
try{
 const RequesetBody ={
  xRefId:querySubmitOpdDischargeDto.PatientInfo.RefId, //'oljhnklefhbilubsEFJKLb65255555',
  xTransactionNo: querySubmitOpdDischargeDto.PatientInfo.TransactionNo,//'6f49b02c-4102-44e4-bd6a-c5bed5dc8b1c',
  xHN :querySubmitOpdDischargeDto.PatientInfo.HN ,//'62-027770',
  xInsurerCode: querySubmitOpdDischargeDto.PatientInfo.InsurerCode, //'13', 
  xVN: querySubmitOpdDischargeDto.PatientInfo.VN ,//'O415202-67',
  xIllnessTypeCode:querySubmitOpdDischargeDto.PatientInfo.IllnessTypeCode
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
console.log(newResultPatientInfoDto)
// //--> get Visit  <--//
 const getOPDDischargeVisit = await this.trakcareService.getOPDDischargeVisit(RequesetBody.xVN);
// console.log(getOPDDischargeVisit)
// console.log('xxxxxxxxx')
// //let newResultVisitInfoDto : ResultVisitInfoDto;
const newResultVisitInfoDto : ResultVisitInfoDto= {
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

// //--> get Diagnosis  <--//
const getOPDDischargeDiagnosis = await this.trakcareService.getOPDDischargeDiagnosis(RequesetBody.xVN);
let getDiagnosisTypeMapping 
let newQueryDiagnosisInfoDto: ResultDiagnosisInfoDto[] = [];
  if (getOPDDischargeDiagnosis && getOPDDischargeDiagnosis.DiagnosisInfo && getOPDDischargeDiagnosis.DiagnosisInfo.length > 0) {

   newQueryDiagnosisInfoDto= await Promise.all(
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
let newAccidentDetail
if (RequesetBody.xIllnessTypeCode='ACC'){
 
  // xAccidentDate:queryAccidentBodyDto.PatientInfo.AccidentDate||'', 
  //   xAccidentPlaceCode:queryAccidentBodyDto.PatientInfo.AccidentPlaceCode||null, 
  //   xAccidentInjuryWoundtypeCode:queryAccidentBodyDto.PatientInfo.AccidentInjuryWoundtypeCode||'', 
  //   xAccidentInjurySideCode:queryAccidentBodyDto.PatientInfo.AccidentInjurySideCode||'', 
  let TrakcareCauseOfInjury =""
  if (TrakcareCauseOfInjury.length<1){TrakcareCauseOfInjury ='X599'}
  let TrakcareInjuryArea =""
  if (TrakcareInjuryArea.length<1){TrakcareInjuryArea ='T140'}
  newAccidentDetail= {
    "AccidentPlace": '',//RequesetBody.xAccidentPlaceCode,
    "AccidentDate": '',//RequesetBody.xAccidentDate,
    "CauseOfInjuryDetail": [
        {
            "CauseOfInjury": '',//TrakcareCauseOfInjury,
            "CommentOfInjury":'',//RequesetBody.xWoundDetails
        }
    ],
    "InjuryDetail": [
        {
            "WoundType": '',//RequesetBody.xAccidentInjuryWoundtypeCode,
            "InjurySide": '',//RequesetBody.xAccidentInjurySideCode,
            "InjuryArea": '',//TrakcareInjuryArea
        }
    ]
}
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
const getOPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 
let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];
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
//console.log(getOPDDischargeOrderItem.OrderItemInfo)
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
const getOPDDischargeDoctor = await this.trakcareService.getOPDDischargeDoctor(RequesetBody.xVN); 
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
//const getListDocumentByRefId = await this.utilsService.getListDocumentByRefId(RequesetBody.xVN,RequesetBody.xRefId,RequesetBody.xTransactionNo); 
//console.log(getListDocumentByRefId)
let newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];
//newResultAttachDocListInfoDto = getListDocumentByRefId
newResultAttachDocListInfoDto =
[
  {
    "Base64Data": "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",
    "DocName": "OPDdischarge.pdf"
}
];

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
let newOPDDischargeResponseDto ={

  // RefId: 'OPD-008-Test-001',
  // TransactionNo: '13675055-0ed9-40f7-bd38-bec0754fe674',
  RefId: RequesetBody.xRefId ,//'oljhnklefhbilubsEFJKLb65255555',
  TransactionNo:RequesetBody.xTransactionNo, //'6f49b02c-4102-44e4-bd6a-c5bed5dc8b1c',
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
      //  const xUsername=AIA_APIHopitalUsername;
      //  const xHospitalCode =await this.utilsService.EncryptAESECB(AIA_APIHospitalCode,AIA_APISecretkey);
      //  const xInsurerCode=RequesetBody;
      //  const xElectronicSignature='';
      //  const xDataJsonType =3;
      //  const body_DataJson = {}
  console.log(newOPDDischargeResponseDto)
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
          data.message='success'
          data.error=''
        }
      }
      
  }
}
