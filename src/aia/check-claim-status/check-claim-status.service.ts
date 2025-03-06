import { Injectable , HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom ,of } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';
import { prismaProgest } from '../../database/database';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';


import { QueryCheckClaimStatusBodyDto } from './dto/query-check-claim-status.dto';
import { QueryCheckClaimStatusListAllBodyDto } from './dto/query-check-claim-status-listall.dto';

import { ResultCheckClaimStatusDto ,InsuranceResult ,InsuranceData ,ResultAttachDocListInfoDto} from './dto/result-check-claim-status.dto';
import { ResultCheckClaimStatusListAllDto  ,InsuranceDataListAll ,} from './dto/result-check-claim-status-listall.dto';
 //import { DummyDataRespone1 } from './dummyRespone2';
const newHttpMessageDto =new HttpMessageDto();
const httpStatusMessageService = new HttpStatusMessageService();
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
    private readonly utilsService:UtilsService,
  ) {}

  async Checkclaimstatus(queryCheckClaimStatusBodyDto:QueryCheckClaimStatusBodyDto){
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
         xHN :queryCheckClaimStatusBodyDto.PatientInfo.HN,
         xVN: queryCheckClaimStatusBodyDto.PatientInfo.VN,
    
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
      if (responeInputcode !=='S'){
        this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA.Result.MessageTh,responsefromAIA.Result.MessageTh)
      }else{
        
        let xInsuranceResult= new InsuranceResult();
        xInsuranceResult ={
         Code:responsefromAIA.Result.Code ||'',
         Message:responsefromAIA.Result.Message ||'',
         MessageTh:responsefromAIA.Result.MessageTh ||'',
        }
      //  const DecryptDocument =await this.utilsService.DecryptAESECB(responsefromAIA.Data.AttachDocList.Base64Data, AIA_APISecretkey);
     // const DecryptDocument = await this.utilsService.DecryptAESECB('doc.Base64Data', AIA_APISecretkey);
     let xResultAttachDocListInfoDto: ResultAttachDocListInfoDto[] = [];
     
     if (responsefromAIA.Data.AttachDocList.length >0){
     xResultAttachDocListInfoDto = await Promise.all(
       responsefromAIA.Data.AttachDocList.map(async (doc) => {
        
         try {
           const DecryptDocument = await this.utilsService.DecryptAESECB( doc.Base64Data, AIA_APISecretkey, );
           
           await this.utilsService.saveBase64File(DecryptDocument, doc.DocName);

           const existingOriginalname = await prismaProgest.claimdocuments.findMany({
            where: {
               originalname: doc.DocName
            }
        }); 
        if (!existingOriginalname || (Array.isArray(existingOriginalname) && existingOriginalname.length === 0)) {
          
          await prismaProgest.claimdocuments.create({
            data: {
              hn: queryCheckClaimStatusBodyDto.PatientInfo.HN, //RequesetBody.xHN, // ปรับข้อมูลตามที่ต้องการ
              vn: queryCheckClaimStatusBodyDto.PatientInfo.VN, //RequesetBody.xVN,
              refid: RequesetBody.xRefId,
              insurerid:13,
              transactionno: RequesetBody.xTransactionNo,
              documenttypecode: '007',
              documenttypename:'pdf',
              originalname: doc.DocName,
              documentname: RequesetBody.xVN+'-'+'007'+'-'+Math.round(Math.random() * 186).toString(3)+'.'+'pdf',
              filesize: null,
              filemimetype: 'application/pdf',
              serverpath: 'path-to-server', 
              filepath: `./uploads/pdf/`+doc.DocName, // เส้นทางที่เก็บไฟล์
              uploaddate: new Date(),
              uploadedby: null,
             runningdocument:Math.round(Math.random() * 186).toString(3)
            },
          });
         
         return {
           Base64Data: doc.Base64Data,
           DocName: doc.DocName,
         };

        }else{
          return {
            Base64Data: doc.Base64Data,
            DocName: doc.DocName,
          };

        }
       

         } catch (error) {
           console.error(`Error processing document ${doc.DocName}:`, error);
           return {
             Base64Data: doc.Base64Data,
             DocName: doc.DocName,
           };
         }
       }),
     );
     console.log(xResultAttachDocListInfoDto[0].DocName)
    }
 //const uploadBase64File = await this.utilsService.saveBase64File(xResultAttachDocListInfoDto.Base64Data, xResultAttachDocListInfoDto.DocName);
 
 //const saveFileToDatabase = await this.utilsService.saveFile(xResultAttachDocListInfoDto.Base64Data, xResultAttachDocListInfoDto.DocName);

 // โฟลเดอร์สำหรับเก็บไฟล์
 

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
const transactionclaimexistingRecord = await prismaProgest.transactionclaim.findFirst({
  where: {
    refid: RequesetBody.xRefId,
    transactionno: RequesetBody.xTransactionNo,
   
  },
});
if (transactionclaimexistingRecord) {
  const updateclaimcode =claimcode
  const updateclaimstatusdesc =responsefromAIA.Data.ClaimStatus
  const updateclaimstatusdesc_th =responsefromAIA.Data.ClaimStatusDesc
  const updatebatchnumber =responsefromAIA.Data.BatchNumber
  const updatetotalapprovedamount =responsefromAIA.Data.TotalApproveAmount
  const updatepaymentdate =responsefromAIA.Data.PaymentDate


  const QueryUpdate = {
    ...(updateclaimcode ? { claimstatuscode: updateclaimcode } : {}),
    ...(updateclaimstatusdesc ? { claimstatusdesc: updateclaimstatusdesc } : {}),
    ...(updateclaimstatusdesc_th ? { claimstatusdesc_th: updateclaimstatusdesc_th } : {}),
    ...(updateclaimstatusdesc ? { claimstatusdesc_en: updateclaimstatusdesc } : {}),
    ...(updatebatchnumber ? { batchnumber: updatebatchnumber } : {}),
    ...(updatetotalapprovedamount ? { totalapprovedamount: updatetotalapprovedamount } : {}),
    ...(updatepaymentdate ? { paymentdate: updatepaymentdate } : {}),

  };
  if (QueryUpdate){
    const filteredQueryUpdate = Object.fromEntries(
     Object.entries(QueryUpdate).filter(([, value]) => value !== null && value !== undefined)
  );
  await prismaProgest.transactionclaim.update({
    where: {
      id: transactionclaimexistingRecord.id, // Use the ID of the existing record
    },
    data: filteredQueryUpdate
  });
}
}

const transactionclaimstatusexistingRecord = await prismaProgest.transactionclaimstatus.findFirst({
  where: {
    refid: RequesetBody.xRefId,
    transactionno: RequesetBody.xTransactionNo,
    claimstatuscode:claimcode
  },
});
if (transactionclaimstatusexistingRecord) {
  
  // const updateclaimcode =claimcode;
  // const updateclaimstatusdesc =responsefromAIA.Data.ClaimStatus;
  // const updateclaimstatusdesc_th =responsefromAIA.Data.ClaimStatusDesc;
  // const updatebatchnumber =responsefromAIA.Data.BatchNumber;
  // const updatehn =RequesetBody.xHN;
  // const updatevn =RequesetBody.xVN;
  // const updatetotalapprovedamount =responsefromAIA.Data.TotalApproveAmount;
  // const updatepaymentdate =responsefromAIA.Data.PaymentDate;
  // const updateinvoicenumber =responsefromAIA.Data.InvoiceNumber;

  // const QueryUpdatetransactionclaimstatus = {
  //   ...(updatehn ? { hn: updatehn } : {}),
  //   ...(updatevn ? { vn: updatevn } : {}),
  //   ...(updateclaimcode ? { claimstatuscode: updateclaimcode } : {}),
  //   ...(updateclaimstatusdesc ? { claimstatusdesc: updateclaimstatusdesc } : {}),
  //   ...(updateclaimstatusdesc_th ? { claimstatusdesc_th: updateclaimstatusdesc_th } : {}),
  //   ...(updateclaimstatusdesc ? { claimstatusdesc_en: updateclaimstatusdesc } : {}),
  //   ...(updatebatchnumber ? { batchnumber: updatebatchnumber } : {}),
  //   ...(updatetotalapprovedamount ? { totalapprovedamount: updatetotalapprovedamount } : {}),
  //   ...(updatepaymentdate ? { paymentdate: updatepaymentdate } : {}),
  //   ...(updateinvoicenumber ? { invoicenumber: updateinvoicenumber } : {}),
  // };

  await prismaProgest.transactionclaimstatus.update({
    where: {
      id: transactionclaimstatusexistingRecord.id, // Use the ID of the existing record
    },
    data:{
      hn:RequesetBody.xHN,
      vn:RequesetBody.xVN,
      claimstatuscode: claimcode,
      claimstatusdesc:responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_en:responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_th:responsefromAIA.Data.ClaimStatusDesc,
      paymentdate:responsefromAIA.Data.PaymentDate,

    },
    // QueryUpdatetransactionclaimstatus
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
     totalapproveamount: responsefromAIA.Data.TotalApproveAmount+'',
      paymentdate:responsefromAIA.Data.PaymentDate,
      invoicenumber: responsefromAIA.Data.InvoiceNumber,
      claimstatusdesc:responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_en:responsefromAIA.Data.ClaimStatus,
      claimstatusdesc_th:responsefromAIA.Data.ClaimStatusDesc,
    },
  });
}
// console.log(transactionclaimstatusexistingRecord)
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
      } catch(error)
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

