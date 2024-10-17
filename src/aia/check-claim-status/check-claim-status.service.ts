import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';
import { prismaProgest } from '../../database/database';

import { QueryCheckClaimStatusBodyDto } from './dto/query-check-claim-status.dto';
import { ResultCheckClaimStatusDto ,InsuranceResult ,InsuranceData ,ResultAttachDocListInfoDto} from './dto/result-check-claim-status.dto';

 //import { DummyDataRespone1 } from './dummyRespone2';
const newHttpMessageDto =new HttpMessageDto();
const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE

@Injectable()
export class CheckClaimStatusService {
  constructor(
    private readonly httpService: HttpService,
    private readonly utilsService:UtilsService
  ) {}

  async Checkclaimstatus(queryCheckClaimStatusBodyDto:QueryCheckClaimStatusBodyDto){
    console.log('check st')
    let xResultInfo;
    try{
     // queryCheckClaimStatusBodyDto.PatientInfo.RefId ='AAA-12345'
     // queryCheckClaimStatusBodyDto.PatientInfo.TransactionNo ='95ffe060-236c-4f35-b00c-a2ef9aa9e714'
    const  RequesetBody ={
      
         xRefId: queryCheckClaimStatusBodyDto.PatientInfo.RefId, 
         xTransactionNo: queryCheckClaimStatusBodyDto.PatientInfo.TransactionNo ,
         xPID : queryCheckClaimStatusBodyDto.PatientInfo.PID||'',
         xPassportnumber : queryCheckClaimStatusBodyDto.PatientInfo.PassportNumber||'',
         xIdType:queryCheckClaimStatusBodyDto.PatientInfo.IdType||'',
         xInsurerCode:queryCheckClaimStatusBodyDto.PatientInfo.InsurerCode||null,
         xHN :queryCheckClaimStatusBodyDto.PatientInfo.HN||'',
         xVN: queryCheckClaimStatusBodyDto.PatientInfo.VN||'',
    
       }



       const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       const apiURL= `${AIA_APIURL}/SmartClaim/checkClaimStatus`;
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
    // const xDummyDataRespone1 =new DummyDataRespone1();
    // const responsefromAIA  =xDummyDataRespone1.res
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



let xResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];
xResultAttachDocListInfoDto = await Promise.all(
  responsefromAIA.Data.AttachDocList.map(async (doc) => {
    const EncryptDocument = await this.utilsService.DecryptAESECB(doc.Base64Data, AIA_APISecretkey);
    return {
      Base64Data: EncryptDocument,
      DocName: doc.DocName,
    };
  })
);

const xClaimStatusCode = await this.utilsService.getClaimStatusCodeByDescription('13', responsefromAIA.Data.ClaimStatus);
const claimcode = xClaimStatusCode.Result[0].claimstatuscode;

        let xInsuranceData = new InsuranceData();
        xInsuranceData={
          RefId:responsefromAIA.Data.RefId,
          TransactionNo:responsefromAIA.Data.TransactionNo,
          InsurerCode:responsefromAIA.Data.InsurerCode,
          BatchNumber:responsefromAIA.Data.BatchNumber||'',
          ClaimStatus:responsefromAIA.Data.ClaimStatus||'',
          ClaimStatusCode:claimcode,
          ClaimStatusDesc:responsefromAIA.Data.ClaimStatusDesc||'',
          ClaimStatusDesc_EN:responsefromAIA.Data.ClaimStatus||'',
          ClaimStatusDesc_TH:responsefromAIA.Data.ClaimStatusDesc||'',
          TotalApproveAmount:responsefromAIA.Data.TotalApproveAmount||'',
          PaymentDate:responsefromAIA.Data.PaymentDate||'',
          InvoiceNumber:responsefromAIA.Data.InvoiceNumber||'',
          AttachDocList:xResultAttachDocListInfoDto
        }
// save to database
const existingRecord = await prismaProgest.transactionclaimstatus.findFirst({
  where: {
    refid: RequesetBody.xRefId,
    transactionno: RequesetBody.xTransactionNo,
    claimstatuscode:claimcode
  },
});
console.log('---')
console.log(existingRecord)
if (existingRecord) {

  await prismaProgest.transactionclaimstatus.update({
    where: {
      id: existingRecord.id, // Use the ID of the existing record
    },
    data: {
      insurerid: RequesetBody.xInsurerCode ,
      hn: RequesetBody.xHN,
      vn: RequesetBody.xVN,
      totalapproveamount: responsefromAIA.Data.TotalApproveAmount,
      paymentdate: responsefromAIA.Data.PaymentDate,
      invoicenumber: responsefromAIA.Data.InvoiceNumber,
      claimstatusdesc:responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_en:responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_th:responsefromAIA.Data.ClaimStatusDesc,
    },
  });
}else{

    await prismaProgest.transactionclaimstatus.create({
    data: {
      insurerid: RequesetBody.xInsurerCode ,
      refid: RequesetBody.xRefId,
      transactionno: RequesetBody.xTransactionNo,
      hn:RequesetBody.xHN,
      vn:RequesetBody.xVN,
     claimstatuscode: claimcode,
     totalapproveamount: responsefromAIA.Data.TotalApproveAmount,
      paymentdate:responsefromAIA.Data.PaymentDate,
      invoicenumber: responsefromAIA.Data.InvoiceNumber,
      claimstatusdesc:responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_en:responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_th:responsefromAIA.Data.ClaimStatusDesc,
    },
  });
}

const transactionclaimexistingRecord = await prismaProgest.transactionclaim.findFirst({
  where: {
    refid: RequesetBody.xRefId,
    transactionno: RequesetBody.xTransactionNo,
   
  },
});

//console.log(transactionclaimexistingRecord.status_changed_at)
if (transactionclaimexistingRecord) {

  await prismaProgest.transactionclaim.update({
    where: {
      id: transactionclaimexistingRecord.id, // Use the ID of the existing record
    },
    data: {
      claimstatuscode: claimcode ,
      totalapprovedamount:responsefromAIA.Data.TotalApproveAmount,
      claimstatusdesc: responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_en: responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_th: responsefromAIA.Data.ClaimStatusDesc
      
    },
  });
}

        /////////////////
    xResultInfo ={
        InsuranceResult: xInsuranceResult,
        InsuranceData: xInsuranceData,
      } 
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }

   let newResultCheckClaimStatusDto= new ResultCheckClaimStatusDto();
   newResultCheckClaimStatusDto={
         HTTPStatus:newHttpMessageDto,
         Result:xResultInfo
 }
     
       return newResultCheckClaimStatusDto
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
