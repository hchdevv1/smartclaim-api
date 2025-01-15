import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { prismaProgest } from '../../database/database';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { UtilsService } from '../../utils/utils.service';


import { QueryDiagnosisDto ,ResultSubmitDiagnosisDto} from './dto/query-diagnoisis-preauth-submission.dto';
import { QueryPreAuthNoteDto ,ResultSubmitPreAuthNoteDto} from './dto/query-preauthnote-preauth-submission.dto';
import { QueryPreBillingDto ,ResultSubmitPreBillingDto} from './dto/query-prebilling-preauth-submission.dto';
const httpStatusMessageService = new HttpStatusMessageService();
const newHttpMessageDto =new HttpMessageDto();

@Injectable()
export class PreauthSubmissionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService
  ) {}
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
        DiagnosisList = queryDiagnosisDto.PatientInfo.DiagnosisInfo.map((diagnosis) => ({
            Icd10: diagnosis.Icd10 || '',
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
                        icd10: diagnosis.Icd10,
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
  async SubmitPreBilling(queryPreBillingDto:QueryPreBillingDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryPreBillingDto.PatientInfo.RefId;
      const xTransactionNo =queryPreBillingDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryPreBillingDto.PatientInfo.InsurerCode;
      const xHN =queryPreBillingDto.PatientInfo.HN;
      const xVN =queryPreBillingDto.PatientInfo.VN;
      const xHavePreBilling = queryPreBillingDto.PatientInfo.HavePreBilling;
  let PreBillingList;
  if (xHavePreBilling ==true){
      
      if (Array.isArray(queryPreBillingDto.PatientInfo.PreBillingInfo)) {
        PreBillingList = queryPreBillingDto.PatientInfo.PreBillingInfo.map((prebilling) => ({
          LocalBillingCode: prebilling.LocalBillingCode || '',
          LocalBillingName: prebilling.LocalBillingName || '',
          SimbBillingCode: prebilling.SimbBillingCode || '',
          PayorBillingCode: prebilling.PayorBillingCode || '',
          BillingInitial: prebilling.BillingInitial || '',
          BillingDiscount: prebilling.BillingDiscount || '',
          BillingNetamount: prebilling.BillingNetamount || '',

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
                        billingnetamount: prebilling.BillingNetamount,
                      
                    }
                });
            })
        );
  
      } else {
        PreBillingList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
    PreBillingList = [
          {
              "LocalBillingCode": "",
              "LocalBillingName": "",
              "SimbBillingCode": "",
              "PayorBillingCode": "",
              "BillingInitial": "",
              "BillingDiscount": "",
              "BillingNetAmount": "",
          }
      ]
   // console.log(xHaveProcedure)
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Pre-Billing','')
  }
  
    
      
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
