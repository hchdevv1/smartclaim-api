import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { prismaProgest } from '../../database/database';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';
import { UtilsService } from '../../utils/utils.service';


import { QueryDiagnosisDto ,ResultSubmitDiagnosisDto} from './dto/query-diagnoisis-preauth-submission.dto';
import { QueryPreAuthNoteDto ,ResultSubmitPreAuthNoteDto} from './dto/query-preauthnote-preauth-submission.dto';
import { QueryPreBillingDto ,ResultSubmitPreBillingDto} from './dto/query-prebilling-preauth-submission.dto';
import { QuerySubmitPreAuthDto} from './dto/query-submit-preauth-submission.dto';
import { ResultSubmitIPDVisitDto} from './dto/query-visit-preauth-submissiondto';
import { ResultPatientInfoDto ,ResultVisitInfoDto,ResultVitalSignInfoDto 
  ,ResultDiagnosisInfoDto ,ResultProcedureInfoDto ,ResultInvestigationInfoDto ,ResultOrderItemInfoDto ,ResultDoctorInfoDto
  ,ResultBillingInfoDto ,ResultAttachDocListInfoDto
  ,ResultDataJsonDto ,InsuranceResult ,InsuranceData ,ResultPreAuthNoteDto
  ,ResultSubmitPreAuthSubmissionDto 

} from './dto/result-submit-preauth-submission.dto';
import { QueryAccidentDatabaseBodyDto  ,
  CauseOfInjuryDetail,InjuryDetail
}  from '../../utils/dto/result-accident-databse.dto';
import { AccidentDetailDto } from './dto/review-preauth-submission.dto';
import { QueryAccidentDto  ,ResultSubmitAccidentDto} from './dto/query-accident-preauth-submission.dto';
import { QueryProcedureDto ,ResultSubmitProcedureDto } from './dto/query-procedure-preauth-submission.dto';
import { ResultlistBillingDto} from './dto/result-ListBilling.dto';

