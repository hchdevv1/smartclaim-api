import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { lastValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import {HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';

import { ResultlistBillingCheckBalanceDto } from './dto/result-listBillingCheckBalance.dto';
import { 
  ResultPatientInfoDto ,ResultVisitInfoDto, ResultBillingInfoDto,ResultAttachDocListInfoDto ,ResultSubmitOpdDischargeDto
  ,ResultVitalSignInfoDto ,ResultDiagnosisInfoDto,ResultProcedureInfoDto ,ResultInvestigationInfoDto
  ,ResultOrderItemInfoDto ,ResultDoctorInfoDto ,QuerySubmitOpdDischargeDto ,ResultDataJsonDto
  ,CoverageList 
} from './dto/result-BillingCheckBalance.dto';
const httpStatusMessageService = new HttpStatusMessageService();
const newHttpMessageDto =new HttpMessageDto();

const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE
@Injectable()
export class CheckOpdBalanceService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService: TrakcareService ,
    private readonly  utilsService :UtilsService// Inject here
  ) {}

  async listBillingCheckBalance(xVN: string ){
  
   let arrayItemBillingCheckBalance;
   const newHttpMessageDto =new HttpMessageDto();
    try{
      
     const TrakcarepatientInfo = await this.trakcareService.getOPDCheckBalance(xVN)
 
     if (TrakcarepatientInfo.ItemBillingCheckBalance){
       arrayItemBillingCheckBalance = {
    
        ItemBillingCheckBalance: TrakcarepatientInfo.ItemBillingCheckBalance.map((item) => ({
        LocalBillingCode: item.LocalBillingCode,
      LocalBillingName: item.LocalBillingName,
      SimbBillingCode: item.SimbBillingCode,
      PayorBillingCode: item.PayorBillingCode,
      BillingInitial: item.BillingInitial,
      BillingDiscount: item.BillingDiscount,
      BillingNetAmount: item.BillingNetAmount,
      ItemCode: item.ItemCode,
      ItemName: item.ItemName,
      ItemAmount: item.ItemAmount,
      Discount: item.Discount,
      ItemUnitPrice: item.ItemUnitPrice,
      netamt: item.netamt,
      SimbVersion: item.SimbVersion,
      Terminology: item.Terminology,
   }))
      }
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')

     }else{
       arrayItemBillingCheckBalance = [{

        LocalBillingCode: '',
        LocalBillingName: '',
        SimbBillingCode: '',
        PayorBillingCode: '',
        BillingInitial: '',
        BillingDiscount: '',
        BillingNetAmount: '',
  
        ItemCode: '',
        ItemName: '',
        ItemAmount: '',
        Discount: '',
        ItemUnitPrice: '',
        netamt: '',
        SimbVersion: '',
        Terminology: '',
  
         
        }];
        this.addFormatHTTPStatus(newHttpMessageDto,400,'','')
     }
 


  let newResultlistBillingCheckBalanceDto= new ResultlistBillingCheckBalanceDto();
  newResultlistBillingCheckBalanceDto={
    HTTPStatus:newHttpMessageDto,
    Result:  arrayItemBillingCheckBalance
  }
  
  return newResultlistBillingCheckBalanceDto
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

  async SubmitBillingCheckBalance(querySubmitOpdDischargeDto:QuerySubmitOpdDischargeDto){
    let xResultInfo;
  try{
   const RequesetBody ={
    xInsurerCode: querySubmitOpdDischargeDto.PatientInfo.InsurerCode,
    xRefId:  querySubmitOpdDischargeDto.PatientInfo.RefId,
    xTransactionNo: querySubmitOpdDischargeDto.PatientInfo.TransactionNo,//'6f49b02c-4102-44e4-bd6a-c5bed5dc8b1c',
    xHN :querySubmitOpdDischargeDto.PatientInfo.HN ,//'62-027770',
    xVN: querySubmitOpdDischargeDto.PatientInfo.VN ,//'O415202-67',
    xVisitDateTime :querySubmitOpdDischargeDto.PatientInfo.VisitDateTime,
    xAccidentDate :querySubmitOpdDischargeDto.PatientInfo.AccidentDate,
    xBillingInfo:querySubmitOpdDischargeDto.PatientInfo.ItemBillingCheckBalance.BillingInfo,
    xOrderItem:querySubmitOpdDischargeDto.PatientInfo.ItemBillingCheckBalance.OrderItem,
    xTotalBillAmount:querySubmitOpdDischargeDto.PatientInfo.ItemBillingCheckBalance.TotalBillAmount,
    xICD10:querySubmitOpdDischargeDto.PatientInfo.ICD10,
    xFurtherClaimId:querySubmitOpdDischargeDto.PatientInfo.FurtherClaimId,
    xAccidentCauseOver45Days:querySubmitOpdDischargeDto.PatientInfo.AccidentCauseOver45Days

   }
  //  console.log('-------Start-------'+RequesetBody.xAccidentCauseOver45Days+'XXXX')
  //  console.log(RequesetBody.xBillingInfo)
   //let FurtherClaimVN =RequesetBody.xFurtherClaimVN
  
  ////////////////////////////////////////
  //--> get Patient  <--//
  
  let newResultPatientInfoDto=new ResultPatientInfoDto ;
  newResultPatientInfoDto = {
    Dob:'',
    Hn:'',
    Gender:''
  };
  console.log('Patient done')
  
  let newResultVisitInfoDto = new ResultVisitInfoDto()
  newResultVisitInfoDto= {
    FurtherClaimId: RequesetBody.xFurtherClaimId,
    AccidentCauseOver45Days: RequesetBody.xAccidentCauseOver45Days,
    AdditionalNote: '',
    AlcoholRelated: false,
    ChiefComplaint: '',
    ComaScore: '',
    DxFreeText: 'IsCheckClaimBalance',
    ExpectedDayOfRecovery: '',
    Height: '',
    PhysicalExam: '',
    PlanOfTreatment: '',
    Pregnant: false,
    PresentIllness: '',
    PreviousTreatmentDate: '',
    PreviousTreatmentDetail: '',
    PrivateCase:false,
    ProcedureFreeText: '',
    SignSymptomsDate: '',
    UnderlyingCondition: '',
    VisitDateTime:RequesetBody.xVisitDateTime,
    Vn:  await this.utilsService.EncryptAESECB( RequesetBody.xVN,AIA_APISecretkey) ,
    Weight: ''
  }
  console.log(newResultVisitInfoDto)
  let newResultVitalSignInfoDto: ResultVitalSignInfoDto[] = [];
  newResultVitalSignInfoDto = [{
    DiastolicBp: '',
    HeartRate: '',
    OxygenSaturation: '',
    PainScore: '',
    RespiratoryRate: '',
    SystolicBp: '',
    Temperature: '',
    VitalSignEntryDateTime: '',
  }];
  console.log('VitalSign done')

  
  let newQueryDiagnosisInfoDto: ResultDiagnosisInfoDto[] = [];
  newQueryDiagnosisInfoDto = [{
    DxName: 'Default Diagnosis for IsCheckClaimBalance',
    DxType: 'OT',
    Icd10: RequesetBody.xICD10,
  }];
  console.log('Diagnosis done')
  
 console.log(newQueryDiagnosisInfoDto)
   const newAccidentDetail= {
      "AccidentPlace": '4',
      "AccidentDate": RequesetBody.xAccidentDate,
      "CauseOfInjuryDetail": [
          {
              "CauseOfInjury": 'X599',
              "CommentOfInjury": ''
          }
      ],
      "InjuryDetail": [
          {
              "WoundType": 'Other',
              "InjurySide": 'Left',
              "InjuryArea":'T149'
          }
      ]
  
  }
  console.log('Accident done')

   
  let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];
  newResultProcedureInfoDto = [{
    Icd9: '',
    ProcedureName: '',
    ProcedureDate: '',
  }];
  console.log('Procedure done')

  let newResultInvestigationInfoDto: ResultInvestigationInfoDto[] = [];
  newResultInvestigationInfoDto = [{
    InvestigationCode: '',
    InvestigationGroup: '',
    InvestigationName: '',
    InvestigationResult: '',
    ResultDateTime: ''
  }];
  console.log('Investigation done')

  // let newResultOrderItemInfoDto : ResultOrderItemInfoDto[] = [];
  // newResultOrderItemInfoDto = [{
  //   ItemId: '0101004',
  //   ItemName: 'ยาผู้ป่วยนอก',
  //   ItemAmount: '1',
  //   Discount: '400.00',
  //   Initial: '30101400.00',
  //   LocalBillingCode: '1.1.1(3)',
  //   LocalBillingName: 'ยาผู้ป่วยนอก',
  //   Location: 'OPD',
  //   NetAmount: '3010100.00',
  //   SimbVersion: '1',
  //   Terminology: 'SIMB'
  // }];



  const newResultOrderItemInfoDto: ResultOrderItemInfoDto[] = RequesetBody.xOrderItem.map((orderitem) => {
    return {
      ItemId: orderitem.ItemId,
    ItemName: orderitem.ItemName,
    ItemAmount: '1',
    Discount: orderitem.Discount,
    Initial: orderitem.Initial,
    LocalBillingCode: orderitem.LocalBillingCode,
    LocalBillingName: orderitem.LocalBillingName,
    Location: 'OPD',
    NetAmount: orderitem.NetAmount,
    SimbVersion: '1',
    Terminology: 'SIMB'
    };
  });
  console.log('OrderItem done')

  let newResultDoctorInfoDto: ResultDoctorInfoDto[] = [];
  newResultDoctorInfoDto = [{
    DoctorLicense: '0000000000',
    DoctorRole: 'OWNER',
    DoctorFirstName: '',
    DoctorLastName: '',
  
  }];
  console.log('Doctor done')
 
 

  const newResultBillingInfoDto: ResultBillingInfoDto[] = RequesetBody.xBillingInfo.map((billingInfo) => {
    return {
      LocalBillingCode: billingInfo.LocalBillingCode,
      LocalBillingName: billingInfo.LocalBillingName,
      SimbBillingCode: billingInfo.SimbBillingCode,
      PayorBillingCode: billingInfo.PayorBillingCode,
      BillingInitial: billingInfo.BillingInitial,
      BillingDiscount: billingInfo.BillingDiscount,
      BillingNetAmount: billingInfo.BillingNetAmount,
    };
  });
  const newTotalBillAmount=RequesetBody.xTotalBillAmount //'3010100.00'
  console.log('billing done')
  //  //  
  //--> get PSS  Fixed<--//
  const  newResultPSSInfoDto={
    "Exclusion": "0",
    "FinalScore": "0",
    "Findings": [
      {
        "Description": "0",
        "Exclusion": "0",
        "Medical": "0",
        "Reference": "0"
      }
    ],
    "Id": "0",
    "Medical": "0"
  }
  console.log('PSS done')
  // //--> get AttachDocList  <--//
  // console.log('------')
  
  
  const getListDocumentByTransection = await this.utilsService.getListDocumentDummy('dummy'); 
  let newResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];
  newResultAttachDocListInfoDto = await Promise.all(
    getListDocumentByTransection.map(async (doc) => {
      const EncryptDocument = await this.utilsService.EncryptAESECB(doc.Base64Data, AIA_APISecretkey);
      return {
        Base64Data: EncryptDocument,
        DocName: doc.DocName,
      };
    })
  );

  let newResultDataJsonDto =new ResultDataJsonDto();
   newResultDataJsonDto ={
    Patient :newResultPatientInfoDto,
     Visit: newResultVisitInfoDto,
     VitalSign :newResultVitalSignInfoDto,
    Diagnosis :newQueryDiagnosisInfoDto,
    AccidentDetail:newAccidentDetail,
     Procedure :newResultProcedureInfoDto,
     Investigation :newResultInvestigationInfoDto,
    OrderItem :newResultOrderItemInfoDto,
    Doctor : newResultDoctorInfoDto,
    Billing :newResultBillingInfoDto,
     TotalBillAmount:newTotalBillAmount,
     Pss: newResultPSSInfoDto
  }
 
  
  const newOPDDischargeResponseDto ={
  
    RefId: RequesetBody.xRefId ,
    TransactionNo:RequesetBody.xTransactionNo, 
    Username:AIA_APIHopitalUsername,
    HospitalCode:await this.utilsService.EncryptAESECB(AIA_APIHospitalCode,AIA_APISecretkey),
    InsurerCode: RequesetBody.xInsurerCode,
    ElectronicSignature: '',
    IsCheckClaimBalance:true,  // <-- for Check ClaimBalance
    DataJsonType: "3",
    DataJson: newResultDataJsonDto,
    AttachDocList: newResultAttachDocListInfoDto
  
  }

   //////////////////////////////////////
        const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
         const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
         const apiURL= `${AIA_APIURL}/SmartClaim/opdDischarge`;
  
    const body = newOPDDischargeResponseDto
    const headers = {
     'Content-Type': API_CONTENTTYPE,
     'Ocp-Apim-Subscription-Key': AIA_APISubscription,
     'Apim-Auth-Secure-Token': ObjAccessTokenKey
   };
    const responsefromAIA = await lastValueFrom(
      this.httpService
        .post(apiURL, body, { headers })
        .pipe(
          map((response) => response.data), 
          catchError((error) => {
            console.error('Error from AIA API:', error.response?.data || error.message);
            throw new Error('Failed to call AIA API');
          })
        )
    );

    const responeInputcode = responsefromAIA.Result.Code
    if (responeInputcode !=='S'){
      
      const responeInputMessageTh = responsefromAIA.Result.MessageTh
      this.addFormatHTTPStatus(newHttpMessageDto,400,responeInputMessageTh,responeInputcode)
    }else{
  

  const xCoverageList: CoverageList[] = responsefromAIA.Data.CoverageList ? responsefromAIA.Data.CoverageList.map((item) => {
    const convertCoverageType =this.convertCoverageListType(item.type)
    return {
       Type: convertCoverageType,  
       Status:item.status,
     };
   }):[];

  xResultInfo ={
    Status: responsefromAIA.Result.MessageTh,
    ClaimNo:responsefromAIA.Data.ClaimNo,
    Total:newResultDataJsonDto.TotalBillAmount,
    TotalApprovedAmount:responsefromAIA.Data.TotalApprovedAmount,
    TotalExcessAmount:responsefromAIA.Data.TotalExcessAmount,
    CoverageList:xCoverageList 
  } 
  
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
    }
    let newResultSubmitOpdDischargeDto= new ResultSubmitOpdDischargeDto();
    newResultSubmitOpdDischargeDto={
            HTTPStatus:newHttpMessageDto,
            Result:xResultInfo
      }
  
  return newResultSubmitOpdDischargeDto
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
  convertCoverageListType(xType:string){

    const coverageListTypes: { [key: string]: string } = {
      HS: "ผลประโยชน์ค่ารักษาพยาบาล",
      HB: "ผลประโยชน์ค่าชดเชยนอนรพ.",
      AI: "ผลประโยชน์ค่าชดเชย",
      HSBypass: "ผลประโยชน์ค่ารักษาพยาบาลที่ต้องตรวจสอบความคุ้มครองโดยเจ้าหน้าที่ AIA",
      Reimbursement:"การชำระเงินคืน"
    };
  
    return coverageListTypes[xType] || null;
   }
}
