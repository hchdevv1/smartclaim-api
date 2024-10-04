import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { lastValueFrom } from 'rxjs'

// import { prismaProgest } from '../../database/database';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';

import { QueryOpdDischargeDto } from   './dto/query-opd-discharge.dto';
import { ResultOpdDischargeVitalSignDto ,QueryVitalSign } from './dto/result-vitalsign-opd-discharge.dto';
import { ResultOpdDischargeDoctorDto ,QueryDoctor } from './dto/result-doctor-opd-discharge.dto';
import { ResultOpdDischargeDiagnosisDto ,QueryDiagnosis } from './dto/result-diagnosis-opd-discharge.dto';
import { ResultOpdDischargeInvestigationDto ,QueryInvestigation } from './dto/result-investigation-opd-discharge.dto';
import { ResultOpdDischargeOrderItemDto ,QueryOrderItem } from './dto/result-orderitem-opd-discharge.dto';
import { ResultOpdDischargeBillingDto, QueryBilling} from './dto/result-billing-opd-discharge.dto';
import { ResultOpdDischargeProcedurDto, QueryProcedure} from './dto/result-procedure-opd-discharge.dto';

const httpStatusMessageService = new HttpStatusMessageService();

const newHttpMessageDto =new HttpMessageDto();
// const AIA_APIURL= process.env.AIA_APIURL;
// const AIA_APISecretkey = process.env.AIA_APISecretkey;
// const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
// const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
// const AIA_APISubscription =process.env.AIA_APISubscription;
// const API_CONTENTTYPE = process.env.API_CONTENTTYPE
// const DUMMY_National_ID = process.env.DUMMY_National_ID
@Injectable()
export class OpdDischargeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService
  ) {}

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
      const xQueryDiagnosis ={    
        DxTypeCode: '', 
        DxCode: '',
        DxName: '',
        Dxtypenametrakcare: '',
        Dxtypecodeinsurance: '',
        Dxtypenameinsurance: ''
       }
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
    const xQueryInvestigation ={    
      InvestigationCode: '', 
      InvestigationGroup: '',
      InvestigationName: '',
      InvestigationResult: '',
      ResultDateTime: ''
     }
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
    const xQueryProcedure ={    
      Icd9: '', 
      ProcedureName: '',
      ProcedureDate: '',
     }
     xResultInfo ={
      ProcedureInfo: xQueryProcedure,
     } 
  }else{
    console.log('fff')
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
