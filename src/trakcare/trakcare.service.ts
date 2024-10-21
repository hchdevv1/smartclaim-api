import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { HttpStatusMessageService } from '../utils/http-status-message/http-status-message.service';

const httpStatusMessageService = new HttpStatusMessageService();

const TRAKCARE_APIURL= process.env.TRAKCARE_APIURL;
@Injectable()
export class TrakcareService {
  constructor(private readonly  httpService: HttpService) {}


  async getPatientInfoByPID( xPID: string ) {
    let response:any ;
    let PatientInfo ;
    try{
       response = await firstValueFrom(
        this.httpService.get(`${TRAKCARE_APIURL}/getPatientInfoByPID/${xPID}`)
      );
      PatientInfo = response.data
    } catch(error)
      {
          if (error instanceof HttpException) {
            throw error;
         }  throw new HttpException(
           {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
           },HttpStatus.INTERNAL_SERVER_ERROR );
          
      }
   return PatientInfo
  }
  async getPatientInfoByHN( xHN: string ) {
    let response:any ;
    let PatientInfo ;
    try{
       response = await firstValueFrom(
        this.httpService.get(`${TRAKCARE_APIURL}/getPatientInfoByHN/${xHN}`)
      );
      PatientInfo = response.data
    } catch(error)
      {
          if (error instanceof HttpException) {
            throw error;
         }  throw new HttpException(
           {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
           },HttpStatus.INTERNAL_SERVER_ERROR );
          
      }
   return PatientInfo
  }
  async getPatientInfoByPassportNumber( xPassportnumber: string ) {
    let response:any ;
    let PatientInfo ;
    try{
       response = await firstValueFrom(
        this.httpService.get(`${TRAKCARE_APIURL}/getPatientInfoByPassportNumber/${xPassportnumber}`)
      );
      PatientInfo = response.data
    } catch(error)
      {
          if (error instanceof HttpException) {
            throw error;
         }  throw new HttpException(
           {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
           },HttpStatus.INTERNAL_SERVER_ERROR );
          
      }
   return PatientInfo
  }

async getEpisodeByHN( xHN: string , xEpiDate: string , xEpiType: string) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getEpisodeByHN/${xHN}/${xEpiDate}/${xEpiType}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}
async getOPDDischargeVisit( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{

     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeVisit/${xVN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
return PatientInfo
}

async getOPDDischargeDiagnosis( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeDiagnosis/${xVN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}

async getOPDDischargeDoctor( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeDoctor/${xVN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}

async getOPDDischargeProcedure( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeProcedure/${xVN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}

async getOPDDischargeInvestigation( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeInvestigation/${xVN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}

async getOPDDischargeVitalSign( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeVitalSign/${xVN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}

async getOPDDischargeAccident( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeAccident/${xVN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}

async getOPDDischargeOrderItem( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeOrderItem/${xVN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}
async getOPDDischargeBilling( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeBilling/${xVN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}

async getOPDDischargePatient( xHN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargePatient/${xHN}`)
    );
    PatientInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
 return PatientInfo
}
}
