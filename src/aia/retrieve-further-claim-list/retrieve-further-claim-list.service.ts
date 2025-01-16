import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';
import { TrakcareService} from '../../trakcare/trakcare.service';

import { QueryRetrieveFurtherClaimBodyDto } from './dto/query-retrieve-further-claim-list.dto';
import { ResultRetrieveFurtherClaimDto ,InsuranceResult ,InsuranceData ,FurtherClaimList} from './dto/result-retrieve-further-claim-list.dto';

const newHttpMessageDto =new HttpMessageDto();
const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE

@Injectable()
export class RetrieveFurtherClaimListService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService
  ) {}
  
  async RetrieveFurtherClaim(queryRetrieveFurtherClaimBodyDto:QueryRetrieveFurtherClaimBodyDto){
    let xResultInfo;
    try{
    const  RequesetBody ={
      
         xRefId: queryRetrieveFurtherClaimBodyDto.PatientInfo.RefId, 
         xTransactionNo: queryRetrieveFurtherClaimBodyDto.PatientInfo.TransactionNo ,
         xPID : queryRetrieveFurtherClaimBodyDto.PatientInfo.PID||'',
         xPassportnumber : queryRetrieveFurtherClaimBodyDto.PatientInfo.PassportNumber||'',
         xIdType:queryRetrieveFurtherClaimBodyDto.PatientInfo.IdType||'',
         xInsurerCode:queryRetrieveFurtherClaimBodyDto.PatientInfo.InsurerCode||null,
         xHN :queryRetrieveFurtherClaimBodyDto.PatientInfo.HN||'',
         xFirstName :queryRetrieveFurtherClaimBodyDto.PatientInfo.GivenNameTH||'',
         xLastName :queryRetrieveFurtherClaimBodyDto.PatientInfo.SurnameTH||'',
         xDob :queryRetrieveFurtherClaimBodyDto.PatientInfo.DateOfBirth||'',
         xVN: queryRetrieveFurtherClaimBodyDto.PatientInfo.VN||'',
         xVisitDateTime: queryRetrieveFurtherClaimBodyDto.PatientInfo.VisitDateTime||'',
         xAccidentDate:queryRetrieveFurtherClaimBodyDto.PatientInfo.AccidentDate||'', 
       }


       const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       const apiURL= `${AIA_APIURL}/SmartClaim/retrieveFurtherClaimList`;
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
      console.log(responsefromAIA)

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

        const xFurtherClaimList: FurtherClaimList[] = responsefromAIA.Data.FurtherClaimList 
        ? await Promise.all(
        responsefromAIA.Data.FurtherClaimList.map(async(item) => {
          let furtherclaimvn;
          //const effectiveDate = new Date(item.EffectiveDate);
          const formattedDscDateTime = new Date(item.DscDateTime).toISOString().split('T')[0];
          const formattedVisitDateTime = new Date(item.DscDateTime).toISOString().split('T')[0];
          const formattedAccidentDate = new Date(item.DscDateTime).toISOString().split('T')[0];
          const TrakcarepatientInfo = await this.trakcareService.getEpisodeByHN(RequesetBody.xHN, formattedVisitDateTime, 'O');
          if (TrakcarepatientInfo && TrakcarepatientInfo.EpisodeInfo && TrakcarepatientInfo.EpisodeInfo.length > 0) {
            // ดึง VN จากทุกตัวใน EpisodeInfo
            // vns = TrakcarepatientInfo.EpisodeInfo.map(episode => episode.VN);
            furtherclaimvn = TrakcarepatientInfo.EpisodeInfo[0].VN;
          }
          return {
            FurtherClaimId: item.FurtherClaimId,  
            ClaimNo:item.ClaimNo,
            OccurrenceNo: item.OccurrenceNo,  
            Icd10:item.Icd10,
            DxName: item.DxName,  
            DscDateTime:formattedDscDateTime,
            VisitDateTime: formattedVisitDateTime,  
            AccidentDate: formattedAccidentDate,
            FurtherClaimVN:furtherclaimvn||''
           };
         })
        )
         :[];

        let xInsuranceData = new InsuranceData();
        xInsuranceData={
          RefId:responsefromAIA.Data.RefId,
          TransactionNo:responsefromAIA.Data.TransactionNo,
          InsurerCode:responsefromAIA.Data.InsurerCode,
          FurtherClaimList:xFurtherClaimList
        }
    xResultInfo ={
        InsuranceResult: xInsuranceResult,
        InsuranceData: xInsuranceData,
      } 
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
      }

   let newResultRetrieveFurtherClaimDto= new ResultRetrieveFurtherClaimDto();
   newResultRetrieveFurtherClaimDto={
         HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
 }
     
       return newResultRetrieveFurtherClaimDto
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
