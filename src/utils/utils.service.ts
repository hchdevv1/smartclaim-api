/* eslint-disable @typescript-eslint/no-require-imports */
import { Injectable ,NotFoundException, HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { readFileSync } from 'fs';
import { promisify } from 'util'; // Import promisify จาก util
import * as fs from 'fs'; // Import fs แบบเต็ม


import { join } from 'path';
import { readFile } from 'fs/promises'; 

import { prismaProgest } from '../database/database';
import { Prisma } from '../../prisma/generate-client-db';
import { HttpStatusMessageService } from './http-status-message/http-status-message.service';
import { HttpMessageDto } from '../utils/dto/http-status-message.dto'

import { aia_accessTokenDTO, IllnessTypeDto ,IllnessSurgeryDto,PolicyTypeDto ,ServiceSettingDto ,ClaimStatusDto ,IdTypeDto ,DocumentTypeDto
  ,CauseofInjurywoundtypeDto ,CauseofinjurysideDto ,AccidentplaceDto ,Accidentcauseover45daysDto ,DiagnosisTypeMappingDto
  ,AnesthesiaListDto ,OpeartionisPackageDto ,IndicationsForAdmissionDto
} from './dto/utils.dto';
import { QueryCreateClaimDocumentDtoBodyDto ,ResultAttachDocListInfoDto ,QuerylistDocumentNameDtoBodyDto  ,QueryDeleteDocumentByDocNameDto
  ,ResultDeleteDocumentByDocNameDto ,QueryListDocumentforAttachDocListDto ,ResultUpdateDocumentByDocNameDto
}from './dto/claim-documents.dto';
import { QueryProcedeureDatabaseBodyDto , ResultOpdDischargeProcedurDto ,ProcedeureDatabaseResultInfo } from './dto/result-procedure-databse.dto';
import { QueryDiagnosisDatabaseBodyDto ,ResultPreDiagnosisDto ,PreDiagnosisDatabaseResultInfo} from './dto/result-diagnosis-databse.dto';
import { QueryVisitDatabaseBodyDto ,ResultOpdDischargeVisitDto ,VisitDatabaseResultInfo ,QueryVisitDatabse } from './dto/result-visit-databse.dto';
import { QueryAccidentDatabaseBodyDto ,ResultAccidentDatabaseDto
,AccidentDatabaseResultInfo
} from './dto/result-accident-databse.dto';
import { QueryPreBillingDatabaseBodyDto,ResultPreBillingDto ,PreBillingDatabaseResultInfo} from './dto/result-prebilling-databse.dto';
import { QueryConcurNoteDatabaseBodyDto, ResultConcurNoteDto ,ConcurNoteDatabaseResultInfo} from './dto/result-concurnote-databse.dto';
import { QueryPreAuthNoteDatabaseBodyDto ,ResultPreAuthNoteDto ,PreAuthNoteDatabaseResultInfo } from './dto/result-preauthnote-databse.dto';

const unlinkAsync = promisify(fs.unlink); 
const aesEcb = require('aes-ecb');
const AIA_APIURL= process.env.AIA_APIURL;
const API_CONTENTTYPE= process.env.API_CONTENTTYPE;
const AIA_APISubscription = process.env.AIA_APISubscription
const AIA_APIMUserId = process.env.AIA_APIMUserId
const AIA_APIMAppId = [process.env.AIA_APIMAppId]
const httpStatusMessageService = new HttpStatusMessageService();
const newHttpMessageDto =new HttpMessageDto();

@Injectable()
export class UtilsService {
  constructor(private readonly  httpService: HttpService) {}

  
  EncryptAESECB(text:string , APISecretkey:string){
      const encryptText = aesEcb.encrypt(APISecretkey,text)
  return  encryptText;
  }

  DecryptAESECB(text:string , APISecretkey:string){
    const decryptText = aesEcb.decrypt(APISecretkey,text)
    return  decryptText;
   }
   async requestAccessToken_AIA(){
    const aiaAccessTokenDTO = new aia_accessTokenDTO();
    const apiURL= `${AIA_APIURL}/TokenManager/requestAccessToken`;
    try{
      const response = await firstValueFrom(
        this.httpService.post(
          apiURL,
          { userId: AIA_APIMUserId, appId: AIA_APIMAppId },
          {
            headers: {
              'Content-Type': API_CONTENTTYPE,
              'Ocp-Apim-Subscription-Key': AIA_APISubscription,
            },
          },
        ),
      );
      aiaAccessTokenDTO.tokenStatus = response.data.statusCode;
      aiaAccessTokenDTO.accessTokenKey = response.data.accessTokenInfo.accessToken;
      aiaAccessTokenDTO.tokenType = response.data.accessTokenInfo.tokenType
      aiaAccessTokenDTO.expireIn = response.data.accessTokenInfo.expireIn;
      aiaAccessTokenDTO.tokenIssueTime =response.data.accessTokenInfo.tokenIssueTime
      //console.log(aiaAccessTokenDTO)
        if (!aiaAccessTokenDTO || aiaAccessTokenDTO.accessTokenKey.length === 0) {
          throw new HttpException('AIA AccessToken not found', HttpStatus.NOT_FOUND);
        }
    } catch(error)
      {
         if (error instanceof Prisma.PrismaClientInitializationError) {
            throw new HttpException(
             {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessage((HttpStatus.INTERNAL_SERVER_ERROR))
              },HttpStatus.INTERNAL_SERVER_ERROR );
          }else { 
             if (error instanceof HttpException) {
            throw error;
         }  throw new HttpException(
           {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessage((HttpStatus.INTERNAL_SERVER_ERROR))
           },HttpStatus.INTERNAL_SERVER_ERROR );
          }
      }
   return aiaAccessTokenDTO  
  }
  async IllnessType(xInsurercode: string ) {
    let illnessType:any ;
    try{
       illnessType = await prismaProgest.illnesstype.findMany({ 
       
      where:{
        insurers:{  insurercode : +xInsurercode }
       },  
      select:{
        illnesstypecode :true,
        illnesstypedesc:true,
        insurerid:true,
        insurers:{
          select:{
              insurercode:true,
              insurername:true
          }
        }

      },
       })
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
       let  newIllnessTypeDto= new IllnessTypeDto();
       newIllnessTypeDto={
         HTTPStatus:newHttpMessageDto,
        Result:illnessType
       }
       if (!illnessType || illnessType.length === 0) {
        this.addFormatHTTPStatus(newHttpMessageDto,404,'IllnessType not found','')
      }else{
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }
       return newIllnessTypeDto  
    
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

  async IllnessSurgery(xInsurercode: string ) {
    let illnessSurgery:any ;
    try{
      illnessSurgery = await prismaProgest.illnesssurgery.findMany({ 
       
      where:{
        insurers:{  insurercode : +xInsurercode }
       },  
      select:{
        iscode :true,
        isdesc:true,
        insurerid:true,
        insurers:{
          select:{
              insurercode:true,
              insurername:true
          }
        }

      },
       })
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
       let  newIllnessSurgeryDto= new IllnessSurgeryDto();
       newIllnessSurgeryDto={
         HTTPStatus:newHttpMessageDto,
        Result:illnessSurgery
       }
       if (!illnessSurgery || illnessSurgery.length === 0) {
        this.addFormatHTTPStatus(newHttpMessageDto,404,'illnessSurgery not found','')
      }else{
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }
       return newIllnessSurgeryDto  
       
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
  async policyType(xInsurercode: string ) {
    let policytype:any ;
    try{
      policytype = await prismaProgest.policytype.findMany({ 
       
      where:{
        insurers:{  insurercode : +xInsurercode }
       },  
      select:{
        policytypecode :true,
        policytypedesc:true,
        insurerid:true,
        insurers:{
          select:{
              insurercode:true,
              insurername:true
          }
        }

      },
       })
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
       let  newPolicyTypeDto= new PolicyTypeDto();
       newPolicyTypeDto={
         HTTPStatus:newHttpMessageDto,
        Result:policytype
       }
       if (!policytype || policytype.length === 0) {
        this.addFormatHTTPStatus(newHttpMessageDto,404,'Policytype not found','')
      }else{
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }
       return newPolicyTypeDto  
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
  async getServiceSetting(xInsurercode: string ) {
    let servicesetting:any ;
    try{
      servicesetting = await prismaProgest.servicesetting.findMany({ 
       
      where:{
        insurers:{  insurercode : +xInsurercode }
       },  
      select:{
        servicesettingcode :true,
        servicesettingdesc:true,
        insurerid:true,
        insurers:{
          select:{
              insurercode:true,
              insurername:true
          }
        }

      },
       })
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
       let  newServiceSettingDto= new ServiceSettingDto();
       newServiceSettingDto={
         HTTPStatus:newHttpMessageDto,
        Result:servicesetting
       }
       if (!servicesetting || servicesetting.length === 0) {
        this.addFormatHTTPStatus(newHttpMessageDto,404,'Servicesetting not found','')
      }else{
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }
       return newServiceSettingDto  
       
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

async getClaimStatus(xInsurercode: string ) {
  let claimstatus:any ;
  try{
    claimstatus = await prismaProgest.claimstatus.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      claimstatuscode :true,
      claimstatusdesc_en:true,
      claimstatusdesc_th:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newClaimStatusDto= new ClaimStatusDto();
     newClaimStatusDto={
       HTTPStatus:newHttpMessageDto,
      Result:claimstatus
     }
     if (!claimstatus || claimstatus.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'claimstatus not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newClaimStatusDto  
    
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


async getIdType(xInsurercode: string ) {
  let idtype:any ;
  try{
    idtype = await prismaProgest.idtype.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      idtypecode :true,
      idtypedesc_th:true,
      idtypedesc_en:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newIdTypeDto= new IdTypeDto();
     newIdTypeDto={
       HTTPStatus:newHttpMessageDto,
      Result:idtype
     }
     if (!idtype || idtype.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'IdType not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newIdTypeDto  
    
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
async getClaimStatusCodeByDescription(xInsurercode: string,xDesc: string ) {
  let claimstatus:any ;
  try{
    claimstatus = await prismaProgest.claimstatus.findMany({ 
     
    where:{
      claimstatusdesc_en:xDesc,
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      claimstatuscode :true,
    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newClaimStatusDto= new ClaimStatusDto();
     newClaimStatusDto={
       HTTPStatus:newHttpMessageDto,
      Result:claimstatus
     }
     if (!claimstatus || claimstatus.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'claimstatus not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newClaimStatusDto  
    
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
async getDocumentType(xInsurercode: string ) {
  let documenttype:any ;
  try{
    documenttype = await prismaProgest.documenttype.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      documenttypecode :true,
      documenttypename:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newDocumentTypeDto= new DocumentTypeDto();
     newDocumentTypeDto={
       HTTPStatus:newHttpMessageDto,
      Result:documenttype
     }
     if (!documenttype || documenttype.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'documenttype not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newDocumentTypeDto  
     
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
async getdocumentTypeforAttachDocList(xInsurercode: string ) {
  let documenttype:any ;
  try{
    documenttype = await prismaProgest.documenttype.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode },
      documenttypecode: {
        not: { in: ['003','007','008'] }, // ใช้ not กับ in เพื่อยกเว้นค่า '001'
      }
     },  
    select:{
      documenttypecode :true,
      documenttypename:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newDocumentTypeDto= new DocumentTypeDto();
     newDocumentTypeDto={
       HTTPStatus:newHttpMessageDto,
      Result:documenttype
     }
     if (!documenttype || documenttype.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'documenttype not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newDocumentTypeDto  
     
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
async getAnesthesiaList(xInsurercode: string ) {
  let anesthesialist:any ;
  try{
    anesthesialist = await prismaProgest.anesthesialist.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      aneslistcode :true,
      aneslistname:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newAnesthesiaListDto = new AnesthesiaListDto();
     newAnesthesiaListDto={
       HTTPStatus:newHttpMessageDto,
      Result:anesthesialist
     }
     if (!anesthesialist || anesthesialist.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'Anesthesia List not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newAnesthesiaListDto  
     
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
async getOpeartionisPackage(xInsurercode: string ) {
  let opeartionispackage:any ;
  try{
    opeartionispackage = await prismaProgest.opeartionispackage.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      oiscode :true,
      oisname:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newOpeartionisPackageDto = new OpeartionisPackageDto();
     newOpeartionisPackageDto={
       HTTPStatus:newHttpMessageDto,
      Result:opeartionispackage
     }
     if (!opeartionispackage || opeartionispackage.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'OpeartionisPackage not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newOpeartionisPackageDto  
     
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
async getIndicationsForAdmission(xInsurercode: string ) {
  let indicationsforadmission:any ;
  try{
    indicationsforadmission = await prismaProgest.indicationsforadmission.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      ifacode :true,
      ifaname:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newIndicationsForAdmissionDto = new IndicationsForAdmissionDto();
     newIndicationsForAdmissionDto={
       HTTPStatus:newHttpMessageDto,
      Result:indicationsforadmission
     }
     if (!indicationsforadmission || indicationsforadmission.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'Indications for admission not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newIndicationsForAdmissionDto  
     
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
async getvisitformDatabase(queryVisitDatabaseBodyDto: QueryVisitDatabaseBodyDto) {
  const xRefId =queryVisitDatabaseBodyDto.RefId;
  const xTransactionNo = queryVisitDatabaseBodyDto.TransactionNo;
  const xVN =queryVisitDatabaseBodyDto.VN;
  let  newResultOpdDischargeVisitDto= new ResultOpdDischargeVisitDto();


  const visittransactionclaim = await prismaProgest.transactionclaim.findFirst({ 
    where: {
      vn: xVN,
      refid: xRefId,
      transactionno: xTransactionNo,
    },  
    select: {
      previoustreatmentdate: true,
      previoustreatmentdetail: true, 
      isreimbursement: true, batchnumber: true, 
      invoicenumber: true, otherinsurer: true, furtherclaimid: true,
      furtherclaimno: true, furtherclaimvn: true,

     
    },
  });
///////////////////  
// console.log(xVN)
// console.log(xRefId)
// console.log(xTransactionNo)

// Query by vn only
// const queryByVN = await prismaProgest.medicaltransactions.findMany({
//   where: {
//     vn: xVN,
//   },
// });
// console.log('Query by VN:', queryByVN);

// // Query by refid only
// const queryByRefId = await prismaProgest.medicaltransactions.findMany({
//   where: {
//     refid: xRefId,
//   },
// });
// console.log('Query by RefId:', queryByRefId);

// // Query by transactionno only
// const queryByTransactionNo = await prismaProgest.medicaltransactions.findMany({
//   where: {
//     transactionno: xTransactionNo,
//   },
// });
// console.log('Query by TransactionNo:', queryByTransactionNo);


//////
const visittransactionsInfo = await prismaProgest.medicaltransactions.findFirst({ 
  where: {
    vn: xVN,
    refid: xRefId,
    transactionno: xTransactionNo,
  },  
  select: {
    refid:true,
    dxfreetext: true,
     presentillness: true, chiefcomplaint: true,
      accidentcauseover45days: true, underlyingcondition: true, 
      physicalexam: true, planoftreatment: true, procedurefreetext: true,
       additionalnote: true, signsymptomsdate: true, comascore: true,
        expecteddayofrecovery: true, pregnant: true, alcoholrelated: true,
         haveaccidentinjurydetail: true, haveaccidentcauseofinjurydetail: true, haveprocedure: true,
          privatecase: true,visitdatetime:true,
          weight:true,height:true,vn:true
   
  },
});
// console.log('========xxxxxxx============')
// console.log(visittransactionsInfo)
// console.log('========yyyyyy============')
if(visittransactionsInfo){
  // console.log('AAAAA 11111111')

  //console.log('yyy111yyy')
  const visitDatabaseResultInfo = new VisitDatabaseResultInfo();
  visitDatabaseResultInfo.VisitInfo = {
 
    FurtherClaimId:visittransactionclaim.furtherclaimid,

    AccidentCauseOver45Days:visittransactionsInfo.accidentcauseover45days,
    AdditionalNote:visittransactionsInfo.additionalnote,
    AlcoholRelated:visittransactionsInfo.alcoholrelated,
    ChiefComplaint:visittransactionsInfo.chiefcomplaint,
    ComaScore:visittransactionsInfo.comascore,
    DxFreeText:visittransactionsInfo.dxfreetext,
    ExpectedDayOfRecovery:visittransactionsInfo.expecteddayofrecovery,
  Height:visittransactionsInfo.height,
  PhysicalExam:visittransactionsInfo.physicalexam,
  PlanOfTreatment:visittransactionsInfo.planoftreatment,
   Pregnant:visittransactionsInfo.pregnant,
   PresentIllness:visittransactionsInfo.presentillness,
     PreviousTreatmentDate: visittransactionclaim.previoustreatmentdate,
    PreviousTreatmentDetail: visittransactionclaim.previoustreatmentdetail,
    PrivateCase:visittransactionsInfo.privatecase,
    ProcedureFreeText:visittransactionsInfo.procedurefreetext,
    SignSymptomsDate:visittransactionsInfo.signsymptomsdate,
    UnderlyingCondition:visittransactionsInfo.underlyingcondition,

   VisitDateTime:visittransactionsInfo.visitdatetime,

    VN:visittransactionsInfo.vn,

    Weight:visittransactionsInfo.weight,

  };
  //console.log(visitDatabaseResultInfo)
  //console.log('yyy222yyy')
      // this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      
     
       if (!visitDatabaseResultInfo.VisitInfo) {
      
        this.addFormatHTTPStatus(newHttpMessageDto,404,'VisitInfo not found','')
      }else{
    
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }
      newResultOpdDischargeVisitDto={
        HTTPStatus:newHttpMessageDto,
        Result:visitDatabaseResultInfo 
      }
}
else{
  // console.log('AAAAA 22222')

  let newQueryVisitDatabse =new QueryVisitDatabse();
  newQueryVisitDatabse={
          AccidentCauseOver45Days:'',
          AdditionalNote:'',
          AlcoholRelated:false,
          ChiefComplaint:'',
          ComaScore:'',
          DxFreeText:'',
          ExpectedDayOfRecovery:'',
          Height:'',
        PhysicalExam:'',
        PlanOfTreatment:'',
         Pregnant:false,
         PresentIllness:'',
         PreviousTreatmentDate:'',
         PreviousTreatmentDetail:'',
          PrivateCase:false,
          ProcedureFreeText:'',
          SignSymptomsDate:'',
          UnderlyingCondition:'',
          VN:'',
        }
      let newVisitDatabaseResultInfo =new VisitDatabaseResultInfo();
      newVisitDatabaseResultInfo={ VisitInfo: newQueryVisitDatabse}
      newResultOpdDischargeVisitDto =
  {
      HTTPStatus: {
        statusCode:400, message: 'VisitInfo not found', error: '' 
      },
      Result : newVisitDatabaseResultInfo 
    }
}

     return newResultOpdDischargeVisitDto  

}
async getvisitIPDformDatabase(queryVisitDatabaseBodyDto: QueryVisitDatabaseBodyDto) {
  const xRefId =queryVisitDatabaseBodyDto.RefId;
  const xTransactionNo = queryVisitDatabaseBodyDto.TransactionNo;
  const xVN =queryVisitDatabaseBodyDto.VN;
  let  newResultOpdDischargeVisitDto= new ResultOpdDischargeVisitDto();


  const visittransactionclaim = await prismaProgest.transactionclaim.findFirst({ 
    where: {
      vn: xVN,
      refid: xRefId,
      transactionno: xTransactionNo,
    },  
    select: {
      previoustreatmentdate: true,
      previoustreatmentdetail: true, 
      isreimbursement: true, batchnumber: true, 
      invoicenumber: true, otherinsurer: true, furtherclaimid: true,
      furtherclaimno: true, furtherclaimvn: true,
      preauthreferclaimno:true,preauthreferocc:true,
     
    },
  });
///////////////////  
// console.log(xVN)
// console.log(xRefId)
// console.log(xTransactionNo)

// Query by vn only
// const queryByVN = await prismaProgest.medicaltransactions.findMany({
//   where: {
//     vn: xVN,
//   },
// });
// console.log('Query by VN:', queryByVN);

// // Query by refid only
// const queryByRefId = await prismaProgest.medicaltransactions.findMany({
//   where: {
//     refid: xRefId,
//   },
// });
// console.log('Query by RefId:', queryByRefId);

// // Query by transactionno only
// const queryByTransactionNo = await prismaProgest.medicaltransactions.findMany({
//   where: {
//     transactionno: xTransactionNo,
//   },
// });
// console.log('Query by TransactionNo:', queryByTransactionNo);


//////
const visittransactionsInfo = await prismaProgest.medicaltransactions.findFirst({ 
  where: {
    vn: xVN,
    refid: xRefId,
    transactionno: xTransactionNo,
  },  
  select: {
    refid:true,
    dxfreetext: true,
     presentillness: true, chiefcomplaint: true,
      accidentcauseover45days: true, underlyingcondition: true, 
      physicalexam: true, planoftreatment: true, procedurefreetext: true,
       additionalnote: true, signsymptomsdate: true, comascore: true,
        expecteddayofrecovery: true, pregnant: true, alcoholrelated: true,
         haveaccidentinjurydetail: true, haveaccidentcauseofinjurydetail: true, haveprocedure: true,
          privatecase: true,visitdatetime:true,
          weight:true,height:true,vn:true
         ,expectedadmitdate:true,preauthreferclaimno:true,
         preauthreferocc:true,indicationforadmission:true,
         dscdatetime:true,ispackage:true,
         totalestimatedcost:true,anesthesialist:true,
         accidentdate:true,
         isipddischarge:true,
         admitdatetime:true,
         
         
  },
});


// console.log('========xxxxxxx============')
// console.log(visittransactionsInfo)
// console.log('========yyyyyy============')
if(visittransactionsInfo){
  // console.log('AAAAA 11111111')

  //console.log('yyy111yyy')
  const visitDatabaseResultInfo = new VisitDatabaseResultInfo();
  visitDatabaseResultInfo.VisitInfo = {
 
    FurtherClaimId:visittransactionclaim.furtherclaimid,

    AccidentCauseOver45Days:visittransactionsInfo.accidentcauseover45days,
    AdditionalNote:visittransactionsInfo.additionalnote,
    AlcoholRelated:visittransactionsInfo.alcoholrelated,
    ChiefComplaint:visittransactionsInfo.chiefcomplaint,
    ComaScore:visittransactionsInfo.comascore,
    DxFreeText:visittransactionsInfo.dxfreetext,
    ExpectedDayOfRecovery:visittransactionsInfo.expecteddayofrecovery,
  Height:visittransactionsInfo.height,
  PhysicalExam:visittransactionsInfo.physicalexam,
  PlanOfTreatment:visittransactionsInfo.planoftreatment,
   Pregnant:visittransactionsInfo.pregnant,
   PresentIllness:visittransactionsInfo.presentillness,
     PreviousTreatmentDate: visittransactionclaim.previoustreatmentdate,
    PreviousTreatmentDetail: visittransactionclaim.previoustreatmentdetail,
    PrivateCase:visittransactionsInfo.privatecase,
    ProcedureFreeText:visittransactionsInfo.procedurefreetext,
    SignSymptomsDate:visittransactionsInfo.signsymptomsdate,
    UnderlyingCondition:visittransactionsInfo.underlyingcondition,

   VisitDateTime:visittransactionsInfo.visitdatetime,

    VN:visittransactionsInfo.vn,

    Weight:visittransactionsInfo.weight,
    ExpectedAdmitDate:visittransactionsInfo.expectedadmitdate,
    PreauthReferClaimNo:visittransactionsInfo.preauthreferclaimno,
    PreauthReferOcc:visittransactionsInfo.preauthreferocc,
    IndicationForAdmission:visittransactionsInfo.indicationforadmission,
    DscDateTime:visittransactionsInfo.dscdatetime,
    IsPackage:visittransactionsInfo.ispackage,
    TotalEstimatedCost:visittransactionsInfo.totalestimatedcost,
    AnesthesiaList:visittransactionsInfo.anesthesialist,
    AccidentDate:visittransactionsInfo.accidentdate,
    IsIPDDischarge:visittransactionsInfo.isipddischarge,
    AdmitDateTime:visittransactionsInfo.admitdatetime
  };

  //console.log(visitDatabaseResultInfo)
  //console.log('yyy222yyy')
      // this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      
     
       if (!visitDatabaseResultInfo.VisitInfo) {
      
        this.addFormatHTTPStatus(newHttpMessageDto,404,'VisitInfo not found','')
      }else{
    
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }
      newResultOpdDischargeVisitDto={
        HTTPStatus:newHttpMessageDto,
        Result:visitDatabaseResultInfo 
      }
}
else{
  // console.log('AAAAA 22222')

  let newQueryVisitDatabse =new QueryVisitDatabse();
  newQueryVisitDatabse={
          AccidentCauseOver45Days:'',
          AdditionalNote:'',
          AlcoholRelated:false,
          ChiefComplaint:'',
          ComaScore:'',
          DxFreeText:'',
          ExpectedDayOfRecovery:'',
          Height:'',
        PhysicalExam:'',
        PlanOfTreatment:'',
         Pregnant:false,
         PresentIllness:'',
         PreviousTreatmentDate:'',
         PreviousTreatmentDetail:'',
          PrivateCase:false,
          ProcedureFreeText:'',
          SignSymptomsDate:'',
          UnderlyingCondition:'',
          VN:'',
          TotalEstimatedCost:'',
          IsIPDDischarge:null,
          AdmitDateTime:''
        }
      let newVisitDatabaseResultInfo =new VisitDatabaseResultInfo();
      newVisitDatabaseResultInfo={ VisitInfo: newQueryVisitDatabse}
      newResultOpdDischargeVisitDto =
  {
      HTTPStatus: {
        statusCode:400, message: 'VisitInfo not found', error: '' 
      },
      Result : newVisitDatabaseResultInfo 
    }
}

     return newResultOpdDischargeVisitDto  

}

async getProcedureformDatabase(queryProcedeureDatabaseBodyDto: QueryProcedeureDatabaseBodyDto) {
  
  const xRefId =queryProcedeureDatabaseBodyDto.RefId;
  const xTransactionNo = queryProcedeureDatabaseBodyDto.TransactionNo;
  const xVN =queryProcedeureDatabaseBodyDto.VN;
  // console.log('yyyyyy')
  // console.log(xRefId)
  // console.log(xTransactionNo)
  // console.log(xVN)
  let  newResultOpdDischargeProcedurDto= new ResultOpdDischargeProcedurDto();
// ดึงข้อมูลจากฐานข้อมูล
const proceduretransactionsInfo = await prismaProgest.proceduretransactions.findMany({ 
  where: {
    vn: xVN,
    refid: xRefId,
    transactionno: xTransactionNo,
  },  
  select: {
    icd9: true,
    procedurename: true,
    proceduredate: true,
  },
});
// console.log(proceduretransactionsInfo)
// console.log('yyyyyy')
if(proceduretransactionsInfo){
  const procedureInfoInstance = new ProcedeureDatabaseResultInfo();
  procedureInfoInstance.ProcedureInfo = proceduretransactionsInfo.map(item => ({
    Icd9: item.icd9, // สร้าง object ใหม่ตามโครงสร้างที่ต้องการ
    ProcedureName: item.procedurename,
    ProcedureDate: item.proceduredate,
  }));
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      
       newResultOpdDischargeProcedurDto={
         HTTPStatus:newHttpMessageDto,
         Result:procedureInfoInstance
       }
       if (!proceduretransactionsInfo || proceduretransactionsInfo.length === 0) {
      
        this.addFormatHTTPStatus(newHttpMessageDto,404,'Procedure not found','')
      }else{
    
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }

}else{
  newResultOpdDischargeProcedurDto =
  {
      HTTPStatus: {
        statusCode: 200, message: 'Procedure not found', error: '' 
      },
      Result:{
        ProcedureInfo:[   {
          Icd9: '',
          ProcedureName: '',
          ProcedureDate:''
        }
            
        ]
        
      }
}
}

     return newResultOpdDischargeProcedurDto  

}

async getDiagnosisformDatabase(queryDiagnosisDatabaseBodyDto: QueryDiagnosisDatabaseBodyDto) {
  
  const xRefId =queryDiagnosisDatabaseBodyDto.RefId;
  const xTransactionNo = queryDiagnosisDatabaseBodyDto.TransactionNo;
  const xVN =queryDiagnosisDatabaseBodyDto.VN;
 
  let  newResultPreDiagnosisDto= new ResultPreDiagnosisDto();
// ดึงข้อมูลจากฐานข้อมูล
const diagnosistransactionsInfo = await prismaProgest.diagnosistransactions.findMany({ 
  where: {
    vn: xVN,
    refid: xRefId,
    transactionno: xTransactionNo,
  },  
  select: {
    icd10: true,
    dxname: true,
    dxtype: true,
  },
});
// console.log(proceduretransactionsInfo)
// console.log('yyyyyy')
if(diagnosistransactionsInfo){
  const prediagnosisInfoInstance = new PreDiagnosisDatabaseResultInfo();
  prediagnosisInfoInstance.DiagnosisInfo = diagnosistransactionsInfo.map(item => ({
    Icd10: item.icd10, // สร้าง object ใหม่ตามโครงสร้างที่ต้องการ
    DxName: item.dxname,
    DxType: item.dxtype,
  }));
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      
       newResultPreDiagnosisDto={
         HTTPStatus:newHttpMessageDto,
         Result:prediagnosisInfoInstance
       }
       if (!diagnosistransactionsInfo || diagnosistransactionsInfo.length === 0) {
      
        this.addFormatHTTPStatus(newHttpMessageDto,404,'Procedure not found','')
      }else{
    
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }

}else{
  newResultPreDiagnosisDto =
  {
      HTTPStatus: {
        statusCode: 200, message: 'Procedure not found', error: '' 
      },
      Result:{
        DiagnosisInfo:[   {
          Icd10: '',
          DxName: '',
          DxType:''
        }
            
        ]
        
      }
}
}

     return newResultPreDiagnosisDto  

}

async getAccidentformDatabase(queryAccidentDatabaseBodyDto: QueryAccidentDatabaseBodyDto) {
  
  const xRefId =queryAccidentDatabaseBodyDto.RefId; //'111ccXwZWYmukJdvzFrWaccN8bNr83caECQjC+vvuEaIKY=a';//
  const xTransactionNo = queryAccidentDatabaseBodyDto.TransactionNo; //'1115c5aabb3-b919-4ee8-ac42-848ae4d5f55aa';//
  const xVN =queryAccidentDatabaseBodyDto.VN; //'O415203-64';//
  //console.log('start accident')
  let  newResultAccidentDatabaseDto= new ResultAccidentDatabaseDto();
const accidentTransactionInfo = await prismaProgest.accidenttransactions.findFirst({
  where: {
    refid: xRefId,
   transactionno: xTransactionNo,
    vn: xVN,
  },
  select: {
    accidentplace: true,
    accidentdate: true,
    causeofinjurydetail: {
      select: {
        causeofinjury: true,
        commentofinjury: true,
      },
    },
    injurydetail: {
      select: {
        woundtype: true,
        injuryside: true,
        injuryarea: true,
      },
    },
  },
});
//console.log(accidentTransactionInfo)
if (accidentTransactionInfo){
  const accidentInfoInstance = new AccidentDatabaseResultInfo();
  accidentInfoInstance.AccidentDetailInfo = {
   AccidentPlace: accidentTransactionInfo.accidentplace || '',
   AccidentDate: accidentTransactionInfo.accidentdate || '',
   CauseOfInjuryDetail: accidentTransactionInfo.causeofinjurydetail.map(cause => ({
     CauseOfInjury: cause.causeofinjury || '',
     CommentOfInjury: cause.commentofinjury || ''
   })),
   InjuryDetail: accidentTransactionInfo.injurydetail.map(injury => ({
     WoundType: injury.woundtype || '',
     InjurySide: injury.injuryside || '',
     InjuryArea: injury.injuryarea || ''
   }))
 };
 this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
 
 newResultAccidentDatabaseDto={
   HTTPStatus:newHttpMessageDto,
   Result:accidentInfoInstance
 }
 if (!accidentInfoInstance) {
        this.addFormatHTTPStatus(newHttpMessageDto,200,'Accident not found','')
      }else{
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }
}else{
  newResultAccidentDatabaseDto =
      {
          HTTPStatus: {
            statusCode: 200, message: 'Accident not found', error: '' 
          },
          Result:{
            AccidentDetailInfo:{      
                AccidentPlace: '',
                AccidentDate: '',
                CauseOfInjuryDetail : [],
                 InjuryDetail: []
            }
            
          }
  }
}



// ตอนนี้ accidentInfoInstance จะเก็บข้อมูลที่สร้างจาก accidentTransactionInfo
// console.log(accidentInfoInstance);
// console.log('accidentInfoInstance.AccidentDetailInfo')
// console.log(accidentInfoInstance)
   
   

     return newResultAccidentDatabaseDto

}

async getCauseofInjurywoundtype(xInsurercode: string ) {
  let causeofinjurywoundtype:any ;
  try{
    causeofinjurywoundtype = await prismaProgest.causeofinjurywoundtype.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      woundtypecode :true,
      woundtypename:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newCauseofInjurywoundtypeDto= new CauseofInjurywoundtypeDto();
     newCauseofInjurywoundtypeDto={
       HTTPStatus:newHttpMessageDto,
      Result:causeofinjurywoundtype
     }
     if (!causeofinjurywoundtype || causeofinjurywoundtype.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'causeofinjurywoundtype not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newCauseofInjurywoundtypeDto  
    
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
async getCauseofInjurySide(xInsurercode: string ) {
  let causeofinjuryside:any ;
  try{
    causeofinjuryside = await prismaProgest.causeofinjuryside.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      injurysidecode :true,
      injurysidename:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newCauseofinjurysideDto= new CauseofinjurysideDto();
     newCauseofinjurysideDto={
       HTTPStatus:newHttpMessageDto,
      Result:causeofinjuryside
     }
     if (!causeofinjuryside || causeofinjuryside.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'Causeofinjurysidenot not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newCauseofinjurysideDto  
     
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
async getAccidentPlace(xInsurercode: string ) {
  let accidentplace:any ;
  try{
    accidentplace = await prismaProgest.accidentplace.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      accidentplacecode:true,
      accidentplacename:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     
     let  newAccidentplaceDto= new AccidentplaceDto();
     newAccidentplaceDto={
       HTTPStatus:newHttpMessageDto,
      Result:accidentplace
     }
      if (!accidentplace || accidentplace.length === 0) {
        this.addFormatHTTPStatus(newHttpMessageDto,404,'Accidentplace not found','')
      }else{
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }
      return newAccidentplaceDto  
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
async getAccidentCauseOver45Day(xInsurercode: string ) {
  let accidentcauseover45days:any ;
  try{
    accidentcauseover45days = await prismaProgest.accidentcauseover45days.findMany({ 
     
    where:{
      insurers:{  insurercode : +xInsurercode }
     },  
    select:{
      causeovercode:true,
      causeoverdesc:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newAccidentcauseover45daysDto= new Accidentcauseover45daysDto();
     newAccidentcauseover45daysDto={
       HTTPStatus:newHttpMessageDto,
      Result:accidentcauseover45days
     }
     if (!accidentcauseover45days || accidentcauseover45days.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'accidentcauseover45days not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newAccidentcauseover45daysDto  
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

async getPreBillingformDatabase(queryPreBillingDatabaseBodyDto: QueryPreBillingDatabaseBodyDto) {
  
  const xRefId =queryPreBillingDatabaseBodyDto.RefId;
  const xTransactionNo = queryPreBillingDatabaseBodyDto.TransactionNo;
  const xVN =queryPreBillingDatabaseBodyDto.VN;

  let  newResultPreBillingDto= new ResultPreBillingDto();
// ดึงข้อมูลจากฐานข้อมูล
const prebillingtransactionsInfo = await prismaProgest.prebillingtransactions.findMany({ 
  where: {
    vn: xVN,
    refid: xRefId,
    transactionno: xTransactionNo,
  },  
  select: {
    localbillingcode: true,
    localbillingname: true,
    simbbillingcode: true,
    payorbillingcode: true,
    billinginitial: true,
    billingdiscount: true,
    billingnetamount: true,
    totalbillamount:true
  },
});

if(prebillingtransactionsInfo){
  const prebillingInfoInstance = new PreBillingDatabaseResultInfo();
  prebillingInfoInstance.PreBillingInfo = prebillingtransactionsInfo.map(item => ({
    LocalBillingCode: item.localbillingcode, 
    LocalBillingName: item.localbillingname,
    SimbBillingCode: item.simbbillingcode,
    PayorBillingCode: item.payorbillingcode,
    BillingInitial: item.billinginitial,
    BillingDiscount: item.billingdiscount,
    BillingNetAmount: item.billingnetamount,
    TotalBillAmount: item.totalbillamount
  }));
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      
       newResultPreBillingDto={
         HTTPStatus:newHttpMessageDto,
         Result:prebillingInfoInstance
       }
       if (!prebillingtransactionsInfo || prebillingtransactionsInfo.length === 0) {
      
        this.addFormatHTTPStatus(newHttpMessageDto,404,'Pre-Billing  not found','')
      }else{
    
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }

}else{
  newResultPreBillingDto =
  {
      HTTPStatus: {
        statusCode: 200, message: 'Pre-Billing not found', error: '' 
      },
      Result:{
        PreBillingInfo:[   {
         
          LocalBillingCode: '',
          LocalBillingName: '',
          SimbBillingCode: '',
          PayorBillingCode: '',
          BillingInitial: '',
          BillingDiscount: '',
          BillingNetAmount: '',
          TotalBillAmount:''
        }
            
        ]
        
      }
}
}

     return newResultPreBillingDto  

}
async getConcurNoteformDatabase(queryConcurNoteDatabaseBodyDto: QueryConcurNoteDatabaseBodyDto) {
  
  const xRefId =queryConcurNoteDatabaseBodyDto.RefId;
  const xTransactionNo = queryConcurNoteDatabaseBodyDto.TransactionNo;
  const xVN =queryConcurNoteDatabaseBodyDto.VN;
  // console.log('yyyyyy')  ResultConcurNoteDto ,ConcurNoteDatabaseResultInfo
  let  newResultConcurNoteDto= new ResultConcurNoteDto();
// ดึงข้อมูลจากฐานข้อมูล
const concurrentnotetransactionsInfo = await prismaProgest.concurrentnotetransactions.findMany({ 
  where: {
    vn: xVN,
    refid: xRefId,
    transactionno: xTransactionNo,
  },  
  select: {
    concurrentdatetime: true,
    concurrentdetail: true,
  },
});

if(concurrentnotetransactionsInfo){
  const concurNoteInfoInstance = new ConcurNoteDatabaseResultInfo();
  concurNoteInfoInstance.ConcurNoteList = concurrentnotetransactionsInfo.map(item => ({
    ConcurrentDatetime: item.concurrentdatetime,
    ConcurrentDetail: item.concurrentdetail,
  }));
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      
       newResultConcurNoteDto={
         HTTPStatus:newHttpMessageDto,
         Result:concurNoteInfoInstance
       }
       if (!concurrentnotetransactionsInfo || concurrentnotetransactionsInfo.length === 0) {
      
        this.addFormatHTTPStatus(newHttpMessageDto,404,'ConcurrentNote not found','')
      }else{
    
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }

}else{
  newResultConcurNoteDto =
  {
      HTTPStatus: {
        statusCode: 200, message: 'ConcurrentNote not found', error: '' 
      },
      Result:{
        ConcurNoteList:[   {
         
          ConcurrentDatetime: '',
          ConcurrentDetail:''
        }
            
        ]
        
      }
}
}

     return newResultConcurNoteDto  

}
async getPreAuthNoteformDatabase(queryPreAuthNoteDatabaseBodyDto: QueryPreAuthNoteDatabaseBodyDto) {
  
  const xRefId =queryPreAuthNoteDatabaseBodyDto.RefId;
  const xTransactionNo = queryPreAuthNoteDatabaseBodyDto.TransactionNo;
  const xVN =queryPreAuthNoteDatabaseBodyDto.VN;
  let  newResultPreAuthNoteDto= new ResultPreAuthNoteDto();
// ดึงข้อมูลจากฐานข้อมูล
const preauthnotetransactionsInfo = await prismaProgest.preauthnotetransactions.findMany({ 
  where: {
    vn: xVN,
    refid: xRefId,
    transactionno: xTransactionNo,
  },  
  select: {
    preauthdatetime: true,
    preauthdetail: true,
  },
});
 //    QueryPreAuthNoteDatabaseBodyDto ,ResultPreAuthNoteDto ,PreAuthNoteDatabaseResultInfo 
if(preauthnotetransactionsInfo){
  const preauthNoteInfoInstance = new PreAuthNoteDatabaseResultInfo();
  preauthNoteInfoInstance.PreAuthNote = preauthnotetransactionsInfo.map(item => ({
    PreAuthDateTime: item.preauthdatetime,
    PreAuthDetail: item.preauthdetail,
  }));
       this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      
       newResultPreAuthNoteDto={
         HTTPStatus:newHttpMessageDto,
         Result:preauthNoteInfoInstance
       }
       if (!preauthnotetransactionsInfo || preauthnotetransactionsInfo.length === 0) {
      
        this.addFormatHTTPStatus(newHttpMessageDto,404,'Pre-AuthNote not found','')
      }else{
    
        this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }

}else{
  newResultPreAuthNoteDto =
  {
      HTTPStatus: {
        statusCode: 200, message: 'Pre-AuthNote  not found', error: '' 
      },
      Result:{
        PreAuthNote:[   {
         
          PreAuthDateTime: '',
          PreAuthDetail:''
        }
            
        ]
        
      }
}
}

     return newResultPreAuthNoteDto  

}
async getDiagnosisTypeMapping(xInsurercode: string ,xDxtypecodeTrakcare: string) {
  let diagnosistypemapping:any ;
  
  try{
    diagnosistypemapping = await prismaProgest.diagnosistypemapping.findFirst({ 
     
    where:{
      dxtypecodetrakcare:xDxtypecodeTrakcare,
      insurers:{  insurercode : +xInsurercode }
      
     },  
    select:{
      dxtypecodetrakcare:true,
      dxtypenametrakcare:true,
      dxtypecodeinsurance:true,
      dxtypenameinsurance:true,
      insurerid:true,
      insurers:{
        select:{
            insurercode:true,
            insurername:true
        }
      }

    },
     })
     this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
     let  newDiagnosisTypeMappingDto= new DiagnosisTypeMappingDto();
     newDiagnosisTypeMappingDto={
       HTTPStatus:newHttpMessageDto,
      Result:diagnosistypemapping
     }
     if (!diagnosistypemapping || diagnosistypemapping.length === 0) {
      this.addFormatHTTPStatus(newHttpMessageDto,404,'diagnosistypemapping not found','')
    }else{
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
     return newDiagnosisTypeMappingDto  
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

async getFileAsBase64(id: number) {
      const fileRecord = await prismaProgest.claimdocuments.findFirst({
        where: { id },
      });
  
      if (!fileRecord) {
        throw new NotFoundException('File not found');
      }
  // console.log('kkkkk')
  console.log(fileRecord)
  const filePath = join(__dirname, '..', '..', fileRecord.filepath);
      const fileBuffer = readFileSync(filePath);
      const base64File = fileBuffer.toString('base64');
  
      return {
        filename: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
        base64: base64File, // ข้อมูลไฟล์เป็น Base64
      };
    
}
async saveFile(file: Express.Multer.File ,body: QueryCreateClaimDocumentDtoBodyDto) { 

  const mimeTypeParts = file.mimetype.split('/');
  const fileType = mimeTypeParts[mimeTypeParts.length - 1];
    const fileRecord = await prismaProgest.claimdocuments.create({
      data: {
        hn: body.HN, // ปรับข้อมูลตามที่ต้องการ
        vn: body.VN,
        refid: body.RefId,
        insurerid:13,
        transactionno: body.TransactionNo,
        documenttypecode: body.DocumenttypeCode,
        documenttypename:fileType,
        originalname: file.originalname,
        documentname: body.VN+'-'+body.DocumenttypeCode+'-'+Math.round(Math.random() * 186).toString(3)+'.'+file.mimetype.split('/')[1],
        filesize: file.size,
        filemimetype: file.mimetype,
        serverpath: 'path-to-server', 
        filepath: `./uploads/pdf/${file.filename}`, // เส้นทางที่เก็บไฟล์
        uploaddate: new Date(),
        uploadedby: body.UploadedBy,
       runningdocument:body.Runningdocument
      },
    });
    return fileRecord; // ส่งคืนข้อมูลที่บันทึกไว้
}
  async getFilesAsBase64findMany(ids: string) {
    const fileRecords = await prismaProgest.claimdocuments.findMany({
      where: {
       // id: { in: ids }, // ดึงไฟล์ตามอาเรย์ของ ID
        hn: ids
      },
    });
  
    if (fileRecords.length === 0) {
      throw new NotFoundException('Files not found');
    }
  
    const filesAsBase64 = await Promise.all(
      fileRecords.map(async (fileRecord) => {
        const filePath = join(__dirname, '..', '..', fileRecord.filepath);
        const fileBuffer = readFileSync(filePath);
        const base64File = fileBuffer.toString('base64');
        return {
          filename: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
          base64: base64File, // ข้อมูลไฟล์เป็น Base64
        };
      }),
    );
  
    return filesAsBase64;
}

 async getlistDocumentName(querylistDocumentNameDtoBodyDto: QuerylistDocumentNameDtoBodyDto) {
  
    const HN =querylistDocumentNameDtoBodyDto.PatientInfo.HN;
    const VN = querylistDocumentNameDtoBodyDto.PatientInfo.VN;
    const RefId = querylistDocumentNameDtoBodyDto.PatientInfo.RefId;
    const TransactionNo = querylistDocumentNameDtoBodyDto.PatientInfo.TransactionNo;
    const DocumenttypeCode =querylistDocumentNameDtoBodyDto.PatientInfo.DocumenttypeCode;
    const Runningdocument =querylistDocumentNameDtoBodyDto.PatientInfo.Runningdocument;
    const whereConditions = {
      ...(HN ? { hn: { equals: HN } } : {}),
      ...(VN ? { vn: { equals: VN } } : {}),
      ...(RefId ? { refid: { equals: RefId } } : {}),
      ...(TransactionNo ? { transactionno: { equals: TransactionNo } } : {}),
      ...(DocumenttypeCode ? { documenttypecode: { equals: DocumenttypeCode } } : {}),
      ...(Runningdocument ? { runningdocument: { equals: Runningdocument } } : {}),

    
    };
   //console.log("whereConditions:", whereConditions);


    const fileRecords = await prismaProgest.claimdocuments.findMany({
      where: whereConditions,
      //where: { vn: { equals: 'O504393-67' } },
      //select: {hn:true,documentname:true}
    });
   // console.log(fileRecords);

    const filesAsBase64 = await Promise.all(
      fileRecords.map(async (fileRecord) => {
        //const filePath = join(__dirname, '..', '..', fileRecord.filepath);
       // const fileBuffer = readFileSync(filePath);
        //const base64File = fileBuffer.toString('base64');
        return {
          filename: fileRecord.documentname ,
          originalname: fileRecord.originalname,
          documenttypecode : fileRecord.documenttypecode
           //fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
          //base64: base64File, // ข้อมูลไฟล์เป็น Base64
        };
      }),
    );
   // console.log(filename)
  return filesAsBase64
}
async getDocumentByDocname(queryCreateClaimDocumentDtoBodyDto: QueryCreateClaimDocumentDtoBodyDto) {
  
    //const HN =queryCreateClaimDocumentDtoBodyDto.HN;
    const VN = queryCreateClaimDocumentDtoBodyDto.VN;
    //const RefId = queryCreateClaimDocumentDtoBodyDto.RefId;
    //const TransactionNo = queryCreateClaimDocumentDtoBodyDto.TransactionNo;
    const DocumentName = queryCreateClaimDocumentDtoBodyDto.DocumentName;
    //const DocumenttypeCode = queryCreateClaimDocumentDtoBodyDto.DocumenttypeCode||'';
   
    //   filepath: './uploads/pdf/1727412324104-129258465.pdf',
   const fileRecord = await prismaProgest.claimdocuments.findFirst({
         where: {
       vn:VN,
       documentname: DocumentName //queryCreateClaimDocumentDtoBodyDto.DocumentName
      }
      });
  
      if (!fileRecord) {
        throw new NotFoundException('File not found');
      }
  //console.log(fileRecord)
      const filePath = join(__dirname, '..', '..', fileRecord.filepath);
      const fileBuffer = readFileSync(filePath);
      const base64File = fileBuffer.toString('base64');
      //console.log('-------')
  //console.log(filePath)
  //console.log('-------')
      return {
        filename: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
        base64: base64File, // ข้อมูลไฟล์เป็น Base64
      };
}
async getListDocumentByRefId(queryCreateClaimDocumentDtoBodyDto: QueryCreateClaimDocumentDtoBodyDto) {
  
      // const HN =queryCreateClaimDocumentDtoBodyDto.HN;
       const VN = queryCreateClaimDocumentDtoBodyDto.VN;
       const RefId = queryCreateClaimDocumentDtoBodyDto.RefId;
      // const insurerid = queryCreateClaimDocumentDtoBodyDto.insurerid;
       //const TransactionNo = queryCreateClaimDocumentDtoBodyDto.TransactionNo;
       //const DocumentName = queryCreateClaimDocumentDtoBodyDto.DocumentName;
       //const DocumenttypeCode = queryCreateClaimDocumentDtoBodyDto.DocumenttypeCode||'';
         const fileRecords = await prismaProgest.claimdocuments.findMany({
          where: {
             vn:VN,
             refid:RefId,
           //  insurerid:insurerid
         }
         });
         if (fileRecords.length === 0) {
          //console.log('000000')
           throw new NotFoundException('Files not found');
         }
         let newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];
        
         await Promise.all(
           fileRecords.map(async (fileRecord) => {
             const filePath = join(__dirname, '..', '..', fileRecord.filepath);
             const fileBuffer = readFileSync(filePath);
             const base64File = fileBuffer.toString('base64');
            
             newResultAttachDocListInfoDto = [
               {
                 DocName: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
                 Base64Data: base64File, // ข้อมูลไฟล์เป็น Base64
               
             }
             ];
           }),
         );
         
        
         return newResultAttachDocListInfoDto;
}


async UpdateDocumentTypeCode(querylistDocumentNameDtoBodyDto: QuerylistDocumentNameDtoBodyDto) {

  const RefId = querylistDocumentNameDtoBodyDto.PatientInfo.RefId;
  const TransactionNo = querylistDocumentNameDtoBodyDto.PatientInfo.TransactionNo;
  const DocumenttypeCode =querylistDocumentNameDtoBodyDto.PatientInfo.DocumenttypeCode;
  const DocumentName = querylistDocumentNameDtoBodyDto.PatientInfo.DocumentName;
  await prismaProgest.claimdocuments.updateMany({
    where: {
        refid:RefId,
        transactionno:TransactionNo,
        documentname:DocumentName
    },
    data: {
      documenttypecode: DocumenttypeCode,
    }
   
  });

  this.addFormatHTTPStatus(newHttpMessageDto,200,'File update documenttype successfully!','File update documenttype successfully!')
  

  let newResultUpdateDocumentByDocNameDto= new ResultUpdateDocumentByDocNameDto();
  newResultUpdateDocumentByDocNameDto={
        HTTPStatus:newHttpMessageDto,
        Result:{ UpdateDocumentInfo :'update documenttype  successfully' }
}

return newResultUpdateDocumentByDocNameDto
}



async DeleteDocumentByDocName(queryDeleteDocumentByDocNameDto: QueryDeleteDocumentByDocNameDto) {

   const xRefId = queryDeleteDocumentByDocNameDto.PatientInfo.RefId;
   const xTransactionNo = queryDeleteDocumentByDocNameDto.PatientInfo.TransactionNo;
   const xDocumentName = queryDeleteDocumentByDocNameDto.PatientInfo.DocumentName;

    //  const fileRecords = await prismaProgest.claimdocuments.deleteMany({
    //   where: {
    //     refid:xRefId,
    //      transactionno:xTransactionNo,
    //      documentname:xDocumentName
    //    //  insurerid:insurerid
    //  }
    //  });
    let  DeleteDocumentInfo;
    try{
    // 1. ดึงข้อมูลไฟล์จากฐานข้อมูลก่อน (เพื่อเอา path ของไฟล์ที่จะลบ)
    const fileRecord = await prismaProgest.claimdocuments.findFirst({
      where: {
        refid: xRefId,
        transactionno: xTransactionNo,
        documentname: xDocumentName,
      },
    });

    if (!fileRecord) {
      this.addFormatHTTPStatus(newHttpMessageDto,400,'File not found in database','File not found in database')
      DeleteDocumentInfo={
        status: "File not found in database",
        documentname:xDocumentName
        }  
      // throw new Error('File not found in database');
    }else{
      const filePath = fileRecord.filepath; 
      await unlinkAsync(filePath);
      await prismaProgest.claimdocuments.deleteMany({
        where: {
          refid: xRefId,
          transactionno: xTransactionNo,
          documentname: xDocumentName,
        },
      });
  
      // 3. ลบไฟล์จากระบบไฟล์
     
     this.addFormatHTTPStatus(newHttpMessageDto,200,'File and record deleted successfully!','File and record deleted successfully!')

     DeleteDocumentInfo={
     status: "File and record deleted successfully",
     documentname:xDocumentName
     }

      console.log('xxxx'+  fileRecord.filepath)
    }
    console.log('yyyy')


  }catch (error) {
    console.error('Error deleting file and record:', error);
    this.addFormatHTTPStatus(newHttpMessageDto,500,'Error deleting file and record','Error deleting file and record')
    DeleteDocumentInfo={
      status: "Error deleting file and record",
      documentname:xDocumentName
      }  
    //throw new Error('Failed to delete file or record');
  }
    
  let newResultDeleteDocumentByDocNameDto= new ResultDeleteDocumentByDocNameDto();
      newResultDeleteDocumentByDocNameDto={
            HTTPStatus:newHttpMessageDto,
            Result:DeleteDocumentInfo
    }

     return newResultDeleteDocumentByDocNameDto ;
}


async getListDocumentforAttachDocList(queryListDocumentforAttachDocListDto: QueryListDocumentforAttachDocListDto) {
  console.log('getListDocumentforAttachDocList')
   const xRefId = queryListDocumentforAttachDocListDto.PatientInfo.RefId;
   //const xDocumenttypeCode = queryListDocumentforAttachDocListDto.PatientInfo.DocumenttypeCode;
   const xTransactionNo = queryListDocumentforAttachDocListDto.PatientInfo.TransactionNo;
   const xRunningdocument =queryListDocumentforAttachDocListDto.PatientInfo.Runningdocument;
   const whereConditions = {

  ...(xRefId ? { refid: { equals: xRefId } } : {}),
  ...(xTransactionNo ? { transactionno: { equals: xTransactionNo } } : {}),
  ...(xRunningdocument ? { runningdocument: { equals: xRunningdocument } } : {}),
};

     const fileRecords = await prismaProgest.claimdocuments.findMany({
      where: whereConditions
     });
    
     //console.log(fileRecords)
     if (fileRecords.length === 0) {
       throw new NotFoundException('Files not found');
     }
     const newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];
    await Promise.all(
      fileRecords.map(async (fileRecord) => {
        const filePath = join(__dirname, '..', '..', fileRecord.filepath);
        
        try {
          // ใช้ readFile แบบ async
          const fileBuffer = await readFile(filePath);
          const base64File = fileBuffer.toString('base64');
          
          // สร้าง object ของ document และเพิ่มเข้าไปใน array
          newResultAttachDocListInfoDto.push({
            DocName: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
            Base64Data: base64File, // ข้อมูลไฟล์เป็น Base64
          });
        } catch (error) {
          console.error(`Error reading file ${fileRecord.filepath}:`, error);
        }
      }),
    );
 
    console.log('Result Attach Doc List:', newResultAttachDocListInfoDto);
 
    return newResultAttachDocListInfoDto;
 
}

async getListDocumentByTransactionNo(queryCreateClaimDocumentDtoBodyDto: QueryCreateClaimDocumentDtoBodyDto) {
  // const HN =queryCreateClaimDocumentDtoBodyDto.HN;
  const VN = queryCreateClaimDocumentDtoBodyDto.VN;
  const RefId = queryCreateClaimDocumentDtoBodyDto.RefId;
  const TransactionNo = queryCreateClaimDocumentDtoBodyDto.TransactionNo;
  const Runningdocument = queryCreateClaimDocumentDtoBodyDto.Runningdocument;
  //const InsurerCode = queryCreateClaimDocumentDtoBodyDto.InsurerCodes;
// console.log(VN)
// console.log(RefId)
// console.log(TransactionNo)
const whereConditions = {
  ...(VN ? { vn: { equals: VN } } : {}),
  ...(RefId ? { refid: { equals: RefId } } : {}),
  ...(TransactionNo ? { transactionno: { equals: TransactionNo } } : {}),
  ...(Runningdocument ? { runningdocument: { equals: Runningdocument } } : {}),
};
//console.log(InsurerCode)
  //const DocumentName = queryCreateClaimDocumentDtoBodyDto.DocumentName;
  //const DocumenttypeCode = queryCreateClaimDocumentDtoBodyDto.DocumenttypeCode||'';
    const fileRecords = await prismaProgest.claimdocuments.findMany({
    //  where: {
    //     vn:VN,
    //     refid:RefId,
    //     transactionno:TransactionNo,
    //     //insurerid:InsurerCode
    // }
    where :whereConditions
    });
    
     //console.log(fileRecords)
     if (fileRecords.length === 0) {
       throw new NotFoundException('Files not found');
     }
     const newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];

    //  await Promise.all(
    //    fileRecords.map(async (fileRecord) => {
    //      const filePath = join(__dirname, '..', '..', fileRecord.filepath);
    //      const fileBuffer = readFileSync(filePath);
    //      const base64File = fileBuffer.toString('base64');
        
    //      newResultAttachDocListInfoDto = [
    //        {
    //          DocName: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
    //          Base64Data: base64File, // ข้อมูลไฟล์เป็น Base64
           
    //      }
    //      ];
    //    }),
    //  );
    //  console.log('00000')
    //  console.log(newResultAttachDocListInfoDto)
    //  console.log('ddddd')
    //  return newResultAttachDocListInfoDto;
    await Promise.all(
      fileRecords.map(async (fileRecord) => {
        const filePath = join(__dirname, '..', '..', fileRecord.filepath);
        
        try {
          // ใช้ readFile แบบ async
          const fileBuffer = await readFile(filePath);
          const base64File = fileBuffer.toString('base64');
          
          // สร้าง object ของ document และเพิ่มเข้าไปใน array
          newResultAttachDocListInfoDto.push({
            DocName: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
            Base64Data: base64File, // ข้อมูลไฟล์เป็น Base64
          });
        } catch (error) {
          console.error(`Error reading file ${fileRecord.filepath}:`, error);
        }
      }),
    );
 
    //console.log('Result Attach Doc List:', newResultAttachDocListInfoDto);
 
    return newResultAttachDocListInfoDto;
 
}
async getListDocumentDummy(xDocumentName:string) {
 
const whereConditions = {
  ...(xDocumentName ? { vn: { equals: xDocumentName } } : {}),

};

    const fileRecords = await prismaProgest.claimdocuments.findMany({
   
    where :whereConditions
    });
    
     //console.log(fileRecords)
     if (fileRecords.length === 0) {
       throw new NotFoundException('Files not found');
     }
     const newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];

    //  await Promise.all(
    //    fileRecords.map(async (fileRecord) => {
    //      const filePath = join(__dirname, '..', '..', fileRecord.filepath);
    //      const fileBuffer = readFileSync(filePath);
    //      const base64File = fileBuffer.toString('base64');
        
    //      newResultAttachDocListInfoDto = [
    //        {
    //          DocName: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
    //          Base64Data: base64File, // ข้อมูลไฟล์เป็น Base64
           
    //      }
    //      ];
    //    }),
    //  );
    //  console.log('00000')
    //  console.log(newResultAttachDocListInfoDto)
    //  console.log('ddddd')
    //  return newResultAttachDocListInfoDto;
    await Promise.all(
      fileRecords.map(async (fileRecord) => {
        const filePath = join(__dirname, '..', '..', fileRecord.filepath);
        
        try {
          // ใช้ readFile แบบ async
          const fileBuffer = await readFile(filePath);
          const base64File = fileBuffer.toString('base64');
          
          // สร้าง object ของ document และเพิ่มเข้าไปใน array
          newResultAttachDocListInfoDto.push({
            DocName: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
            Base64Data: base64File, // ข้อมูลไฟล์เป็น Base64
          });
        } catch (error) {
          console.error(`Error reading file ${fileRecord.filepath}:`, error);
        }
      }),
    );
 
    //console.log('Result Attach Doc List:', newResultAttachDocListInfoDto);
 
    return newResultAttachDocListInfoDto;
 
}
async getListDocumentBillingByTransactionNo(queryCreateClaimDocumentDtoBodyDto: QueryCreateClaimDocumentDtoBodyDto) {
  // const HN =queryCreateClaimDocumentDtoBodyDto.HN;
  const VN = queryCreateClaimDocumentDtoBodyDto.VN;
  const RefId = queryCreateClaimDocumentDtoBodyDto.RefId;
  const TransactionNo = queryCreateClaimDocumentDtoBodyDto.TransactionNo;
  const Runningdocument = queryCreateClaimDocumentDtoBodyDto.Runningdocument;
  const DocumenttypeCode = '003';
//   console.log('getListDocumentBillingByTransactionNo')
// console.log(VN)
// console.log(RefId)
// console.log(TransactionNo)
const whereConditions = {
  ...(VN ? { vn: { equals: VN } } : {}),
  ...(RefId ? { refid: { equals: RefId } } : {}),
  ...(TransactionNo ? { transactionno: { equals: TransactionNo } } : {}),
  ...(Runningdocument ? { runningdocument: { equals: Runningdocument } } : {}),
  ...(DocumenttypeCode ? { documenttypecode: { equals: DocumenttypeCode } } : {}),
};
    const fileRecords = await prismaProgest.claimdocuments.findMany({
    where :whereConditions
    });
    const newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];

     //console.log(fileRecords)
     if (fileRecords.length === 0) {
      //newResultAttachDocListInfoDto:{}
     //throw new NotFoundException('Files,,, not found');
     }
    await Promise.all(
      fileRecords.map(async (fileRecord) => {
        const filePath = join(__dirname, '..', '..', fileRecord.filepath);
        
        try {
          // ใช้ readFile แบบ async
          const fileBuffer = await readFile(filePath);
          const base64File = fileBuffer.toString('base64');
          
          // สร้าง object ของ document และเพิ่มเข้าไปใน array
          newResultAttachDocListInfoDto.push({
            DocName: fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
            Base64Data: base64File, // ข้อมูลไฟล์เป็น Base64
          });
        } catch (error) {
          
          console.error(`Error reading file ${fileRecord.filepath}:`, error);
        }
      }),
    );
 
    //console.log('Result Attach Doc List:', newResultAttachDocListInfoDto);
 
    return newResultAttachDocListInfoDto;
 
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
