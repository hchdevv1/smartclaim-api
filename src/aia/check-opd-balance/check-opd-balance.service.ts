import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import {HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { TrakcareService } from '../../trakcare/trakcare.service';

import { ResultlistBillingCheckBalanceDto } from './dto/result-listBillingCheckBalance.dto';
const httpStatusMessageService = new HttpStatusMessageService();

@Injectable()
export class CheckOpdBalanceService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService: TrakcareService // Inject here
  ) {}

  async listBillingCheckBalance(xVN: string ){
  
   let arrayItemBillingCheckBalance;
   const newHttpMessageDto =new HttpMessageDto();
    try{
      
     const TrakcarepatientInfo = await this.trakcareService.getOPDCheckBalance(xVN)
 
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
 


  let newResultlistBillingCheckBalanceDto= new ResultlistBillingCheckBalanceDto();
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