const httpStatusMessageService = new HttpStatusMessageService();
const newHttpMessageDto =new HttpMessageDto();
const AIA_APIURL= process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode =process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername=process.env.AIA_APIHopitalUsername;
const AIA_APISubscription =process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE
@Injectable()
export class PreauthSubmissionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService:TrakcareService,
    private readonly utilsService:UtilsService
  ) {}
  async getListBilling(xHN: string ){
  console.log(xHN)
    let arrayItemBillingCheckBalance;
    const newHttpMessageDto =new HttpMessageDto();
     try{
       
      const TrakcarepatientInfo = await this.trakcareService.getListBilling(xHN)
  
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
  
 
 
   let newResultlistBillingCheckBalanceDto= new ResultlistBillingDto();
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

  ///  submit to database
  async SubmitPreAuthVisit(querySubmitPreAuthDto:QuerySubmitPreAuthDto){
  let medicalTransaction;
  try{
    const xRefId =querySubmitPreAuthDto.PatientInfo.RefId;
    const xTransactionNo =querySubmitPreAuthDto.PatientInfo.TransactionNo;
    const xInsurerCode =querySubmitPreAuthDto.PatientInfo.InsurerCode;
    const xHN =querySubmitPreAuthDto.PatientInfo.HN;
    const xVN =querySubmitPreAuthDto.PatientInfo.VN;
    const xVisitDateTime =querySubmitPreAuthDto.PatientInfo.VisitDateTime||'';

    //const xComaScore =querySubmitPreAuthDto.PatientInfo.ComaScore||'';
    //const xExpectedDayOfRecovery =querySubmitPreAuthDto.PatientInfo.ExpectedDayOfRecovery||'';

  
    const xPreauthReferClaimNo =querySubmitPreAuthDto.PatientInfo.PreauthReferClaimNo||'';
    const xPreauthOcc =querySubmitPreAuthDto.PatientInfo.PreauthReferOcc||'';
    const xIsPackage =Boolean(querySubmitPreAuthDto.PatientInfo.IsPackage) || false;
    const xAnesthesiaList =querySubmitPreAuthDto.PatientInfo.AnesthesiaList||'';
    ////////////////////////
    const xExpectedAdmitDate =querySubmitPreAuthDto.PatientInfo.ExpectedAdmitDate||'';
    const xDscDateTime =querySubmitPreAuthDto.PatientInfo.DscDateTime||'';
    const xTotalEstimatedCost =querySubmitPreAuthDto.PatientInfo.TotalEstimatedCost||null;
    const xIndicationForAdmission =querySubmitPreAuthDto.PatientInfo.IndicationForAdmission||'';
    const xDxFreeText =querySubmitPreAuthDto.PatientInfo.DxFreeText||'';
    const xSignSymptomsDate =querySubmitPreAuthDto.PatientInfo.SignSymptomsDate||'';
    const xAlcoholRelated =Boolean(querySubmitPreAuthDto.PatientInfo.AlcoholRelated) || false;
    const xPregnant =Boolean(querySubmitPreAuthDto.PatientInfo.Pregnant) || false;
    const xPrivateCase =Boolean(querySubmitPreAuthDto.PatientInfo.PrivateCase) || false;
    const xPreviousTreatmentDate =querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDate||'';
    const xPreviousTreatmentDetail =querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail||'';
    ////////////////////////
    const xHaveProcedure =Boolean(querySubmitPreAuthDto.PatientInfo.HaveProcedure) || false;
    const xHaveAccidentCauseOfInjuryDetail =Boolean(querySubmitPreAuthDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false;
    const xHaveAccidentInjuryDetail =Boolean(querySubmitPreAuthDto.PatientInfo.HaveAccidentInjuryDetail) || false;
    const xHaveDiagnosis =querySubmitPreAuthDto.PatientInfo.HaveDiagnosis||false;
    const xHavepreBilling =querySubmitPreAuthDto.PatientInfo.HavepreBilling||false;
    const xHavePreAuthNote =querySubmitPreAuthDto.PatientInfo.HavePreAuthNote||false;

if (xTransactionNo){
 
  try {

    const existingTransaction = await prismaProgest.medicaltransactions.findFirst({
      where: {
        refid: xRefId,
        transactionno: xTransactionNo,
      },
    });
    // ถ้าพบข้อมูลที่ซ้ำกัน ให้ลบออกก่อน
    if (existingTransaction) {
      await prismaProgest.medicaltransactions.delete({
        where: { id: existingTransaction.id },
      });
    }
     medicalTransaction = await prismaProgest.medicaltransactions.create({
      data: {
        insurerid: xInsurerCode,
        refid: xRefId,
        transactionno: xTransactionNo,
        hn: xHN,
        vn:xVN,
        visitdatetime:xVisitDateTime,

        preauthreferclaimno:xPreauthReferClaimNo,
        preauthreferocc:xPreauthOcc,
        ispackage:xIsPackage,
        anesthesialist:xAnesthesiaList,

        expectedadmitdate:xExpectedAdmitDate,
        dscdatetime:xDscDateTime,
        totalestimatedcost:xTotalEstimatedCost,
        indicationforadmission: xIndicationForAdmission,
        dxfreetext: xDxFreeText,
        signsymptomsdate: xSignSymptomsDate,
        alcoholrelated: xAlcoholRelated,
        pregnant:xPregnant,
        privatecase:xPrivateCase,
        previoustreatmentdate:xPreviousTreatmentDate,
        previoustreatmentdetail:xPreviousTreatmentDetail,

        haveaccidentinjurydetail: xHaveAccidentInjuryDetail,
        haveaccidentcauseofinjurydetail: xHaveAccidentCauseOfInjuryDetail,
        haveprocedure: xHaveProcedure,
        havediagnosis:xHaveDiagnosis,
        havepreauthnote:xHavePreAuthNote,
        haveprebilling:xHavepreBilling,

       
      },
    });
    
    if (xPreauthReferClaimNo.length > 0) {
    const existingTransactionClaim = await prismaProgest.transactionclaim.findFirst({
      where: {
        refid: xRefId,
        transactionno: xTransactionNo,
      },
    });
    if (existingTransactionClaim) {
      
      await prismaProgest.transactionclaim.update({
        where: {
          id: existingTransactionClaim.id, // Use the ID of the existing record
        },
        data: {
          preauthreferclaimno:xPreauthReferClaimNo,
          preauthreferocc:xPreauthOcc,
        
        },
      });
    }
    }


  }catch (error) {
    throw new Error(`Error creating medical transaction: ${error.message}`);
  }
    this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
}else{
    this.addFormatHTTPStatus(newHttpMessageDto,400,'Invalid VisitDetail','')
}

    let newResultSubmitIPDVisitDto= new ResultSubmitIPDVisitDto();
    newResultSubmitIPDVisitDto={
            HTTPStatus:newHttpMessageDto,
            Result:medicalTransaction
      }

    return newResultSubmitIPDVisitDto
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
              statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
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
  async SubmitDiagnosis(queryDiagnosisDto:QueryDiagnosisDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryDiagnosisDto.PatientInfo.RefId;
      const xTransactionNo =queryDiagnosisDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryDiagnosisDto.PatientInfo.InsurerCode;
      const xHN =queryDiagnosisDto.PatientInfo.HN;
      const xVN =queryDiagnosisDto.PatientInfo.VN;
      const xHaveDiagnosis =Boolean(queryDiagnosisDto.PatientInfo.HaveDiagnosis) || false
  
  let DiagnosisList;
  if (xHaveDiagnosis ==true){
      
      if (Array.isArray(queryDiagnosisDto.PatientInfo.DiagnosisInfo)) {
        DiagnosisList = queryDiagnosisDto.PatientInfo.DiagnosisInfo.map((diagnosis) => ({
            Icd10: diagnosis.Icd10 || '',
            DxName: diagnosis.DxName || '',
            DxType: diagnosis.DxType || ''
          }));
          const existingProcedures = await prismaProgest.diagnosistransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });
        if (existingProcedures.length > 0) {
          await Promise.all(
              existingProcedures.map(async (diagnosis) => {
                  return await prismaProgest.diagnosistransactions.delete({
                      where: {
                          id: diagnosis.id // ใช้ id ในการลบ
                      }
                  });
              })
          );
      }
  
          await Promise.all(
            DiagnosisList.map(async (diagnosis) => {
                return await prismaProgest.diagnosistransactions.create({
                    data: {
                        insurerid: xInsurerCode,
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        hn: xHN,
                        vn: xVN,
                        icd10: diagnosis.Icd10,
                        dxname: diagnosis.DxName,
                        dxtype: diagnosis.DxType
                    }
                });
            })
        );
  
      } else {
        DiagnosisList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
    DiagnosisList = [
          {
              "Icd10": "",
              "DxName": "",
              "DxType": ""
          }
      ]
   // console.log(xHaveProcedure)
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Diagnosis','')
  }
  
    
      
      let newResultSubmitDiagnosisDto= new ResultSubmitDiagnosisDto();
      newResultSubmitDiagnosisDto={
              HTTPStatus:newHttpMessageDto,
              Result:DiagnosisList
        }
  
      return newResultSubmitDiagnosisDto
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
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
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
  async SubmitPreAuthNote(queryPreAuthNoteDto:QueryPreAuthNoteDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryPreAuthNoteDto.PatientInfo.RefId;
      const xTransactionNo =queryPreAuthNoteDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryPreAuthNoteDto.PatientInfo.InsurerCode;
      const xHN =queryPreAuthNoteDto.PatientInfo.HN;
      const xVN =queryPreAuthNoteDto.PatientInfo.VN;
      const xHavePreAuthNote = queryPreAuthNoteDto.PatientInfo.HavePreAuthNote;
  let PreAuthNoteList;
  if (xHavePreAuthNote ==true){
      
      if (Array.isArray(queryPreAuthNoteDto.PatientInfo.PreAuthNoteInfo)) {
        PreAuthNoteList = queryPreAuthNoteDto.PatientInfo.PreAuthNoteInfo.map((preauthnote) => ({
          PreAuthDatetime: preauthnote.PreAuthDatetime || '',
          PreAuthDetail: preauthnote.PreAuthDetail || '',
          }));
          const existingPreauthnote = await prismaProgest.preauthnotetransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });
        if (existingPreauthnote.length > 0) {
          await Promise.all(
            existingPreauthnote.map(async (preauthnote) => {
                  return await prismaProgest.preauthnotetransactions.delete({
                      where: {
                          id: preauthnote.id // ใช้ id ในการลบ
                      }
                  });
              })
          );
      }
  
          await Promise.all(
            PreAuthNoteList.map(async (preauthnote) => {
                return await prismaProgest.preauthnotetransactions.create({
                    data: {
                        insurerid: xInsurerCode,
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        hn: xHN,
                        vn: xVN,
                        preauthdatetime: preauthnote.PreAuthDatetime,
                        preauthdetail: preauthnote.PreAuthDetail,
                      
                    }
                });
            })
        );
  
      } else {
        PreAuthNoteList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
    PreAuthNoteList = [
          {
              "PreAuthDatetime": "",
              "PreAuthDetail": "",
          }
      ]
   // console.log(xHaveProcedure)
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Procedure','')
  }
  
    
      
      let newResultSubmitPreAuthNoteDto= new ResultSubmitPreAuthNoteDto();
      newResultSubmitPreAuthNoteDto={
              HTTPStatus:newHttpMessageDto,
              Result:PreAuthNoteList
        }
  
      return newResultSubmitPreAuthNoteDto
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
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
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
  async SubmitPreBilling(queryPreBillingDto:QueryPreBillingDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryPreBillingDto.PatientInfo.RefId;
      const xTransactionNo =queryPreBillingDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryPreBillingDto.PatientInfo.InsurerCode;
      const xHN =queryPreBillingDto.PatientInfo.HN;
      const xVN =queryPreBillingDto.PatientInfo.VN;
      const xHavePreBilling = queryPreBillingDto.PatientInfo.HavePreBilling;
  let PreBillingList;
  if (xHavePreBilling ==true){
      
      if (Array.isArray(queryPreBillingDto.PatientInfo.PreBillingInfo)) {
        PreBillingList = queryPreBillingDto.PatientInfo.PreBillingInfo.map((prebilling) => ({
          LocalBillingCode: prebilling.LocalBillingCode || '',
          LocalBillingName: prebilling.LocalBillingName || '',
          SimbBillingCode: prebilling.SimbBillingCode || '',
          PayorBillingCode: prebilling.PayorBillingCode || '',
          BillingInitial: prebilling.BillingInitial || '',
          BillingDiscount: prebilling.BillingDiscount || '',
          BillingNetamount: prebilling.BillingNetamount || '',
          TotalBillAmount:prebilling.TotalBillAmount||'',
          }));
          const existingPrebilling = await prismaProgest.prebillingtransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });
        if (existingPrebilling.length > 0) {
          await Promise.all(
            existingPrebilling.map(async (prebilling) => {
                  return await prismaProgest.prebillingtransactions.delete({
                      where: {
                          id: prebilling.id // ใช้ id ในการลบ
                      }
                  });
              })
          );
      }
  
          await Promise.all(
            PreBillingList.map(async (prebilling) => {
                return await prismaProgest.prebillingtransactions.create({
                    data: {
                        insurerid: xInsurerCode,
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        hn: xHN,
                        vn: xVN,
                        localbillingcode: prebilling.LocalBillingCode,
                        localbillingname: prebilling.LocalBillingName,
                        simbbillingcode: prebilling.SimbBillingCode,
                        payorbillingcode: prebilling.PayorBillingCode,
                        billingdiscount: prebilling.BillingDiscount,
                        billinginitial: prebilling.BillingInitial,
                        billingnetamount: prebilling.BillingNetamount,
                        totalbillamount:prebilling.TotalBillAmount
                      
                    }
                });
            })
        );
  
      } else {
        PreBillingList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
    PreBillingList = [
          {
              "LocalBillingCode": "",
              "LocalBillingName": "",
              "SimbBillingCode": "",
              "PayorBillingCode": "",
              "BillingInitial": "",
              "BillingDiscount": "",
              "BillingNetAmount": "",
              "TotalBillAmount":"",
          }
      ]
   // console.log(xHaveProcedure)
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Pre-Billing','')
  }
  
    
      
      let newResultSubmitPreBillingDto= new ResultSubmitPreBillingDto();
      newResultSubmitPreBillingDto={
              HTTPStatus:newHttpMessageDto,
              Result:PreBillingList
        }
  
      return newResultSubmitPreBillingDto
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
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
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
  async SubmitAccident(queryAccidentDto:QueryAccidentDto){
    let xResultInfo,xCauseOfInjuryDetail ,xInjuryDetail;
    try{
      const xRefId =queryAccidentDto.PatientInfo.RefId;
      const xTransactionNo =queryAccidentDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryAccidentDto.PatientInfo.InsurerCode;
      const xHN =queryAccidentDto.PatientInfo.HN;
      //const xVN =queryAccidentDto.PatientInfo.VN;
      const xHaveAccidentCauseOfInjuryDetail =Boolean(queryAccidentDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false
      const xHaveAccidentInjuryDetail =Boolean(queryAccidentDto.PatientInfo.HaveAccidentInjuryDetail) || false
      const xAccidentPlace =queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentPlace;
      const xAccidentDate =queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentDate;
  if ((xHaveAccidentCauseOfInjuryDetail ==true)||(xHaveAccidentInjuryDetail ==true)){
    
      await prismaProgest.$transaction(async (prisma) => {
      // ตรวจสอบว่ามีข้อมูลอยู่ใน accidenttransactions หรือไม่
      const existingTransaction = await prisma.accidenttransactions.findFirst({
        where: {
          refid: xRefId ,//queryAccidentDto.PatientInfo.RefId,
          transactionno:  xTransactionNo //queryAccidentDto.PatientInfo.TransactionNo,
        },
      }); 
      // ถ้ามีข้อมูลให้ลบข้อมูลเก่า
      if (existingTransaction) {
        await prisma.injurydetail.deleteMany({
          where: {
            accidentid: existingTransaction.id,
          },
        });
        await prisma.causeofinjurydetail.deleteMany({
          where: {
            accidentid: existingTransaction.id,
          },
        });
        await prisma.accidenttransactions.delete({
          where: {
            id: existingTransaction.id,
          },
        });
      }
    
      // บันทึกข้อมูลใหม่ใน accidenttransactions
    const accidentTransaction = await prisma.accidenttransactions.create({
        data: {
          insurerid: xInsurerCode ,//queryAccidentDto.PatientInfo.InsurerCode,
          refid: xRefId ,//queryAccidentDto.PatientInfo.RefId,
          transactionno: xTransactionNo,//queryAccidentDto.PatientInfo.TransactionNo,
          hn: xHN ,//queryAccidentDto.PatientInfo.HN,
        //  vn: xVN ,//queryAccidentDto.PatientInfo.VN,
          accidentplace: xAccidentPlace ,//queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentPlace,
          accidentdate: xAccidentDate //queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentDate,
        },
      });
    if(xHaveAccidentCauseOfInjuryDetail ==true){
      if (queryAccidentDto.PatientInfo.AccidentDetailInfo.CauseOfInjuryDetail) {
        xCauseOfInjuryDetail = queryAccidentDto.PatientInfo.AccidentDetailInfo.CauseOfInjuryDetail.map((cause) => ({
          accidentid: accidentTransaction.id,
          causeofinjury: cause.CauseOfInjury,
          commentofinjury: cause.CommentOfInjury,
        }));
    
        await prisma.causeofinjurydetail.createMany({
          data: xCauseOfInjuryDetail,
        });
      }
    }else{
        await prisma.causeofinjurydetail.deleteMany({
          where: {
            accidentid: existingTransaction.id,
          },
        });
      xCauseOfInjuryDetail =[{
        CauseOfInjury: '',
        CommentOfInjury: '',
       } ]
    }
      
    if(xHaveAccidentInjuryDetail ==true){
      if (queryAccidentDto.PatientInfo.HaveAccidentInjuryDetail) {
        xInjuryDetail = queryAccidentDto.PatientInfo.AccidentDetailInfo.InjuryDetail.map((injury) => ({
          accidentid: accidentTransaction.id,
          woundtype: injury.WoundType,
          injuryside: injury.InjurySide,
          injuryarea: injury.InjuryArea,
        }));
    
        await prisma.injurydetail.createMany({
          data: xInjuryDetail,
        });
      }
    }else{
      if ((xHaveAccidentInjuryDetail ==false)){
        await prisma.injurydetail.deleteMany({
          where: {
            accidentid: existingTransaction.id,
          },
        });
  
        xInjuryDetail =[{
         WoundType: '',
         InjurySide: '',
         InjuryArea: '',
        } ]
       }
    }
     });
    
    
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
    if ((xHaveAccidentCauseOfInjuryDetail ==false)){
       xCauseOfInjuryDetail =[{
        CauseOfInjury: '',
        CommentOfInjury: '',
       } ]
  
    }
    if ((xHaveAccidentInjuryDetail ==false)){
       xInjuryDetail =[{
        WoundType: '',
        InjurySide: '',
        InjuryArea: '',
       } ]
      }
    
    
  
  
    
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Accident','')
  }
  
    
  const xQueryAccident ={    
    AccidentPlace: xAccidentPlace, 
    AccidentDate: xAccidentDate,
    CauseOfInjuryDetail:xCauseOfInjuryDetail,
    InjuryDetail:xInjuryDetail
   }
   xResultInfo ={
    AccidentDetailInfo: xQueryAccident,
   } 
   let newResultSubmitAccidentDto= new ResultSubmitAccidentDto();
      newResultSubmitAccidentDto={
              HTTPStatus:newHttpMessageDto,
              Result:xResultInfo
        }
  
      return newResultSubmitAccidentDto
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
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
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
  async SubmitProcedure(queryProcedureDto:QueryProcedureDto){
    //let ResponeTrakcareHTTPStatus;
    try{
      const xRefId =queryProcedureDto.PatientInfo.RefId;
      const xTransactionNo =queryProcedureDto.PatientInfo.TransactionNo;
      const xInsurerCode =queryProcedureDto.PatientInfo.InsurerCode;
      const xHN =queryProcedureDto.PatientInfo.HN;
      const xVN =queryProcedureDto.PatientInfo.VN;
      const xHaveProcedure =Boolean(queryProcedureDto.PatientInfo.HaveProcedure) || false
  
  let ProcedureList;
  if (xHaveProcedure ==true){
      
      if (Array.isArray(queryProcedureDto.PatientInfo.ProcedureInfo)) {
          ProcedureList = queryProcedureDto.PatientInfo.ProcedureInfo.map((procedure) => ({
            Icd9: procedure.Icd9 || '',
            ProcedureName: procedure.ProcedureName || '',
            ProcedureDate: procedure.ProcedureDate || ''
          }));
          const existingProcedures = await prismaProgest.proceduretransactions.findMany({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo
            }
        });
        if (existingProcedures.length > 0) {
          await Promise.all(
              existingProcedures.map(async (procedure) => {
                  return await prismaProgest.proceduretransactions.delete({
                      where: {
                          id: procedure.id // ใช้ id ในการลบ
                      }
                  });
              })
          );
      }
  
          await Promise.all(
            ProcedureList.map(async (procedure) => {
                return await prismaProgest.proceduretransactions.create({
                    data: {
                        insurerid: xInsurerCode,
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        hn: xHN,
                        vn: xVN,
                        icd9: procedure.Icd9,
                        procedurename: procedure.ProcedureName,
                        proceduredate: procedure.ProcedureDate
                    }
                });
            })
        );
  
      } else {
           ProcedureList = [];
      }
     // console.log(xHaveProcedure)
      
      this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }else{
  ProcedureList = [
          {
              "Icd9": "",
              "ProcedureName": "",
              "ProcedureDate": ""
          }
      ]
   // console.log(xHaveProcedure)
      this.addFormatHTTPStatus(newHttpMessageDto,200,'Invalid Procedure','')
  }
  
    
      
      let newResultSubmitProcedureDto= new ResultSubmitProcedureDto();
      newResultSubmitProcedureDto={
              HTTPStatus:newHttpMessageDto,
              Result:ProcedureList
        }
  
      return newResultSubmitProcedureDto
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
                statusCode:error.code,// HttpStatus.INTERNAL_SERVER_ERROR,
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
  /// sent to aia
async SubmitPreSubmissionToAIA(querySubmitPreAuthDto:QuerySubmitPreAuthDto){
  let xResultInfo;

try{
 const RequesetBody ={
  xRefId:querySubmitPreAuthDto.PatientInfo.RefId, //'oljhnklefhbilubsEFJKLb65255555',
  xTransactionNo: querySubmitPreAuthDto.PatientInfo.TransactionNo,//'6f49b02c-4102-44e4-bd6a-c5bed5dc8b1c',
  xHN :querySubmitPreAuthDto.PatientInfo.HN ,
  xInsurerCode: querySubmitPreAuthDto.PatientInfo.InsurerCode, 
  xVN: querySubmitPreAuthDto.PatientInfo.VN||'' ,
  xVisitDateTime :querySubmitPreAuthDto.PatientInfo.VisitDateTime,
  xAccidentDate:querySubmitPreAuthDto.PatientInfo.AccidentDate,
  xAccidentPlaceCode :querySubmitPreAuthDto.PatientInfo.AccidentPlaceCode,
  xIdType:querySubmitPreAuthDto.PatientInfo.IdType,
  xPolicyTypeCode :querySubmitPreAuthDto.PatientInfo.PolicyTypeCode,
  xServiceSettingCode:querySubmitPreAuthDto.PatientInfo.ServiceSettingCode,
  xSurgeryTypeCode:querySubmitPreAuthDto.PatientInfo.SurgeryTypeCode,
  xIllnessTypeCode:querySubmitPreAuthDto.PatientInfo.IllnessTypeCode,
  xRunningdocument:querySubmitPreAuthDto.PatientInfo.Runningdocument,
  xPreviousTreatmentDate:querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDate,
  xPreviousTreatmentDetail:querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail,
  xPreauthReferClaimNo:querySubmitPreAuthDto.PatientInfo.PreauthReferClaimNo,
  xPreauthReferOcc:querySubmitPreAuthDto.PatientInfo.PreauthReferOcc,
  xExpectedAdmitDate:querySubmitPreAuthDto.PatientInfo.ExpectedAdmitDate,
  xDxFreeText:querySubmitPreAuthDto.PatientInfo.DxFreeText,
  xDscDateTime:querySubmitPreAuthDto.PatientInfo.DscDateTime,
  xIndicationForAdmission:querySubmitPreAuthDto.PatientInfo.IndicationForAdmission,
 }
 
//--> get Patient  <--//
const getSubmitPreAuthPatient = await this.trakcareService.getOPDDischargePatient(RequesetBody.xHN);
let newResultPatientInfoDto: ResultPatientInfoDto ;
if (getSubmitPreAuthPatient && getSubmitPreAuthPatient.PatientInfo && getSubmitPreAuthPatient.PatientInfo.HN.length > 0) {
   newResultPatientInfoDto = {
      Dob: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.Dob,AIA_APISecretkey) ,
      Hn: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.HN,AIA_APISecretkey) ,
      Gender: getSubmitPreAuthPatient.PatientInfo.Gender
 };
}else{
   newResultPatientInfoDto = {
    Dob:'',
    Hn:'',
    Gender:''
  };
}
console.log('Patient done')

// //--> get Visit  <--//
const whereConditionsGetVisit = {
  ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
  ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
  ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
};
const existingVisitRecord = await prismaProgest.medicaltransactions.findFirst({
where: whereConditionsGetVisit
});
let newResultVisitInfoDto = new ResultVisitInfoDto()
if (existingVisitRecord){
  const newQueryVisitDatabaseBodyDto ={
    RefId: RequesetBody.xRefId,
    TransactionNo: RequesetBody.xTransactionNo,
    InsurerCode:RequesetBody.xInsurerCode,
    HN: RequesetBody.xHN,
    VN: RequesetBody.xVN,
  }
  const getvisitformDatabase = await this.utilsService.getvisitIPDformDatabase(newQueryVisitDatabaseBodyDto)
   newResultVisitInfoDto= {
    AccidentDate:getvisitformDatabase.Result.VisitInfo.AccidentDate,
    AdmitDateTime:getvisitformDatabase.Result.VisitInfo.VisitDateTime,
    AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote||'',
    AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated||false,
    An:  await this.utilsService.EncryptAESECB( getvisitformDatabase.Result.VisitInfo.VN,AIA_APISecretkey) ,
    ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint||'',
    ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore||'',
    DscDateTime:getvisitformDatabase.Result.VisitInfo.DscDateTime,
    DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText||'',
    ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery||'',
    ExpectedLos:null,
    Height: getvisitformDatabase.Result.VisitInfo.Height||'',
    IndicationForAdmission:getvisitformDatabase.Result.VisitInfo.IndicationForAdmission,
    PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam||'',
    PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment||'',
    Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant||false,
    PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness||'',
    PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate||'',
    PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail||'',
    PreauthReferClaimNo:getvisitformDatabase.Result.VisitInfo.PreauthReferClaimNo,
    PreauthReferOcc: getvisitformDatabase.Result.VisitInfo.PreauthReferOcc,
    PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase||false,
    SignSymptomsDate:getvisitformDatabase.Result.VisitInfo.SignSymptomsDate|| '',
    UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition||'',
    VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
    Vn:  await this.utilsService.EncryptAESECB( getvisitformDatabase.Result.VisitInfo.VN,AIA_APISecretkey) ,
    AnesthesiaList :getvisitformDatabase.Result.VisitInfo.AnesthesiaList,
    Weight: getvisitformDatabase.Result.VisitInfo.Weight||'',
    TotalEstimatedCost :getvisitformDatabase.Result.VisitInfo.TotalEstimatedCost,
    IsPackage :getvisitformDatabase.Result.VisitInfo.IsPackage
  }
  console.log('get Visit  from database ==> Done')
}else{
  let VNForVisitinfo ;
 
  const getIPDDischargeVisit = await this.trakcareService.getIPDVisit(VNForVisitinfo);
  newResultVisitInfoDto= {
    AccidentDate: getIPDDischargeVisit.VisitInfo.AccidentDate,
    AdmitDateTime: getIPDDischargeVisit.VisitInfo.VisitDateTime,
    AdditionalNote: getIPDDischargeVisit.VisitInfo.AdditionalNote,
    AlcoholRelated: getIPDDischargeVisit.VisitInfo.AlcoholRelated,
    An:  await this.utilsService.EncryptAESECB( getIPDDischargeVisit.VisitInfo.vn,AIA_APISecretkey) ,
    ChiefComplaint: getIPDDischargeVisit.VisitInfo.ChiefComplaint,
    ComaScore: getIPDDischargeVisit.VisitInfo.ComaScore,
    DscDateTime: getIPDDischargeVisit.VisitInfo.DscDateTime,
    DxFreeText: getIPDDischargeVisit.VisitInfo.DxFreeText,
    ExpectedDayOfRecovery: '',
    ExpectedLos:null,
    Height: '',
    IndicationForAdmission:RequesetBody.xIndicationForAdmission,
    PhysicalExam: '',
    PlanOfTreatment: '',
    Pregnant: getIPDDischargeVisit.VisitInfo.Pregnant,
    PresentIllness: '',
    PreviousTreatmentDate: '',
    PreviousTreatmentDetail: '',
    PreauthReferClaimNo:RequesetBody.xPreauthReferClaimNo||'',
    PreauthReferOcc:RequesetBody.xPreauthReferOcc||'',
    PrivateCase: getIPDDischargeVisit.VisitInfo.PrivateCase,
    SignSymptomsDate: '',
    UnderlyingCondition: '',
    VisitDateTime: getIPDDischargeVisit.VisitInfo.VisitDateTime,
    Vn:  await this.utilsService.EncryptAESECB( getIPDDischargeVisit.VisitInfo.vn ,AIA_APISecretkey) ,
    Weight: '',
    AnesthesiaList:'',
    TotalEstimatedCost:'',
    IsPackage:null
  }
  console.log('getPreAuth Visit done')
}

 newResultVisitInfoDto.ExpectedLos = this.calculateDaysBetweenDates(newResultVisitInfoDto.VisitDateTime, newResultVisitInfoDto.DscDateTime);

// //--> get VitalSignIn  <--//
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
console.log('getIPDitalSign done')
// //--> get Diagnosis  <--//

let newQueryDiagnosisInfoDto: ResultDiagnosisInfoDto[] = [];
const newQueryPreDiagnosisDatabaseBodyDto ={
  RefId:RequesetBody.xRefId,
  TransactionNo:RequesetBody.xTransactionNo,
  InsurerCode:RequesetBody.xInsurerCode,
  HN:RequesetBody.xHN,
  VN:RequesetBody.xVN
}
const getDiagnosisformDatabase = await this.utilsService.getDiagnosisformDatabase(newQueryPreDiagnosisDatabaseBodyDto)
if (getDiagnosisformDatabase && getDiagnosisformDatabase.Result.DiagnosisInfo && getDiagnosisformDatabase.Result.DiagnosisInfo.length > 0) {
  newQueryDiagnosisInfoDto= await Promise.all(
    getDiagnosisformDatabase.Result.DiagnosisInfo.map(async (item) => {
    return {
      Icd10: item.Icd10,
      DxName: item.DxName,
      DxType: 'OT',
      
    };
  })
);

}else{
  newQueryDiagnosisInfoDto = [{
    DxName: '',
    DxType: '',
    Icd10: '',
  }];
}
console.log('get Diagnosis done')

let newAccidentDetail ; //= new ResultAccidentDetailDto();
if ((RequesetBody.xIllnessTypeCode='ACC')||(RequesetBody.xIllnessTypeCode='ER')){

  let newQueryAccidentDatabaseBodyDto = new QueryAccidentDatabaseBodyDto();
newQueryAccidentDatabaseBodyDto ={
  RefId: RequesetBody.xRefId,
  TransactionNo: RequesetBody.xTransactionNo,
  InsurerCode:RequesetBody.xInsurerCode,
  HN: RequesetBody.xHN,
  VN: RequesetBody.xVN,
}
const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
const accidentDetailInfo = new AccidentDetailDto();
accidentDetailInfo.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
accidentDetailInfo.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';

if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
  accidentDetailInfo.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
    const causeDetail = new CauseOfInjuryDetail();

      causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
      causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
      return causeDetail;
  });
} 
if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
  accidentDetailInfo.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
    const injuryDetail = new InjuryDetail();

      injuryDetail.WoundType = injury.WoundType || '';
      injuryDetail.InjurySide = injury.InjurySide || '';
      injuryDetail.InjuryArea = injury.InjuryArea || '';
      return injuryDetail;
  });
}
 newAccidentDetail = {    
  AccidentPlace: accidentDetailInfo.AccidentPlace,
  AccidentDate: accidentDetailInfo.AccidentDate,
  CauseOfInjuryDetail: accidentDetailInfo.CauseOfInjuryDetail,
  InjuryDetail: accidentDetailInfo.InjuryDetail
};

}else{
  newAccidentDetail= {
    "AccidentPlace": '',
    "AccidentDate": '',
    "CauseOfInjuryDetail": [
        {
            "CauseOfInjury": '',
            "CommentOfInjury": ''
        }
    ],
    "InjuryDetail": [
        {
            "WoundType": "",
            "InjurySide": "",
            "InjuryArea":''
        }
    ]
}
}
console.log(newAccidentDetail)


let newResultProcedureInfoDto: ResultProcedureInfoDto[] = [];

 // console.log('old procedure')
  // RequesetBody.xRefId  ='ccXwZWYmukJdvzFrWaccN8bNr83caECQjC+vvuEaIKY=';
  // RequesetBody.xTransactionNo  ='5c5aabb3-b919-4ee8-ac42-848ae4d5f55a';
  // RequesetBody.xVN ='O415202-67'
  const newQueryProcedeureDatabaseBodyDto ={
    RefId:RequesetBody.xRefId,
    TransactionNo:RequesetBody.xTransactionNo,
    InsurerCode:RequesetBody.xInsurerCode,
    HN:RequesetBody.xHN,
    VN:RequesetBody.xVN
  }
 
   const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto)
  // console.log('33333')
  if (getIPDDischargeProcedure && getIPDDischargeProcedure.Result.ProcedureInfo && getIPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
     newResultProcedureInfoDto= await Promise.all(
      getIPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
      return {
        Icd9: item.Icd9,
        ProcedureName: item.ProcedureName,
        ProcedureDate: item.ProcedureDate,
        
      };
    })
  );
} else {
 // console.log('4444')
  newResultProcedureInfoDto = [{
    Icd9: '',
    ProcedureName: '',
    ProcedureDate: '',
  }];
}


