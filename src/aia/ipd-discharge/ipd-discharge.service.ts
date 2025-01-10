import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { lastValueFrom } from 'rxjs'
// import { catchError, map } from 'rxjs/operators';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { UtilsService } from '../../utils/utils.service';


import { QueryIpdDischargeDto } from './dto/query-ipd-discharge.dto'
import { ResultIPDVitalSignDto ,QueryVitalSign } from './dto/result-vitalsign-ipd-discharge.dto';
import { ResultIpdDischargeDoctorDto ,QueryDoctor } from './dto/result-doctor-ipd-discharge.dto';
import { ResultIpdDischargeDiagnosisDto ,QueryDiagnosis} from './dto/result-diagnosis-ipd-discharge.dto';
import { ResultIpdDischargeInvestigationDto ,QueryInvestigation} from './dto/result-investigation-ipd-discharge.dto';
import { ResultIpdDischargeOrderItemDto ,QueryOrderItem} from './dto/result-orderitem-ipd-discharge.dto';
import { ResultIpdDischargeBillingDto ,QueryBilling} from './dto/result-billing-ipd-discharge.dto';
const httpStatusMessageService = new HttpStatusMessageService();
const newHttpMessageDto =new HttpMessageDto();

@Injectable()
export class IpdDischargeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService
  ) {}

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
 
  const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeInvestigation(queryIpdDischargeDto.PatientInfo.VN);
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
