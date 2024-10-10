import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';
import { prismaProgest } from '../../database/database';

import { QueryAttachBodyDto } from './dto/query-attach-doc-list.dto';
import { ResultAttachDocListDto  ,ResultAttachDocListInfoDto} from './dto/result-attach-doc-list.dto';
//import { DummyDataRespone1 } from './dummyRespone2';
const newHttpMessageDto =new HttpMessageDto();
const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE

@Injectable()
export class AttachDocListService {
  constructor(
    private readonly httpService: HttpService,
    private readonly utilsService:UtilsService
  ) {}

  async AttachDocList(queryBillingSubmissionBodyDto:QueryAttachBodyDto){
    let xResultInfo;
    try{
      console.log('666666')
      //queryBillingSubmissionBodyDto.PatientInfo.RefId ='AAA-12345'
      //queryBillingSubmissionBodyDto.PatientInfo.TransactionNo ='95ffe060-236c-4f35-b00c-a2ef9aa9e714'
    const  RequesetBody ={
      
         xRefId: queryBillingSubmissionBodyDto.PatientInfo.RefId, 
         xTransactionNo: queryBillingSubmissionBodyDto.PatientInfo.TransactionNo ,
         xPID : queryBillingSubmissionBodyDto.PatientInfo.PID||'',
         xPassportnumber : queryBillingSubmissionBodyDto.PatientInfo.PassportNumber||'',
         xIdType:queryBillingSubmissionBodyDto.PatientInfo.IdType||'',
         xInsurerCode:queryBillingSubmissionBodyDto.PatientInfo.InsurerCode||null,
         xHN :queryBillingSubmissionBodyDto.PatientInfo.HN||'',
         xVN: queryBillingSubmissionBodyDto.PatientInfo.VN||'',
         xInvoiceNumber :queryBillingSubmissionBodyDto.PatientInfo.InvoiceNumber,
    
       }


const QueryCreateClaimDocumentDtoBody={
  RefId:'ccXwZWYmukJdvzFrWaccN8bNr83caECQjC+vvuEaIKY=', //RequesetBody.xRefId,
  TransactionNo: 'f30c3f08-00db-4da2-ba33-3afbcf4a1546',//RequesetBody.xTransactionNo,
  InsurerCode:13, //RequesetBody.xInsurerCode,
  HN:RequesetBody.xHN,
  VN:'O415202-67',//RequesetBody.xVN,
  DocumentName:'',
  DocumenttypeCode:'',
  UploadedBy:''
}
       const getListDocumentByTransection = await this.utilsService.getListDocumentByTransactionNo(QueryCreateClaimDocumentDtoBody); 
       let newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];
       newResultAttachDocListInfoDto = await Promise.all(
         getListDocumentByTransection.map(async (doc) => {
           const EncryptDocument = await this.utilsService.EncryptAESECB(doc.Base64Data, AIA_APISecretkey);
           console.log(doc.DocName);
           return {
             Base64Data: EncryptDocument,
             DocName: doc.DocName,
           };
         })
         
       );
   
       const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       const apiURL= `${AIA_APIURL}/SmartClaim/attachDocList`;
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
         DataJson: body_DataJson,
         InvoiceNumber:RequesetBody.xInvoiceNumber,
         AttachDocList:newResultAttachDocListInfoDto
       };
       console.log('-----')
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
//     const xDummyDataRespone1 =new DummyDataRespone1();
// const responsefromAIA  =xDummyDataRespone1.res
       const responeInputcode =responsefromAIA.Result.Code
       console.log(responsefromAIA)
      //const responeInputcode ='S'
      if (responeInputcode !=='S'){
       this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA.Result.MessageTh,responsefromAIA.Result.MessageTh)
      }else{
        // let xInsuranceResult= new InsuranceResult();
        // xInsuranceResult ={
        //  Code:responsefromAIA.Result.Code ||'',
        //  Message:responsefromAIA.Result.Message ||'',
        //  MessageTh:responsefromAIA.Result.MessageTh ||'',
        // }

        // let xInsuranceData = new InsuranceData();
        // xInsuranceData={
        //   RefId:responsefromAIA.Data.RefId,
        //   TransactionNo:responsefromAIA.Data.TransactionNo,
        //   InsurerCode:responsefromAIA.Data.InsurerCode,
        //   BatchNumber:responsefromAIA.Data.BatchNumber||'',
        //   InvoiceNumber:responsefromAIA.Data.InvoiceNumber||'',
         
        // }
/// save to database

const existingRecord = await prismaProgest.transactionclaim.findFirst({
  where: {
    refid: RequesetBody.xRefId,
    transactionno: RequesetBody.xTransactionNo,
   
  },
});
if (existingRecord) {

  await prismaProgest.transactionclaim.update({
    where: {
      id: existingRecord.id, // Use the ID of the existing record
    },
    data: {
      batchnumber: responsefromAIA.Data.BatchNumber,
      invoicenumber:responsefromAIA.Data.InvoiceNumber
    },
  });
}


    xResultInfo ={
        InsuranceResult: '', //xInsuranceResult,
        InsuranceData:'', //xInsuranceData,
      } 
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }

   let newResultAttachDocListDto= new ResultAttachDocListDto();
   newResultAttachDocListDto={
         HTTPStatus:newHttpMessageDto,
         Result:xResultInfo
 }
     
       return newResultAttachDocListDto
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