// console.log('*******')
// console.log(getOPDDischargeProcedure.Result)
// console.log('*******')
 //getOPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN); 


// //--> get Investigation  <--//
let newResultInvestigationInfoDto: ResultInvestigationInfoDto[] = [];
newResultInvestigationInfoDto = [{
  InvestigationCode: '',
  InvestigationGroup: '',
  InvestigationName: '',
  InvestigationResult: '',
  ResultDateTime: ''
}];
console.log('fix Investigation done')
// //--> get OrderItem  <--//
let newResultOrderItemInfoDto : ResultOrderItemInfoDto[] = [];
newResultOrderItemInfoDto = [{

  ItemId: '',
  ItemName: '',
  ItemAmount: '',
  Discount: '',
  Initial: '',
  LocalBillingCode: '',
  LocalBillingName: '',
  Location: '',
  NetAmount: '',
  SimbVersion: '',
  Terminology: ''
}];
console.log('fix OrderItem done')
// //--> get Doctor  <--//
let newResultDoctorInfoDto: ResultDoctorInfoDto[] = [];
newResultDoctorInfoDto = [{
  DoctorLicense: '0000000000',
  DoctorRole: '',
  DoctorFirstName: '',
  DoctorLastName: '',

}];
console.log('fix Doctor done')
// //console.log(newResultDoctorInfoDto)
//  // ResultBillingInfoDto ,ResultTotalBillAmountInfoDto
// //--> get Billing  <--//
/*
const getOPDDischargeBilling = [] //await this.trakcareService.getIPDBilling(RequesetBody.xVN); 
let newResultBillingInfoDto : ResultBillingInfoDto[] = [];
let  newTotalBillAmount ;
   if (getOPDDischargeBilling && getOPDDischargeBilling.BillingInfo && getOPDDischargeBilling.BillingInfo.length > 0) {
       newTotalBillAmount = getOPDDischargeBilling.TotalBillAmount
       console.log('----- newTotalBillAmount')
      // console.log(newTotalBillAmount)
      newResultBillingInfoDto= await Promise.all(
      getOPDDischargeBilling.BillingInfo.map(async (item) => {
      return {
        LocalBillingCode: item.LocalBillingCode,
        LocalBillingName: item.LocalBillingName,
        SimbBillingCode: item.SimbBillingCode,
        PayorBillingCode: item.PayorBillingCode,
        BillingInitial: item.BillingInitial,
        BillingDiscount: item.BillingDiscount,
        BillingNetAmount: item.BillingNetAmount,
      };
    })
  );
} else {
  newResultBillingInfoDto = [{

    LocalBillingCode: '',
    LocalBillingName: '',
    SimbBillingCode: '',
    PayorBillingCode: '',
    BillingInitial: '',
    BillingDiscount: '',
    BillingNetAmount: '',
   
  }];
  newTotalBillAmount=0
}
newResultBillingInfoDto = [{

  LocalBillingCode: '2.1.1',
  LocalBillingName: 'ค่าห้องผู้ป่วยใน',
  SimbBillingCode: '2.1.1',
  PayorBillingCode: '2.1.1',
  BillingInitial: '10000',
  BillingDiscount: '8000',
  BillingNetAmount: '2000',
 
}];
newTotalBillAmount=RequesetBody.
*/
// const newQueryPreBillingDatabaseBodyDto ={
//   RefId:RequesetBody.xRefId,
//   TransactionNo:RequesetBody.xTransactionNo,
//   InsurerCode:RequesetBody.xInsurerCode,
//   HN:RequesetBody.xHN,
//   VN:RequesetBody.xVN
// }