async getcheckclaimstatusListAll(queryCheckClaimStatusListAllBodyDto:QueryCheckClaimStatusListAllBodyDto){
  let xResultInfo,RequesetBody;
  const apiResponses = [];
  let responsefromAIA ;
  const insuranceDataArray: InsuranceDataListAll[] = []; 
  try {
      if (queryCheckClaimStatusListAllBodyDto.PatientInfo && queryCheckClaimStatusListAllBodyDto.PatientInfo.length > 0) {
       
        for (const patient of queryCheckClaimStatusListAllBodyDto.PatientInfo) {
          RequesetBody = {
            xRefId: patient.RefId,
            xTransactionNo: patient.TransactionNo,
            xInsurerCode: 13, 
          };

        const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
        const ObjAccessTokenKey = ObjAccessToken.accessTokenKey;
        const apiURL = `${AIA_APIURL}/SmartClaim/checkClaimStatus`;
        const xUsername = AIA_APIHopitalUsername;
        const xHospitalCode = await this.utilsService.EncryptAESECB(AIA_APIHospitalCode, AIA_APISecretkey);
        const xElectronicSignature = '';
        const xDataJsonType = 3;

        const body_DataJson = {};
        const body = {
          RefId: RequesetBody.xRefId,
          TransactionNo: RequesetBody.xTransactionNo,
          Username: xUsername,
          HospitalCode: xHospitalCode,
          InsurerCode: RequesetBody.xInsurerCode,
          ElectronicSignature: xElectronicSignature,
          DataJsonType: xDataJsonType,
          DataJson: body_DataJson,
        };
        const headers = {
          'Content-Type': API_CONTENTTYPE,
          'Ocp-Apim-Subscription-Key': AIA_APISubscription,
          'Apim-Auth-Secure-Token': ObjAccessTokenKey,
        };

        //  responsefromAIA = await lastValueFrom(
        //   this.httpService
        //     .post(apiURL, body, { headers })
        //     .pipe(
        //       map((response) => response.data), // Return only the data part of the response
        //       catchError((error) => {
        //         console.error('Error from AIA API:', error.response?.data || error.message);
        //         // this.addFormatHTTPStatus(newHttpMessageDto,400,error.response?.data.message,TrakcarepatientInfo.message)
        //         this.addFormatHTTPStatus(newHttpMessageDto,400,error.response?.data.message,error.response?.data.errorReason)
                
        //        throw new Error('Failed to call AIA API');
        //       })
        //     )
        // );

        responsefromAIA = await lastValueFrom(
          this.httpService
            .post(apiURL, body, { headers })
            .pipe(
              map((response) => response.data), // Return only the data part of the response
              catchError((error) => {
                console.error('Error from AIA API:', error.response?.data || error.message);
                //this.addFormatHTTPStatus(newHttpMessageDto, 400, error.response?.data.message, error.response?.data.errorReason);
              //  const newHttpMessageDto ={
              //     HTTPStatus: {
              //       statusCode: 'E', // or some default error code
              //       message: 'Error from AIA API',
              //       error: 'เกิดข้อผิดพลาดในการเรียก API',
              //     },
              //     }
       
                return of(newHttpMessageDto);
              })
            )
        );
        
         apiResponses.push(responsefromAIA);
        //  console.log('--------00')
        //  console.log(responsefromAIA)
        const responeInputcode =responsefromAIA.Result.Code
        // console.log(responsefromAIA)
         if (responeInputcode =='S'){
          
          const xClaimStatusCode = await this.utilsService.getClaimStatusCodeByDescription('13', responsefromAIA.Data.ClaimStatus);
          const claimcode = xClaimStatusCode.Result[0].claimstatuscode;

          const newInsuranceDataListAll :InsuranceDataListAll = {
            // RefIdReq:RequesetBody.xRefId,
            // TransactionNoReq:RequesetBody.xTransactionNo,
            // RefId: responsefromAIA?.Data?.RefId,
            // TransactionNo: responsefromAIA?.Data?.TransactionNo,
  
           
            RefId:RequesetBody.xRefId,
            TransactionNo:RequesetBody.xTransactionNo,
            Result: {
              Code: responsefromAIA.Result.Code,
              Message: responsefromAIA.Result.Message,
              MessageTh: responsefromAIA.Result.MessageTh,
            },
            StatusInfo: {
              InsurerCode:'13',
              BatchNumber: responsefromAIA?.Data?.BatchNumber,
              ClaimStatus: responsefromAIA?.Data?.ClaimStatus,
              ClaimStatusDesc: responsefromAIA?.Data?.ClaimStatusDesc,
              ClaimStatusCode:claimcode,
              ClaimStatusDesc_EN:responsefromAIA.Data.ClaimStatus||'',
              ClaimStatusDesc_TH:responsefromAIA.Data.ClaimStatusDesc||'',
              TotalApproveAmount: responsefromAIA?.Data?.TotalApproveAmount,
              PaymentDate: responsefromAIA?.Data?.PaymentDate,
              InvoiceNumber: responsefromAIA?.Data?.InvoiceNumber,
              AttachDocList: responsefromAIA?.Data?.AttachDocList,
            }
          };
          insuranceDataArray.push(newInsuranceDataListAll);
          const transactionclaimexistingRecord = await prismaProgest.transactionclaim.findMany({
            where: {
              refid:RequesetBody.xRefId,
              transactionno:RequesetBody.xTransactionNo,
            },
          });

          if (transactionclaimexistingRecord.length > 0) {
            transactionclaimexistingRecord.forEach(async (existingRecord) => {

              const QueryUpdate = {
                ...(claimcode ? { claimstatuscode: claimcode } : {}),
                ...(responsefromAIA.Data.ClaimStatus ? { claimstatusdesc: responsefromAIA.Data.ClaimStatus } : {}),
                ...(responsefromAIA.Data.ClaimStatus ? { claimstatusdesc_en: responsefromAIA.Data.ClaimStatus } : {}),
                ...(responsefromAIA.Data.ClaimStatusDesc ? { claimstatusdesc_th: responsefromAIA.Data.ClaimStatusDesc } : {}),
                ...(responsefromAIA.Data.BatchNumber ? { batchnumber: responsefromAIA.Data.BatchNumber } : {}),
                ...(responsefromAIA.Data.TotalApproveAmount ? { totalapprovedamount: responsefromAIA.Data.TotalApproveAmount } : {}),
                ...(responsefromAIA.Data.PaymentDate ? { paymentdate: responsefromAIA.Data.PaymentDate } : {}),
              };
              const filteredQueryUpdate = Object.fromEntries(
                Object.entries(QueryUpdate).filter(([, value]) => value !== null && value !== undefined)
              );

              if (Object.keys(filteredQueryUpdate).length > 0) {
                await prismaProgest.transactionclaim.update({
                  where: {
                    id: existingRecord.id,
                  },
                  data: filteredQueryUpdate,
                });
              }

            });
            /*
            BatchNumber: '',
    ClaimStatus: 'Approve',
    ClaimStatusDesc: 'อนุมัติการเรียกร้องสินไหม',
    TotalApproveAmount: null,
    PaymentDate: null,
    InvoiceNumber: null,
            */
           
    // if (transactionclaimexistingRecord.length > 0) {

    //         const QueryUpdate = {
    
    //           ...(claimcode ? { claimstatuscode: { equals: claimcode } } : {}),
    //           ...(responsefromAIA.Data.ClaimStatus ? { claimstatusdesc: { equals: responsefromAIA.Data.ClaimStatus  } } : {}),
    //           ...(responsefromAIA.Data.ClaimStatus ? { claimstatusdesc_en: { equals: responsefromAIA.Data.ClaimStatus  } } : {}),
    //           ...(responsefromAIA.Data.ClaimStatusDesc ? { claimstatusdesc_th: { equals: responsefromAIA.Data.ClaimStatusDesc } } : {}),
    //           ...(responsefromAIA.Data.BatchNumber ? { batchnumber: { equals: responsefromAIA.Data.BatchNumber  } } : {}),
    //           ...(responsefromAIA.Data.TotalApproveAmount  ? { totalapprovedamount: { equals: responsefromAIA.Data.TotalApproveAmount   } } : {}),
    //           ...(responsefromAIA.Data.PaymentDate  ? { paymentdate: { equals: responsefromAIA.Data.PaymentDate   } } : {}),

    //         };
    //           // ลบ fields ที่มีค่าเป็น null หรือ undefined
    //           const filteredQueryUpdate = Object.fromEntries(
    //             Object.entries(QueryUpdate).filter(([, value]) => value !== null && value !== undefined)
    //           );

    //         await prismaProgest.transactionclaim.update({
    //           where: {
    //             id: transactionclaimexistingRecord.id, // Use the ID of the existing record
    //           },
    //           data: filteredQueryUpdate
    //         });
    //       }

    xResultInfo ={
      InsuranceData: insuranceDataArray,
    } 
        }
        }
      }


    }

this.addFormatHTTPStatus(newHttpMessageDto,200,'','')

 let newResultCheckClaimStatusListAllDto= new ResultCheckClaimStatusListAllDto();
 newResultCheckClaimStatusListAllDto={
       HTTPStatus:newHttpMessageDto,
       Result:xResultInfo
}
    
   
     return newResultCheckClaimStatusListAllDto
    } catch(error)
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
}
