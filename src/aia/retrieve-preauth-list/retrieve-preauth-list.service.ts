import { Injectable , HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom  } from 'rxjs'
import { catchError, map } from 'rxjs/operators';

import { UtilsService } from '../../utils/utils.service';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { Prisma } from '../../../prisma/generate-client-db';

import { QueryRetrievePreauthListBodyDto } from './dto/query-retrieve-preauth-list.dto';
import { ResultRetrievePreAuthListDto ,InsuranceResult ,InsuranceData ,PreAuthList} from './dto/result-retrieve-preauth-list.dto';

const newHttpMessageDto =new HttpMessageDto();
const httpStatusMessageService = new HttpStatusMessageService();
const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE
@Injectable()
export class RetrievePreauthListService {

  constructor(
    private readonly httpService: HttpService,
    private readonly utilsService:UtilsService,
  ) {}

  async getretrievepreauthlist(queryCheckClaimStatusBodyDto:QueryRetrievePreauthListBodyDto){
    let xResultInfo;
    try{

    const  RequesetBody ={
      
         xRefId: queryCheckClaimStatusBodyDto.PatientInfo.RefId, 
         xTransactionNo: queryCheckClaimStatusBodyDto.PatientInfo.TransactionNo ,
         xPID : queryCheckClaimStatusBodyDto.PatientInfo.PID||'',
         xPassportnumber : queryCheckClaimStatusBodyDto.PatientInfo.PassportNumber||'',
         xIdType:queryCheckClaimStatusBodyDto.PatientInfo.IdType||'',
         xInsurerCode:queryCheckClaimStatusBodyDto.PatientInfo.InsurerCode||null,
         xHN :queryCheckClaimStatusBodyDto.PatientInfo.HN,
         xVN: queryCheckClaimStatusBodyDto.PatientInfo.VN,
    
       }

       const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       const apiURL= `${AIA_APIURL}/SmartClaim/retrievePreauthList`;
       const xUsername=AIA_APIHopitalUsername;
       const xHospitalCode =await this.utilsService.EncryptAESECB(AIA_APIHospitalCode,AIA_APISecretkey);
       const xInsurerCode=RequesetBody.xInsurerCode;
       const xElectronicSignature='';
       const xDataJsonType =3;

       const body_DataJson = {}
       const body = {
         RefId: RequesetBody.xRefId,
         TransactionNo: RequesetBody.xTransactionNo,
         Username: xUsername,
         HospitalCode: xHospitalCode,
         InsurerCode: xInsurerCode,
         ElectronicSignature: xElectronicSignature,
         DataJsonType: xDataJsonType,
         DataJson: body_DataJson
       };
       const headers = {
        'Content-Type': API_CONTENTTYPE,
        'Ocp-Apim-Subscription-Key': AIA_APISubscription,
        'Apim-Auth-Secure-Token': ObjAccessTokenKey
      };
      const responsefromAIA = await lastValueFrom(
        this.httpService
          .post(apiURL, body, { headers })
          .pipe(
            map((response) => response.data), // Return only the data part of the response
            catchError((error) => {
              console.error('Error from AIA API:', error.response?.data || error.message);
              throw new Error('Failed to call AIA API');
            })
          )
      );

      const responeInputcode =responsefromAIA.Result.Code
      if (responeInputcode !=='S'){
        this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA.Result.MessageTh,responsefromAIA.Result.MessageTh)
      }else{
        
        let xInsuranceResult= new InsuranceResult();
        xInsuranceResult ={
         Code:responsefromAIA.Result.Code ||'',
         Message:responsefromAIA.Result.Message ||'',
         MessageTh:responsefromAIA.Result.MessageTh ||'',
        }
        const xPreAuthList: PreAuthList[] = responsefromAIA.Data.PreAuthTransactionList 
        ? await Promise.all(
          responsefromAIA.Data.PreAuthTransactionList.map(async(item) => {
            return {
              ClaimNo:item.ClaimNo,
              OccerrenceNo: item.OccerrenceNo,  
              ClaimStatus:item.ClaimStatus,
              ClaimStatusDesc:item.ClaimStatusDesc,
              ExpectedAdmitDate: item.ExpectedAdmitDate,
              VisitDateTime: item.VisitDateTime,  
              Procedure:item.Procedure, 
              Diagnosis:item.Diagnosis 
            };
          })
         )
          :[];





let xInsuranceData = new InsuranceData();
xInsuranceData={
  RefId:responsefromAIA.Data.RefId,
  TransactionNo:responsefromAIA.Data.TransactionNo,
  InsurerCode:responsefromAIA.Data.InsurerCode,
  PreAuthTransactionList:xPreAuthList
}
xResultInfo ={
InsuranceResult: xInsuranceResult,
InsuranceData: xInsuranceData,
} 
this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      
        }
     

        let newResultRetrievePreAuthListDto= new ResultRetrievePreAuthListDto();
        newResultRetrievePreAuthListDto={
              HTTPStatus:newHttpMessageDto,
               Result:xResultInfo
      }

       return newResultRetrievePreAuthListDto
      } catch(error)
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