// const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryPreBillingDatabaseBodyDto)
/*const newResultBillingInfoDto = [{

  LocalBillingCode: '2.1.1',
  LocalBillingName: 'ค่าห้องผู้ป่วยใน',
  SimbBillingCode: '2.1.1',
  PayorBillingCode: '2.1.1',
  BillingInitial: '10000',
  BillingDiscount: '8000',
  BillingNetAmount: '2000',
 
}]; */
let newTotalBillAmount =''



let newResultBillingInfoDto : ResultBillingInfoDto[] = [];
const newQueryBillingInfoDtoDatabaseBodyDto ={
  RefId:RequesetBody.xRefId,
  TransactionNo:RequesetBody.xTransactionNo,
  InsurerCode:RequesetBody.xInsurerCode,
  HN:RequesetBody.xHN,
  VN:RequesetBody.xVN
}
const getPreBillingformDatabase = await this.utilsService.getPreBillingformDatabase(newQueryBillingInfoDtoDatabaseBodyDto)
if (getPreBillingformDatabase && getPreBillingformDatabase.Result.PreBillingInfo && getPreBillingformDatabase.Result.PreBillingInfo.length > 0) {
  newResultBillingInfoDto= await Promise.all(
    getPreBillingformDatabase.Result.PreBillingInfo.map(async (item) => {
       newTotalBillAmount = item.TotalBillAmount

    return {
      LocalBillingCode: item.LocalBillingCode,
      LocalBillingName: item.LocalBillingName,
      SimbBillingCode: item.SimbBillingCode,
      PayorBillingCode: item.PayorBillingCode,
      BillingDiscount: item.BillingDiscount,
      BillingInitial: item.BillingInitial,
      BillingNetAmount: item.BillingNetAmount,
      TotalBillAmount: item.TotalBillAmount,    
    };
  })
);
}else{
  newResultBillingInfoDto = [{
    LocalBillingCode: '',
    LocalBillingName: '',
    SimbBillingCode: '',
    PayorBillingCode: '',
    BillingInitial: '',
    BillingDiscount: '',
    BillingNetAmount: '',
  }];
}
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


