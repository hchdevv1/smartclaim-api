/* eslint-disable @typescript-eslint/no-require-imports */
import { Injectable ,NotFoundException, HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { readFileSync } from 'fs';
import { join } from 'path';

import { prismaProgest } from '../database/database';
import { Prisma } from '../../prisma/generate-client-db';
import { HttpStatusMessageService } from './http-status-message/http-status-message.service';
import { HttpMessageDto } from '../utils/dto/http-status-message.dto'

import { aia_accessTokenDTO, IllnessTypeDto ,IllnessSurgeryDto,PolicyTypeDto ,ServiceSettingDto ,ClaimStatusDto ,DocumentTypeDto
  ,CauseofInjurywoundtypeDto ,CauseofinjurysideDto ,AccidentplaceDto ,Accidentcauseover45daysDto ,DiagnosisTypeMappingDto
} from './dto/utils.dto';
import { QueryCreateClaimDocumentDtoBodyDto ,ResultAttachDocListInfoDto }from './dto/claim-documents.dto';


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
async getDiagnosisTypeMapping(xInsurercode: string ,xDxtypecodeTrakcare: string) {
  let diagnosistypemapping:any ;
  try{
    diagnosistypemapping = await prismaProgest.diagnosistypemapping.findMany({ 
     
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
  console.log('kkkkk')
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
    console.log('22222')
    console.log(file)
    console.log('3333333')
    const fileRecord = await prismaProgest.claimdocuments.create({
      data: {
        hn: body.HN, // ปรับข้อมูลตามที่ต้องการ
        vn: body.VN,
        refid: body.RefId,
        transactionno: body.TransactionNo,
        documenttypecode: body.DocumenttypeCode,
        documenttypename: 'example-doc-type-name',
        documentname: body.VN+'-'+body.DocumenttypeCode+'-'+Math.round(Math.random() * 186).toString(3)+'.'+file.mimetype.split('/')[1],
        filesize: file.size,
        filemimetype: file.mimetype,
        serverpath: 'path-to-server', 
        filepath: `./uploads/pdf/${file.filename}`, // เส้นทางที่เก็บไฟล์
        uploaddate: new Date(),
        uploadedby: body.UploadedBy
      },
    });
    console.log('XXXXXX')
  console.log(fileRecord)
    return fileRecord; // ส่งคืนข้อมูลที่บันทึกไว้
}
  async getFilesAsBase64findMany(ids: string) {
    console.log(ids)
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

 async getlistDocumentName(queryCreateClaimDocumentDtoBodyDto: QueryCreateClaimDocumentDtoBodyDto) {
  
    const HN =queryCreateClaimDocumentDtoBodyDto.HN;
    const VN = queryCreateClaimDocumentDtoBodyDto.VN;
    const RefId = queryCreateClaimDocumentDtoBodyDto.RefId;
    const TransactionNo = queryCreateClaimDocumentDtoBodyDto.TransactionNo;
    const fileRecords = await prismaProgest.claimdocuments.findMany({
      where: {
        hn: HN,
        refid:RefId,
        transactionno:TransactionNo,
        vn:VN
      },
    });
    const filesAsBase64 = await Promise.all(
      fileRecords.map(async (fileRecord) => {
        //const filePath = join(__dirname, '..', '..', fileRecord.filepath);
       // const fileBuffer = readFileSync(filePath);
        //const base64File = fileBuffer.toString('base64');
        return {
          
          filename: fileRecord.documentname //fileRecord.filepath.split('/').pop(), // ชื่อไฟล์
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
       const TransactionNo = queryCreateClaimDocumentDtoBodyDto.TransactionNo;
       //const DocumentName = queryCreateClaimDocumentDtoBodyDto.DocumentName;
       //const DocumenttypeCode = queryCreateClaimDocumentDtoBodyDto.DocumenttypeCode||'';
         const fileRecords = await prismaProgest.claimdocuments.findMany({
          where: {
             vn:VN,
             refid:RefId,
             transactionno:TransactionNo
         }
         });
         if (fileRecords.length === 0) {
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
