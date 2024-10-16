import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'

import { prismaProgest } from '../../database/database';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { TrakcareService} from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';

import { QueryEligibleBodyDto } from './dto/query-check-eligible.dto';
import { ResultCheckEligibleDto ,EligibleEpisodeListDto ,FindPatientInfoResultInfo ,FindEpisodeInfoResultInfo
  ,InsuranceResult ,CoverageList ,MessageList ,InsuranceData ,InsuranceCustomerDetail ,PolicyInfoList
} from './dto/result-check-eligible.dto';

//import { DummyDataRequest1 }  from './dummy1-req-check-eligible';
//import { DummyDataRequest2 }  from './dummy2-req-check-eligible';
const httpStatusMessageService = new HttpStatusMessageService();
const newHttpMessageDto =new HttpMessageDto();
const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE
//const DUMMY_National_ID = process.env.DUMMY_National_ID
@Injectable()
export class CheckEligibleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService
  ) {}
 
  async getEpisodeByHN(queryEligibleBodyDto : QueryEligibleBodyDto){
    let RequesetBody;
    try{
   RequesetBody ={
    xRefID:queryEligibleBodyDto.PatientInfo.RefId||'',
    xTransactionNo:queryEligibleBodyDto.PatientInfo.TransactionNo||'',
    xPID : queryEligibleBodyDto.PatientInfo.PID||'',
    xPassportnumber : queryEligibleBodyDto.PatientInfo.PassportNumber||'',
    xIdType:queryEligibleBodyDto.PatientInfo.IdType||'',
    xServiceSettingCode:queryEligibleBodyDto.PatientInfo.ServiceSettingCode||'',
    xInsurerCode:queryEligibleBodyDto.PatientInfo.InsurerCode||null,
    xHN :queryEligibleBodyDto.PatientInfo.HN||'',
    xVN: queryEligibleBodyDto.PatientInfo.VN||'',
    xVisitDatefrom:queryEligibleBodyDto.PatientInfo.VisitDatefrom||'',
    xVisitDateto:queryEligibleBodyDto.PatientInfo.VisitDateto||'',
  }
 
 if (RequesetBody.xServiceSettingCode==="IPD"){RequesetBody.xServiceSettingCode ="I"}
 else{RequesetBody.xServiceSettingCode ="O"}

  const TrakcarepatientInfo = await this.trakcareService.getEpisodeByHN(RequesetBody.xHN,RequesetBody.xVisitDatefrom,RequesetBody.xServiceSettingCode);
  const newHttpMessageDto =new HttpMessageDto();
  const TrakcarepatientInfoStatusCode =TrakcarepatientInfo.statusCode
  let newFindPatientInfoResultInfo =new FindPatientInfoResultInfo ();
  let newFindEpisodeInfoResultInfo =new FindEpisodeInfoResultInfo ();
  if (TrakcarepatientInfoStatusCode !==200){
    this.addFormatHTTPStatus(newHttpMessageDto,400,TrakcarepatientInfo.message,TrakcarepatientInfo.message)

  }else{
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    newFindPatientInfoResultInfo = {
      PatientID: TrakcarepatientInfo.PatientInfo.PatientID,
      PID: TrakcarepatientInfo.PatientInfo.PID,
      PassportNumber: TrakcarepatientInfo.PatientInfo.PassportNumber,
      HN:TrakcarepatientInfo.PatientInfo.HN,
      TitleTH:TrakcarepatientInfo.PatientInfo.TitleTH,
      GivenNameTH: TrakcarepatientInfo.PatientInfo.GivenNameTH,
      SurnameTH: TrakcarepatientInfo.PatientInfo.SurnameTH,
      TitleEN:TrakcarepatientInfo.PatientInfo.TitleEN,
      GivenNameEN:TrakcarepatientInfo.PatientInfo.GivenNameEN,
      SurnameEN:TrakcarepatientInfo.PatientInfo.SurnameEN,
      DateOfBirth: TrakcarepatientInfo.PatientInfo.DateOfBirth,
      Gender:  TrakcarepatientInfo.PatientInfo.Gender,
      MobilePhone: TrakcarepatientInfo.PatientInfo.MobilePhone
    }
    newFindEpisodeInfoResultInfo = TrakcarepatientInfo.EpisodeInfo.map(episode => ({
      VN: episode.VN,
      EpisodeType: episode.EpisodeType,
      VisitDate: episode.VisitDate,
      VisitTime: episode.VisitTime,
      VisitDateTime: episode.VisitDateTime,
      AccidentDate: episode.AccidentDate,
      LocationCode: episode.LocationCode,
      LocationDesc: episode.LocationDesc,
      WardCode: episode.WardCode,
      WardDesc: episode.WardDesc,
      BedCode: episode.BedCode,
      MainCareproviderCode: episode.MainCareproviderCode,
      MainCareproviderDesc: episode.MainCareproviderDesc,
      DoctorLicense: episode.DoctorLicense,
      DoctorFirstName: episode.DoctorFirstName,
      DoctorLastName: episode.DoctorLastName,
      SurgeryType: episode.SurgeryType,
    }))
  }

  let newEligibleEpisodeListDto= new EligibleEpisodeListDto();
  newEligibleEpisodeListDto={
    HTTPStatus:newHttpMessageDto,
    Result:{
      PatientInfo:newFindPatientInfoResultInfo,
      EpisodeInfo:newFindEpisodeInfoResultInfo
    }
  
  }
  
  return newEligibleEpisodeListDto
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

  async checkeligible(checkEligibleBodyDto:QueryEligibleBodyDto){
   // const dummyDataRequest =new DummyDataRequest1();
    //checkEligibleBodyDto.PatientInfo.PID =dummyDataRequest.PatientInfo.DataJson.Id;

    let RequesetBody ,xResultInfo;
     try{
       RequesetBody ={
         xRefID:checkEligibleBodyDto.PatientInfo.RefId||'',
         xTransactionNo:checkEligibleBodyDto.PatientInfo.TransactionNo||'',
         xPID : checkEligibleBodyDto.PatientInfo.PID||'', //DUMMY_National_ID ,
         xPassportnumber : checkEligibleBodyDto.PatientInfo.PassportNumber||'',
         xIdType:checkEligibleBodyDto.PatientInfo.IdType||'',
         xServiceSettingCode:checkEligibleBodyDto.PatientInfo.ServiceSettingCode||'',
         xInsurerCode:checkEligibleBodyDto.PatientInfo.InsurerCode||null,
         xHN :checkEligibleBodyDto.PatientInfo.HN||'',
         xFirstName :checkEligibleBodyDto.PatientInfo.GivenNameTH||'',
         xLastName :checkEligibleBodyDto.PatientInfo.SurnameTH||'',
         xDob :checkEligibleBodyDto.PatientInfo.DateOfBirth||'',
         xVN: checkEligibleBodyDto.PatientInfo.VN||'',
         xPolicyTypeCode:checkEligibleBodyDto.PatientInfo.PolicyTypeCode||'',
         xIllnessTypeCode:checkEligibleBodyDto.PatientInfo.IllnessTypeCode||'',
         xSurgeryTypeCode:checkEligibleBodyDto.PatientInfo.SurgeryTypeCode||'',
         xVisitDateTime:checkEligibleBodyDto.PatientInfo.VisitDateTime||'',
         xAccidentDate:checkEligibleBodyDto.PatientInfo.AccidentDate||'',
       }
       const xRefId= await this.generateRefId(RequesetBody.xVN,RequesetBody.xInsurerCode,RequesetBody.xServiceSettingCode)
       const xUsername=AIA_APIHopitalUsername;
       const xHospitalCode =await this.utilsService.EncryptAESECB(AIA_APIHospitalCode,AIA_APISecretkey);
       const xInsurerCode=RequesetBody.xInsurerCode;
       const xElectronicSignature='';
       const xDataJsonType =3;
       let xDataJson_IdType,DataJson_Id;
       if (RequesetBody.xPID===RequesetBody.xHN){
         DataJson_Id=RequesetBody.xPassportnumber;
         xDataJson_IdType ='PASSPORT';
       }else{
         DataJson_Id=RequesetBody.xPID;
         xDataJson_IdType ='NATIONAL_ID';
       }
  
       const xDataJson_Id =await this.utilsService.EncryptAESECB(DataJson_Id,AIA_APISecretkey);
       const xPolicyType =RequesetBody.xPolicyTypeCode;
       const xServiceSetting =RequesetBody.xServiceSettingCode;
       const xIllnessType =RequesetBody.xIllnessTypeCode;
       const xSurgeryType =RequesetBody.xSurgeryTypeCode;
       let xFirstName =RequesetBody.xFirstName;
       if (xFirstName){ xFirstName =await this.utilsService.EncryptAESECB(xFirstName,AIA_APISecretkey);}
       let xLastName =RequesetBody.xLastName;
       if (xLastName){ xLastName =await this.utilsService.EncryptAESECB(xLastName,AIA_APISecretkey);}
       let xDob =RequesetBody.xDob;
       if (xDob){ xDob =await this.utilsService.EncryptAESECB(xDob,AIA_APISecretkey);}
       const xVisitDateTime =RequesetBody.xVisitDateTime||''; 
       const xAccidentDate=RequesetBody.xAccidentDate||'';
    
      //  console.log('-------')
      //  console.log( xDataJson_IdType)
      //  console.log(RequesetBody.xPID)
      //  console.log(xDataJson_Id)
      //  console.log('----^^^^^^---')
 
  //  console.log(apiURL)
  //  console.log(ObjAccessTokenKey)
  //  console.log('RefId: '+xRefId)
  //  console.log('Username: '+xUsername)
  //  console.log('HospitalCode: '+xHospitalCode)
  //  console.log('InsurerCode: '+xInsurerCode)
  //  console.log('ElectronicSignature: '+xElectronicSignature)
  //  console.log('DataJsonType: '+xDataJsonType)
  //  console.log('DataJson->IdType: '+xDataJson_IdType)
  //  console.log('DataJson->Id: '+xDataJson_Id)
  //  console.log('DataJson->PolicyType: '+xPolicyType)
  //  console.log('DataJson->ServiceSetting: '+xServiceSetting)
  //  console.log('DataJson->IllnessType: '+xIllnessType)
  //  console.log('DataJson->SurgeryType: '+xSurgeryType)
  //  console.log('DataJson->Patient->FirstName: '+xFirstName)
  //  console.log('DataJson->Patient->LastName: '+xLastName)
  //  console.log('DataJson->Patient->Dob: '+xDob)
  //  console.log('DataJson->Visit->VisitDateTime: '+xVisitDateTime)
  //  console.log('DataJson->Visit->AccidentDate: '+xAccidentDate)
 
   const body_DataJson = {
     IdType: xDataJson_IdType, //IdType,
     Id:  xDataJson_Id, //Utils.EncryptAESECB(PID),
     PolicyType: xPolicyType,
     ServiceSetting: xServiceSetting,
     IllnessType: xIllnessType,
     SurgeryType: xSurgeryType,
     Patient: {
       FirstName:xFirstName,  
       LastName: xLastName, 
       Dob: xDob,
       },
       Visit: {
         VisitDateTime: xVisitDateTime ,
         AccidentDate:xAccidentDate||''
       }
     }
 
   const body = {
     RefId: xRefId,
     Username: xUsername,
     HospitalCode: xHospitalCode,
     InsurerCode: xInsurerCode,
     ElectronicSignature: xElectronicSignature,
     DataJsonType: xDataJsonType,
     DataJson: body_DataJson
   };
   const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
   const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
   const apiURL= `${AIA_APIURL}/SmartClaim/checkEligible`;
   const headers = {
     'Content-Type':API_CONTENTTYPE,
     'Ocp-Apim-Subscription-Key': AIA_APISubscription,
     'Apim-Auth-Secure-Token': ObjAccessTokenKey
   };
   const responsefromAIA = await lastValueFrom(
     this.httpService.post(apiURL, body, { headers })
   );

   const responeInputcode =responsefromAIA.data.Result.Code
   //console.log(responeInputcode)
   if (responeInputcode !=='S'){
     this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA.data.Result.MessageTh,responsefromAIA.data.Result.MessageTh)
   }else{
     let xInsuranceResult= new InsuranceResult();
     xInsuranceResult ={
      Code:responsefromAIA.data.Result.Code ||'',
      Message:responsefromAIA.data.Result.Message ||'',
      MessageTh:responsefromAIA.data.Result.MessageTh ||'',
     }
     //console.log(xInsuranceResult)
     const xMessageList: MessageList[] = responsefromAIA.data.Data.CoverageList ? responsefromAIA.data.Data.CoverageList.flatMap((coverageItem) => {
       return coverageItem.MessageList.map((item) => {
        const decryptedPolicyNo = this.utilsService.DecryptAESECB(item.PolicyNo, AIA_APISecretkey) || '';
          return {
            PolicyNo: decryptedPolicyNo, 
            PlanName: item.PlanName,
            MessageTh: item.MessageTh,
            MessageEn: item.MessageEn,
            RuleNo: item.RuleNo
         };
       });
     }):[];
    //console.log(xMessageList)
     //console.log("xCoverageList")
     const xCoverageList: CoverageList[] = responsefromAIA.data.Data.CoverageList ? responsefromAIA.data.Data.CoverageList.map((item) => {
      const convertCoverageType =this.convertCoverageListType(item.Type)
      return {
         Type: convertCoverageType,  
         Status:item.Status,
         MessageList: Array.isArray(xMessageList) ? xMessageList : [] , 
       };
     }):[];
     //console.log(xCoverageList)
     //console.log("xPolicyInfoList")
     const xPolicyInfoList: PolicyInfoList[] = responsefromAIA.data.Data.PolicyInfoList  ?  responsefromAIA.data.Data.PolicyInfoList.map((item) => {
        const decryptedPolicyNo = this.utilsService.DecryptAESECB(item.PolicyNo, AIA_APISecretkey) || '';
        const decryptedMembershipNo = this.utilsService.DecryptAESECB(item.MembershipNo, AIA_APISecretkey) || '';
        const effectiveDate = new Date(item.EffectiveDate);
        const formattedEffectiveDate = effectiveDate.toISOString().split('T')[0];
      return {
        PolicyNo: decryptedPolicyNo,
        MembershipNo: decryptedMembershipNo,
        PolicyDescription: item.PolicyDescription,  
        EffectiveDate: formattedEffectiveDate,
        Remark1: item.Remark1,  
        Remark2:item.Remark2,
        SpecialRemark1: item.SpecialRemark1,  
        SpecialRemark2:item.SpecialRemark2
       };
     }):[];
    
     //console.log(xPolicyInfoList)

     let xInsuranceData = new InsuranceData();
     xInsuranceData={
      RefId:responsefromAIA.data.Data.RefId ||'',
      TransactionNo:responsefromAIA.data.Data.TransactionNo ||'',
      InsurerCode:responsefromAIA.data.Data.InsurerCode ||'',
      CoverageClaimStatus:Boolean(responsefromAIA.data.Data.CoverageClaimStatus) ||false,
      RemarkList:[],
      PolicyCoverageDesc:[],
      CoverageList:Array.isArray(xCoverageList) ? xCoverageList : [] ,
      PolicyInfoList: Array.isArray(xPolicyInfoList) ? xPolicyInfoList : [] 
     }
     //console.log(xInsuranceData)
    let xinsuranceCustomerDetail = new InsuranceCustomerDetail();
      xinsuranceCustomerDetail={
        PolicyNo: await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.PolicyNo,AIA_APISecretkey) ||'',
        MemberShipId:await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.MemberShipId,AIA_APISecretkey) ||'', //responsefromAIA.data.CustomerDetail.MemberShipId ||'',
        FirstName:await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.FirstName,AIA_APISecretkey) ||'', //responsefromAIA.data.CustomerDetail.FirstName ||'',
        LastName:await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.LastName,AIA_APISecretkey) ||'', //responsefromAIA.data.CustomerDetail.LastName ||'',
        NationalId:await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.NationalId,AIA_APISecretkey) ||'', //responsefromAIA.data.CustomerDetail.NationalId ||''
    
      }
       xResultInfo ={
        InsuranceResult: xInsuranceResult,
        InsuranceData: xInsuranceData,
        InsuranceCustomerDetail :  xinsuranceCustomerDetail
      } 
   this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  
   } 
 
   let newResultCheckEligibleDto= new ResultCheckEligibleDto();
   newResultCheckEligibleDto={
     HTTPStatus:newHttpMessageDto,
     Result:xResultInfo
   }
   return newResultCheckEligibleDto
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

   convertCoverageListType(xType:string){

    const coverageListTypes: { [key: string]: string } = {
      HS: "ผลประโยชน์ค่ารักษาพยาบาล",
      HB: "ผลประโยชน์ค่าชดเชยนอนรพ.",
      AI: "ผลประโยชน์ค่าชดเชย",
      HSBypass: "ผลประโยชน์ค่ารักษาพยาบาลที่ต้องตรวจสอบความคุ้มครองโดยเจ้าหน้าที่ AIA"
    };
  
    return coverageListTypes[xType] || null;
   }
   async generateRefId(inputVN:string,inputInsurerCode:number,inputServiceSettingCode:string){
   // console.log(inputVN+'---'+inputInsurerCode+'---'+inputServiceSettingCode)
    let count , xRefId
  if ((inputVN)&&(inputInsurerCode)&&(inputServiceSettingCode)){
    count = await prismaProgest.transactionclaim.count({
      where: {
        vn: inputVN ,
        insurerid: +inputInsurerCode,
        NOT:{
          claimstatuscode:{
            in:['05','06']
          }
        }
      }
    });
    if (count===0){ 
        let countVNTotal = await prismaProgest.transactionclaim.count({
          where: {
             vn: inputVN ,
             insurerid: +inputInsurerCode,
            } });
            countVNTotal =countVNTotal+1
        xRefId =inputVN+'-'+inputInsurerCode+'-'+inputServiceSettingCode+'-'+countVNTotal.toString().padStart(3, '0');
        xRefId = await this.utilsService.EncryptAESECB(xRefId,AIA_APISecretkey); 
    }else{
      const xxRefId = await prismaProgest.transactionclaim.findFirst({
        where: {
          vn: inputVN ,
          insurerid: +inputInsurerCode
        },
        select:{
          refid :true
        }
      });
       xRefId =  xxRefId.refid
    }
  }else{  xRefId='' }
  return xRefId
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