let newResultPreAuthNoteDto: ResultPreAuthNoteDto[] = [];
newResultPreAuthNoteDto = [{
  PreAuthDatetime: '',
  PreAuthDetail: '',
 
}];
// //--> get AttachDocList  <--//
// console.log('------')

const QueryCreateClaimDocumentDtoBody={
  RefId:RequesetBody.xRefId,
  TransactionNo:RequesetBody.xTransactionNo,
  InsurerCode:13, //RequesetBody.xInsurerCode,
  HN:RequesetBody.xHN,
  VN:RequesetBody.xVN,
  DocumentName:'',
  DocumenttypeCode:'',
  UploadedBy:'',
  Runningdocument:0
}
console.log('-- QueryCreateClaimDocumentDtoBody ---')
//console.log(QueryCreateClaimDocumentDtoBody)


const getListDocumentByTransection = await this.utilsService.getListDocumentByTransactionNo(QueryCreateClaimDocumentDtoBody); 
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
const newIsPackage =newResultVisitInfoDto.IsPackage;
const newAnesthesiaList= [newResultVisitInfoDto.AnesthesiaList];
const newTotalEstimatedCost =newResultVisitInfoDto.TotalEstimatedCost;
//console.log(newResultBillingInfoDto)
let newResultDataJsonDto =new ResultDataJsonDto();
 newResultDataJsonDto ={
  Patient :newResultPatientInfoDto,
   Visit: newResultVisitInfoDto,
   VitalSign :newResultVitalSignInfoDto,
  Diagnosis :newQueryDiagnosisInfoDto,
  AccidentDetail:newAccidentDetail,
   Procedure :newResultProcedureInfoDto,
   AnesthesiaList:newAnesthesiaList,
   IsPackage:newIsPackage,
   Investigation :newResultInvestigationInfoDto,
   OrderItem :newResultOrderItemInfoDto,
  Doctor : newResultDoctorInfoDto,
  Billing :newResultBillingInfoDto,
  TotalEstimatedCost:newTotalEstimatedCost,
  TotalBillAmount:newTotalBillAmount,
   Pss: newResultPSSInfoDto,
   PreAuthNote: newResultPreAuthNoteDto
}

