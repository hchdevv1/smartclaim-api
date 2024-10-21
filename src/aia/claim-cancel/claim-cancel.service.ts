import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';

import {QueryClaimCancelBodyDto} from './dto/query-claim-cancel.dto';
import { ResultClaimCancelDto , InsuranceResult ,InsuranceData} from './dto/result-claim-cancel.dto';

 //import { DummyDataRespone1 } from './dummyRespone2';
const newHttpMessageDto =new HttpMessageDto();
const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE
@Injectable()
export class ClaimCancelService {
  constructor(
    private readonly httpService: HttpService,
    private readonly utilsService:UtilsService
  ) {}
  async ClaimCancel(queryClaimCancelBodyDto:QueryClaimCancelBodyDto){
    let xResultInfo;
    try{
     // queryClaimCancelBodyDto.PatientInfo.RefId ='AAA-12345'
      //queryClaimCancelBodyDto.PatientInfo.TransactionNo ='95ffe060-236c-4f35-b00c-a2ef9aa9e714'
    const  RequesetBody ={
      
         xRefId: queryClaimCancelBodyDto.PatientInfo.RefId, 
         xTransactionNo: queryClaimCancelBodyDto.PatientInfo.TransactionNo ,
         xPID : queryClaimCancelBodyDto.PatientInfo.PID||'',
         xPassportnumber : queryClaimCancelBodyDto.PatientInfo.PassportNumber||'',
         xIdType:queryClaimCancelBodyDto.PatientInfo.IdType||'',
         xInsurerCode:queryClaimCancelBodyDto.PatientInfo.InsurerCode||null,
         xHN :queryClaimCancelBodyDto.PatientInfo.HN||'',
         xVN: queryClaimCancelBodyDto.PatientInfo.VN||'',
    
       }



       const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       const apiURL= `${AIA_APIURL}/SmartClaim/claimCancel`;
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
    //const xDummyDataRespone1 =new DummyDataRespone1();
    //const responsefromAIA  =xDummyDataRespone1.res
      const responeInputcode =responsefromAIA.Result.Code
      console.log(responsefromAIA)
      if (responeInputcode !=='S'){
        this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA.Result.MessageTh,responsefromAIA.Result.MessageTh)
      }else{
        
        let xInsuranceResult= new InsuranceResult();
        xInsuranceResult ={
         Code:responsefromAIA.Result.Code ||'',
         Message:responsefromAIA.Result.Message ||'',
         MessageTh:responsefromAIA.Result.MessageTh ||'',
        }


        let xInsuranceData = new InsuranceData();
        xInsuranceData={
          RefId:responsefromAIA.Data.RefId,
          TransactionNo:responsefromAIA.Data.TransactionNo,
          InsurerCode:responsefromAIA.Data.InsurerCode,
          Status:responsefromAIA.Data.Status||'',
          
        }
    xResultInfo ={
        InsuranceResult: xInsuranceResult,
        InsuranceData: xInsuranceData,
      } 
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }

   let newResultClaimCancelDto= new ResultClaimCancelDto();
   newResultClaimCancelDto={
         HTTPStatus:newHttpMessageDto,
         Result:xResultInfo
 }
     
       return newResultClaimCancelDto
      }catch(error)
      {
        console.log(error)
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
