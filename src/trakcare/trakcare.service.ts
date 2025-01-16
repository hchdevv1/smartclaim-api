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

async getEpisodeInfoByVN( xVN: string ) {
  let response:any ;
  let EpisodeInfo ;
  try{

     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getEpisodeInfoByVN/${xVN}`)
    );
    EpisodeInfo = response.data
  } catch(error)
    {
        if (error instanceof HttpException) {
          throw error;
       }  throw new HttpException(
         {  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: httpStatusMessageService.getHttpStatusMessageTrakcare(HttpStatus.INTERNAL_SERVER_ERROR)
         },HttpStatus.INTERNAL_SERVER_ERROR );
        
    }
return EpisodeInfo
}
async getOPDDischargeVisit( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{

     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeVisit/${xVN}`)
    );
    // if (response.data && response.data.VisitInfo && response.data.VisitInfo.PresentIllness) {
    //   const presentIllness = response.data.VisitInfo.PresentIllness;
    //   // ตรวจสอบว่า PresentIllness มีค่าหรือไม่ก่อนแปลง
    //   if (presentIllness.trim() !== "") {
    //     response.data.VisitInfo.PresentIllness = this.cleanSpecialCharacters(presentIllness);
    //   }
    // }
    const presentIllness = response.data?.VisitInfo?.PresentIllness ?? "";
    response.data.VisitInfo.PresentIllness = presentIllness 
      ? this.cleanSpecialCharacters(presentIllness) 
      : presentIllness;

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
async getOPDCheckBalance( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getOPDCheckBalance/${xVN}`)
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

async checkVisitNumberAvailable( xHN: string ,xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/checkVisitNumberAvailable/${xHN}/${xVN}`)
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
 //// * IPD * ////
 async getIPDVisit( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{

     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getIPDVisit/${xVN}`)
    );
    const presentIllness = response.data?.VisitInfo?.PresentIllness ?? "";
    response.data.VisitInfo.PresentIllness = presentIllness 
      ? this.cleanSpecialCharacters(presentIllness) 
      : presentIllness;

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
async getIPDVitalSign( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getIPDVitalSign/${xVN}`)
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
async getIPDDoctor( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getIPDDoctor/${xVN}`)

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
async getIPDDiagnosis( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getIPDDiagnosis/${xVN}`)
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
async getIPDInvestigation( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getIPDInvestigation/${xVN}`)
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
async getIPDOrderItem( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getIPDOrderItem/${xVN}`)
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
async getIPDBilling( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getIPDBilling/${xVN}`)
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
async getIPDProcedure( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getIPDProcedure/${xVN}`)
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
async getIPDAccident( xVN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getIPDAccident/${xVN}`)
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
async getListBilling( xHN: string ) {
  let response:any ;
  let PatientInfo ;
  try{
     response = await firstValueFrom(
      this.httpService.get(`${TRAKCARE_APIURL}/getListBilling/${xHN}`)
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
cleanSpecialCharacters(text: string): string {
  return text
    .replace(/\r\n/g, ' ')        // ลบ \r\n แทนที่ด้วยช่องว่าง
    .replace(/&quot;/g, '"')      // แทนที่ &quot; ด้วยเครื่องหมายคำพูดคู่
    .replace(/&lt;/g, '<')        // แทนที่ &lt; ด้วยเครื่องหมาย <
    .replace(/&gt;/g, '>')        // แทนที่ &gt; ด้วยเครื่องหมาย >
    .replace(/&amp;/g, '&');      // แทนที่ &amp; ด้วยเครื่องหมาย &
}
}