const newOPDDischargeResponseDto ={

  RefId: RequesetBody.xRefId ,
  TransactionNo:RequesetBody.xTransactionNo, 
  Username:AIA_APIHopitalUsername,
  HospitalCode:await this.utilsService.EncryptAESECB(AIA_APIHospitalCode,AIA_APISecretkey),
  InsurerCode: RequesetBody.xInsurerCode,
  ElectronicSignature: '',
  DataJsonType: "3",
  DataJson: newResultDataJsonDto,
  AttachDocList: newResultAttachDocListInfoDto

}
//const dummyDataRequest =new DummyDataRequest1();
//const newOPDDischargeResponseDto  =dummyDataRequest.PatientInfo
// DummyDataRequest1
console.log('=++++++++++=')
console.log(newOPDDischargeResponseDto.DataJson)
console.log('=++++++++++=')

 //////////////////////////////////////
      const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
       const ObjAccessTokenKey = ObjAccessToken.accessTokenKey
       const apiURL= `${AIA_APIURL}/SmartClaim/preauthSubmission`;

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
  console.log(responsefromAIA)

  const responeInputcode = responsefromAIA.Result.Code
  if (responeInputcode !=='S'){
    this.addFormatHTTPStatus(newHttpMessageDto,400,responsefromAIA.Result.MessageTh,responsefromAIA.Result.MessageTh)
  }else{

    let xInsuranceResult= new InsuranceResult();
    xInsuranceResult ={
     Code:responsefromAIA.Result.Code ||'',
     Message:responsefromAIA.Result.Message ||'',
     MessageTh:responsefromAIA.Result.MessageTh ||'',
    }
    let xInsuranceData= new InsuranceData();

    xInsuranceData ={
      RefId:responsefromAIA.Data.RefId ||'',
      TransactionNo:responsefromAIA.Data.TransactionNo ||'',
      InsurerCode:responsefromAIA.Data.InsurerCode ||'',

      Message:responsefromAIA.Data.Message ||'',
      MessageTh:responsefromAIA.Data.MessageTh ||'',
      ClaimNo:responsefromAIA.Data.ClaimNo ||'',
      OccurrenceNo:responsefromAIA.Data.OccurrenceNo ||'',
      TotalApprovedAmount:responsefromAIA.Data.TotalApprovedAmount ||'',
      TotalExcessAmount:responsefromAIA.Data.TotalExcessAmount ||'',
      IsReimbursement:Boolean(responsefromAIA.Data.IsReimbursement),
      CoverageList: responsefromAIA.Data.CoverageList 
      ? responsefromAIA.Data.CoverageList.map((Coverage) => ({
        type: Coverage.type || '',
        status: Boolean(Coverage.status), // แปลงค่าให้เป็น boolean เสมอ
      }))
    : [],

       MessageList: responsefromAIA.Data.MessageList 
       ? responsefromAIA.Data.MessageList.map((message) => (
        
        {
          
        policyNo: message.policyNo ?  this.utilsService.DecryptAESECB(message.policyNo, AIA_APISecretkey) :'' ,
        planName: message.planName || '',
        messageTh: message.messageTh || '',
        messageEn: message.messageEn || '',
       }))
     : [],
     }
xResultInfo ={
    InsuranceResult: xInsuranceResult,
    InsuranceData:xInsuranceData
  } 
 /// save to database
 const existingRecord = await prismaProgest.transactionclaim.findFirst({
  where: {
    refid: RequesetBody.xRefId,
    transactionno: RequesetBody.xTransactionNo,
  },
});
//const effectiveDate = new Date(RequesetBody.xVisitDateTime);
//const formattedEffectiveDate = effectiveDate.toISOString().split('T')[0];
const formattedEffectiveDate = RequesetBody.xVisitDateTime.split(' ')[0];

if (existingRecord) {

  await prismaProgest.transactionclaim.update({
    where: {
      id: existingRecord.id, // Use the ID of the existing record
    },
    data: {
      claimno:responsefromAIA.Data.ClaimNo,
      // claimstatuscode:'',
      // claimstatusdesc:'Approve',
      // claimstatusdesc_en:'Approve',
      // claimstatusdesc_th:'อนุมัติการเรียกร้องสินไหม',
      occurrenceno:responsefromAIA.Data.OccurrenceNo,
      invoicenumber:responsefromAIA.Data.InvoiceNumber,
      totalapprovedamount:responsefromAIA.Data.TotalApprovedAmount,
      totalexcessamount:responsefromAIA.Data.TotalExcessAmount,
      isreimbursement:responsefromAIA.Data.IsReimbursement,
      totalbillamount: newTotalBillAmount,
      insurerid: RequesetBody.xInsurerCode ,
      refid: RequesetBody.xRefId,
      transactionno: RequesetBody.xTransactionNo,
      hn:RequesetBody.xHN,
      vn:RequesetBody.xVN,
      visitdate:formattedEffectiveDate ,
      visitdatetime:RequesetBody.xVisitDateTime,
      accidentdate:RequesetBody.xAccidentDate,
      policytypecode:RequesetBody.xPolicyTypeCode,
      idtype:RequesetBody.xIdType,
      //illnesstypecode:RequesetBody.xIllnessTypeCode,
      servicesettingcode:RequesetBody.xServiceSettingCode,
      surgerytypecode:RequesetBody.xSurgeryTypeCode,
      runningdocument:RequesetBody.xRunningdocument
    },
  });
}else{
  
  await prismaProgest.transactionclaim.create({
    data: {
      insurerid: RequesetBody.xInsurerCode ,
      refid: RequesetBody.xRefId,
      transactionno: RequesetBody.xTransactionNo,
      hn:RequesetBody.xHN,
      vn:RequesetBody.xVN,
      visitdate:formattedEffectiveDate ,
      claimno:responsefromAIA.Data.ClaimNo,
      occurrenceno:responsefromAIA.Data.OccurrenceNo,
      invoicenumber:responsefromAIA.Data.InvoiceNumber,
      totalapprovedamount:responsefromAIA.Data.TotalApprovedAmount,
      totalexcessamount:responsefromAIA.Data.TotalExcessAmount,
      isreimbursement:responsefromAIA.Data.IsReimbursement,
      visitdatetime:RequesetBody.xVisitDateTime,
      accidentdate:RequesetBody.xAccidentDate,
      policytypecode:RequesetBody.xPolicyTypeCode,
      idtype:RequesetBody.xIdType,
      //illnesstypecode:RequesetBody.xIllnessTypeCode,
      servicesettingcode:RequesetBody.xServiceSettingCode,
      surgerytypecode:RequesetBody.xSurgeryTypeCode,
      runningdocument:RequesetBody.xRunningdocument
    },
  });

}


  this.addFormatHTTPStatus(newHttpMessageDto,200,'','')
  }
  let newResultSubmitIpdDischargeDto= new ResultSubmitPreAuthSubmissionDto();
  newResultSubmitIpdDischargeDto={
          HTTPStatus:newHttpMessageDto,
          Result:xResultInfo
    }

return newResultSubmitIpdDischargeDto
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

calculateDaysBetweenDates(startDate: string, endDate: string): number {
  
  const start = new Date(startDate.split(' ')[0]);
  const end = new Date(endDate.split(' ')[0]);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format. Please use a valid date string (e.g., 'YYYY-MM-DD').");
  }
  const differenceInMilliseconds = end.getTime() - start.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.ceil(differenceInDays) === 0 ? 1 : differenceInDays; //Math.ceil(differenceInDays); // ปัดขึ้นให้เป็นจำนวนเต็ม
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
