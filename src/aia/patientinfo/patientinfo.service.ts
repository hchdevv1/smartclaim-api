import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { prismaProgest } from '../../database/database';
import { Prisma } from '../../../prisma/generate-client-db';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { HttpStatusMessageService } from '../../utils/http-status-message/http-status-message.service';

import { TrakcareService } from '../../trakcare/trakcare.service';

import { PatientCreateDto ,CreateBodyDto,TransactionQueryPatientCreateDto} from './dto/create-patientinfo.dto';
import { PatientFindDto ,FindBodyDto ,FindPatientResultDto } from './dto/find-patientinfo.dto';
import { FindforUpdateDto ,FindforUpdatePatientDatabase ,FindforUpdatePatientTrakcare ,FindforUpdateBodyDto} from './dto/findforupdate-patientinfo.dto';
import { PatientSearchDto ,SearchBodyDto} from './dto/search-patientinfo.dto';
import { PatientUpdateDto ,UpdateBodyDto} from './dto/update-patientinfo.dto';

const httpStatusMessageService = new HttpStatusMessageService();

@Injectable()
export class PatientinfoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trakcareService: TrakcareService // Inject here
  ) {}

  async FindPatientTrakcare(findBodyDto : FindBodyDto){
    let RequesetBody;
    let TrakcarepatientInfo;
    let ResponeTrakcareHTTPStatus;
    try{
   RequesetBody ={
    xRefID:findBodyDto.PatientInfo.RefID||'',
    xTransactionNo:findBodyDto.PatientInfo.TransactionNo||'',
    xPID : findBodyDto.PatientInfo.PID||'',
    xPassportnumber : findBodyDto.PatientInfo.PassportNumber||'',
    xIdType:findBodyDto.PatientInfo.IdType||'',
    xStatusClaimCode:findBodyDto.PatientInfo.StatusClaimCode||'',
    xInsurerCode:findBodyDto.PatientInfo.InsurerCode||null,
    xHN :findBodyDto.PatientInfo.HN||'',
    xVN: findBodyDto.PatientInfo.VN||'',
    xVisitDatefrom:findBodyDto.PatientInfo.VisitDatefrom||'',
    xVisitDateto:findBodyDto.PatientInfo.VisitDateto||'',
  }
  //console.log(RequesetBody.xHN);
   if( RequesetBody.xIdType === "NATIONAL_ID"){
      TrakcarepatientInfo = await this.trakcareService.getPatientInfoByPID(RequesetBody.xPID);
   }else if( RequesetBody.xIdType  ==="HOSPITAL_ID"){
      TrakcarepatientInfo = await this.trakcareService.getPatientInfoByHN(RequesetBody.xHN);
  }else if( RequesetBody.xIdType  ==="PASSPORT_NO"){
      TrakcarepatientInfo = await this.trakcareService.getPatientInfoByPassportNumber(RequesetBody.xPassportnumber);
  }else{
      TrakcarepatientInfo = await this.trakcareService.getPatientInfoByHN(RequesetBody.xHN);
  }
  ResponeTrakcareHTTPStatus={
    xstatusCode :TrakcarepatientInfo.statusCode,
    xmessage :TrakcarepatientInfo.message,
    xerror :TrakcarepatientInfo.error
  }
  let newFindPatientResult =new FindPatientResultDto ();
  newFindPatientResult = {
  
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
  const newHttpMessageDto =new HttpMessageDto();
  this.addFormatHTTPStatus(newHttpMessageDto,ResponeTrakcareHTTPStatus.xstatusCode,ResponeTrakcareHTTPStatus.xmessage,ResponeTrakcareHTTPStatus.xerror)
  
  let newPatientfindDto= new PatientFindDto();
  newPatientfindDto={
    HTTPStatus:newHttpMessageDto,
    Result:{
      PatientInfo:newFindPatientResult
    }
  
  }
  
  return newPatientfindDto
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
  async create(createBodyDto:CreateBodyDto){
    let ResponeTrakcareHTTPStatus;
    let RequesetBody;
    try{
       RequesetBody ={
        national_id :createBodyDto.PatientInfo.PID,
        passportnumber: createBodyDto.PatientInfo.PassportNumber,
        hn: createBodyDto.PatientInfo.HN,
        title_th: createBodyDto.PatientInfo.TitleTH,
        givenname_th: createBodyDto.PatientInfo.GivenNameTH,
        surname_th: createBodyDto.PatientInfo.SurnameTH,
        title_en: createBodyDto.PatientInfo.TitleEN,
        givenname_en: createBodyDto.PatientInfo.GivenNameEN,
        surname_en: createBodyDto.PatientInfo.SurnameEN,
        mobilephone: createBodyDto.PatientInfo.MobilePhone,
        insurerid: +createBodyDto.PatientInfo.InsurerCode,
        statusactive: true,
        dateofbirth: createBodyDto.PatientInfo.DateOfBirth,
        gender: createBodyDto.PatientInfo.Gender,
        patientid: +createBodyDto.PatientInfo.PatientID,
      }
      console.log(RequesetBody)
      if(RequesetBody.pid ==='ต่างชาติ'){RequesetBody.pid = RequesetBody.hn}
  
      const result =await prismaProgest.claimants.create({  data: RequesetBody })
  
      console.log(result)
     
      let httpcode
      if(result) {
        httpcode =HttpStatus.CREATED
      }
      ResponeTrakcareHTTPStatus={
        
        xstatusCode :httpcode,
        xmessage :'User created successfully',
        xerror :''
      }
      const newHttpMessageDto =new HttpMessageDto();
      this.addFormatHTTPStatus(newHttpMessageDto,ResponeTrakcareHTTPStatus.xstatusCode,ResponeTrakcareHTTPStatus.xmessage,ResponeTrakcareHTTPStatus.xerror)
      const newTransactionQueryPatientCreateDto =new TransactionQueryPatientCreateDto();
    this.addFormatTransactionPatientCreateDto(newTransactionQueryPatientCreateDto, 
      RequesetBody.insurerid,RequesetBody.patientid,RequesetBody.pid,
      RequesetBody.passportnumber,RequesetBody.hn,
      RequesetBody.title_th,RequesetBody.givenname_th,RequesetBody.surname_th,
      RequesetBody.title_en,RequesetBody.givenname_en,RequesetBody.surname_en,
      RequesetBody.dateofbirth,RequesetBody.gender,RequesetBody.mobilephone
    )
     
      let newPatientCreateDto= new PatientCreateDto();
      newPatientCreateDto={
        HTTPStatus:newHttpMessageDto,
         Result:{
          PatientInfo:newTransactionQueryPatientCreateDto
           }
        }
      return newPatientCreateDto
    }catch(error)
    {
     // console.log(error)
     console.log(error.code)
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
  async PatientSearch(searchBodyDto:SearchBodyDto){
    let RequesetBody;
    let ResponeTrakcareHTTPStatus;
    try{
      RequesetBody ={
        xRefID:searchBodyDto.PatientInfo.RefID||'',
        xTransactionNo:searchBodyDto.PatientInfo.TransactionNo||'',
        xPID : searchBodyDto.PatientInfo.PID||'',
        xPassportnumber : searchBodyDto.PatientInfo.PassportNumber||'',
        xIdType:searchBodyDto.PatientInfo.IdType||'',
        xStatusClaimCode:searchBodyDto.PatientInfo.StatusClaimCode||'',
        xInsurerCode:searchBodyDto.PatientInfo.InsurerCode||null,
        xHN :searchBodyDto.PatientInfo.HN||'',
        xVN: searchBodyDto.PatientInfo.VN||'',
        xVisitDatefrom:searchBodyDto.PatientInfo.VisitDatefrom||'',
        xVisitDateto:searchBodyDto.PatientInfo.VisitDateto||'',
      }
      console.log('----')
      let  results
      if( searchBodyDto.PatientInfo.IdType === "NATIONAL_ID"){
      
        results = await prismaProgest.claimants.findMany({
      where: {
        
          national_id: searchBodyDto.PatientInfo.PID
        
      },
    })
    
     }else if( searchBodyDto.PatientInfo.IdType ==="HOSPITAL_ID"){
      results = await prismaProgest.claimants.findMany({
        where: {
            hn: searchBodyDto.PatientInfo.HN
        },
      })
    }else if( searchBodyDto.PatientInfo.IdType ==="PASSPORT_NO"){
      results = await prismaProgest.claimants.findMany({
        where: {
            passportnumber: searchBodyDto.PatientInfo.PassportNumber
        },
      })
    }else{
      results = await prismaProgest.claimants.findMany({
        where: {
          
            hn: RequesetBody.xHN,
            insurerid:13
           //insurerid : RequesetBody.xInsurerCode
          
        },})
    }

    const patientInfoArray = results.map((result) => ({
        PID: result.pid,
        HN: result.hn,
        PassportNumber:result.passportnumber,
        TitleTH: result.title_th,
        GivenNameTH: result.givenname_th,
        SurnameTH: result.surname_th,
        TitleEN: result.title_en,
        GivenNameEN: result.givenname_en,
        SurnameEN: result.surname_en,
        MobilePhone: result.mobilephone,
        DateOfBirth: result.dateofbirth,
        Gender: result.gender,
      }));
      let httpcode,xmessageReturn
      if((results)&&(results.length>0)) {
        httpcode =HttpStatus.OK
        xmessageReturn = 'User search completed successfully'
      }else{
        httpcode =HttpStatus.BAD_REQUEST
        xmessageReturn = 'Not Found.'
      }
      //console.log(httpcode)
      //console.log(xmessageReturn)
      ResponeTrakcareHTTPStatus={
        xstatusCode :httpcode,
        xmessage :xmessageReturn,
        xerror :''
      }
      const newHttpMessageDto =new HttpMessageDto();
      this.addFormatHTTPStatus(newHttpMessageDto,ResponeTrakcareHTTPStatus.xstatusCode,ResponeTrakcareHTTPStatus.xmessage,ResponeTrakcareHTTPStatus.xerror)
      let newPatientSearchDto= new PatientSearchDto();
      newPatientSearchDto={
          HTTPStatus:newHttpMessageDto,
          Result:{ PatientInfo:patientInfoArray }
    
  }
  
  return newPatientSearchDto;
  
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
  async FindforUpdate(findforUpdateBodyDto:FindforUpdateBodyDto){
    let RequesetBody;
    let TrakcarepatientInfo;
    let ResponeTrakcareHTTPStatus;
    try {
      RequesetBody ={
        xRefID:findforUpdateBodyDto.PatientInfo.RefID||'',
        xTransactionNo:findforUpdateBodyDto.PatientInfo.TransactionNo||'',
        xPID : findforUpdateBodyDto.PatientInfo.PID||'',
        xPassportnumber : findforUpdateBodyDto.PatientInfo.PassportNumber||'',
        xIdType:findforUpdateBodyDto.PatientInfo.IdType||'',
        xStatusClaimCode:findforUpdateBodyDto.PatientInfo.StatusClaimCode||'',
        xInsurerCode:findforUpdateBodyDto.PatientInfo.InsurerCode||null,
        xHN :findforUpdateBodyDto.PatientInfo.HN||'',
        xVN: findforUpdateBodyDto.PatientInfo.VN||'',
        xVisitDatefrom:findforUpdateBodyDto.PatientInfo.VisitDatefrom||'',
        xVisitDateto:findforUpdateBodyDto.PatientInfo.VisitDateto||'',
      }
      if (RequesetBody.xHN){
        TrakcarepatientInfo = await this.trakcareService.getPatientInfoByHN(RequesetBody.xHN);
      }
      ResponeTrakcareHTTPStatus={
        xstatusCode :TrakcarepatientInfo.statusCode,
        xmessage :TrakcarepatientInfo.message,
        xerror :TrakcarepatientInfo.error
      }
      let newFindforUpdatePatientTrakcare =new FindforUpdatePatientTrakcare ();
      newFindforUpdatePatientTrakcare = {
  
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
    const DatabasePatientInfo = await prismaProgest.claimants.findUnique({
      where: {
        hn_insurerid :{
          hn : findforUpdateBodyDto.PatientInfo.HN,
          insurerid:findforUpdateBodyDto.PatientInfo.InsurerCode
        }
        
        //pid: findforUpdateBodyDto.PatientInfo.PID,
      },select:{
        insurerid:true,
        national_id:true,
        passportnumber:true,
        hn:true,
        title_th:true,
        givenname_th:true,
        surname_th:true,
        title_en:true,
        givenname_en:true,
        surname_en:true,
        mobilephone:true,
        dateofbirth:true,
        gender:true,
        patientid:true,
        statusactive:true
      }
    })
    console.log(DatabasePatientInfo)
    let newFindforUpdatePatientDatabase = new FindforUpdatePatientDatabase();
    if (DatabasePatientInfo){
    newFindforUpdatePatientDatabase = {
  
      PatientID: DatabasePatientInfo.patientid,
      PID: DatabasePatientInfo.national_id,
      PassportNumber: DatabasePatientInfo.passportnumber,
      HN:DatabasePatientInfo.hn,
      TitleTH:DatabasePatientInfo.title_th,
      GivenNameTH: DatabasePatientInfo.givenname_th,
      SurnameTH: DatabasePatientInfo.surname_th,
      TitleEN:DatabasePatientInfo.title_en,
      GivenNameEN:DatabasePatientInfo.givenname_en,
      SurnameEN:DatabasePatientInfo.surname_en,
      DateOfBirth: DatabasePatientInfo.dateofbirth,
      Gender:  DatabasePatientInfo.gender,
      MobilePhone: DatabasePatientInfo.mobilephone
    
    }
  }
      const newHttpMessageDto =new HttpMessageDto();
      this.addFormatHTTPStatus(newHttpMessageDto,ResponeTrakcareHTTPStatus.xstatusCode,ResponeTrakcareHTTPStatus.xmessage,ResponeTrakcareHTTPStatus.xerror)
      
    let newFindforUpdateDto= new FindforUpdateDto();
    newFindforUpdateDto={
    HTTPStatus:newHttpMessageDto,
    Result:{
     PatientInfo:{
      PatientDatabase:newFindforUpdatePatientDatabase,
      PatientTrakcare:newFindforUpdatePatientTrakcare
     }
    }
  
  }
      return newFindforUpdateDto
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
  async updatePatientInfoByHN(updateBodyDto:UpdateBodyDto){
    let ResponeTrakcareHTTPStatus;
   
      try {
        const xHN= updateBodyDto.PatientInfo.HN
        const xInsurerCode = updateBodyDto.PatientInfo.InsurerCode
        if ((xHN)&&(xInsurerCode)){
        const PostUpdatePatient ={
          national_id: updateBodyDto.PatientInfo.PID|| undefined,
          insurerid:updateBodyDto.PatientInfo.InsurerCode,
          hn: updateBodyDto.PatientInfo.HN|| undefined,
          passportnumber: updateBodyDto.PatientInfo.PassportNumber|| undefined,
          title_th: updateBodyDto.PatientInfo.TitleTH|| undefined,
          givenname_th: updateBodyDto.PatientInfo.GivenNameTH|| undefined,
          surname_th: updateBodyDto.PatientInfo.SurnameTH|| undefined,
          title_en: updateBodyDto.PatientInfo.TitleEN|| undefined,
          givenname_en: updateBodyDto.PatientInfo.GivenNameEN|| undefined,
          surname_en: updateBodyDto.PatientInfo.SurnameEN|| undefined,
          mobilephone: updateBodyDto.PatientInfo.MobilePhone|| undefined,
          dateofbirth: updateBodyDto.PatientInfo.DateOfBirth|| undefined,
          gender: updateBodyDto.PatientInfo.Gender|| undefined,
          statusactive:true //updateBodyDto.PatientInfo.StatusActive|| undefined,
        }
        console.log('--1--')
        console.log(PostUpdatePatient)
        console.log(updateBodyDto.PatientInfo.HN)
        console.log(updateBodyDto.PatientInfo.InsurerCode)
        const filteredData = Object.fromEntries(
          Object.entries(PostUpdatePatient).filter(([, value]) => value !== null && value !== undefined)
        );
        console.log(filteredData)
      console.log('---2-')
        const result = await prismaProgest.claimants.update({
          where: {
            hn_insurerid: {
              hn:updateBodyDto.PatientInfo.HN,
              insurerid: updateBodyDto.PatientInfo.InsurerCode, // ตัวอย่างค่า insurerid
            },
          },data: filteredData
        })
      console.log(result)
      console.log('---3---')

      let httpcode
          if(result) {
            httpcode =HttpStatus.OK
          }
          ResponeTrakcareHTTPStatus={
            xstatusCode :httpcode,
            xmessage :'User update successfully',
            xerror :''
          }
          const newHttpMessageDto =new HttpMessageDto();
          this.addFormatHTTPStatus(newHttpMessageDto,ResponeTrakcareHTTPStatus.xstatusCode,ResponeTrakcareHTTPStatus.xmessage,ResponeTrakcareHTTPStatus.xerror)
          const resultupdate = await prismaProgest.claimants.findUnique({
            where: {
             // pid: xPID,
              hn_insurerid :{
                hn : updateBodyDto.PatientInfo.HN,
                insurerid:updateBodyDto.PatientInfo.InsurerCode
              }
            },select:{
              insurerid:true,
              national_id:true,
              passportnumber:true,
              hn:true,
              title_th:true,
              givenname_th:true,
              surname_th:true,
              title_en:true,
              givenname_en:true,
              surname_en:true,
              mobilephone:true,
              dateofbirth:true,
              gender:true,
              patientid:true,
              statusactive:true
            }
          })
          const RequesetBody ={
            PID :resultupdate.national_id,
            PassportNumber: resultupdate.passportnumber,
            HN: resultupdate.hn,
            TitleTH: resultupdate.title_th,
            GivenNameTH: resultupdate.givenname_th,
            SurnameTH: resultupdate.surname_th,
            title_en: resultupdate.title_en,
            GivenNameEN: resultupdate.givenname_en,
            SurnameEN: resultupdate.surname_en,
            MobilePhone: resultupdate.mobilephone,
            InsurerCode: +resultupdate.insurerid,
            //statusactive: resultupdate.statusactive,
            DateOfBirth: resultupdate.dateofbirth,
            Gender: resultupdate.gender,
            PatientID: resultupdate.patientid,
          }
          const newTransactionQueryPatientCreateDto =new TransactionQueryPatientCreateDto();
          this.addFormatTransactionPatientCreateDto(newTransactionQueryPatientCreateDto, 
            resultupdate.insurerid,resultupdate.patientid,resultupdate.national_id,
            resultupdate.passportnumber,resultupdate.hn,
            resultupdate.title_th,resultupdate.givenname_th,resultupdate.surname_th,
            resultupdate.title_en,resultupdate.givenname_en,resultupdate.surname_en,
            resultupdate.dateofbirth,resultupdate.gender,resultupdate.mobilephone
          )
          let newPatientUpdateDto= new PatientUpdateDto();
          newPatientUpdateDto={
            HTTPStatus:newHttpMessageDto,
             Result:{
               PatientInfo:RequesetBody
               }
            }
          return newPatientUpdateDto
        }
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
      
  addFormatTransactionPatientCreateDto(data: TransactionQueryPatientCreateDto,
    inputInsurerCode:number,inputPatientID:number,inputPID:string,
    inputPassportNumber:string,inputHN:string,
    inputTitleTH:string,inputGivenNameTH:string,inputSurnameTH:string,
    inputTitleEN:string,inputGivenNameEN:string,inputSurnameEN:string,
    inputDateOfBirth:string,inputGender :string ,inputMobilePhone:string):void{
    if(data){
  
      data.InsurerCode = inputInsurerCode||null
      data.PatientID = inputPatientID||null
      data.PID = inputPID||''
      data.PassportNumber = inputPassportNumber ||''
      data.HN = inputHN||''
  
      data.TitleTH = inputTitleTH||''
      data.GivenNameTH = inputGivenNameTH||''
      data.SurnameTH= inputSurnameTH||''
  
      data.TitleEN = inputTitleEN||''
      data.GivenNameEN = inputGivenNameEN||''
      data.SurnameEN= inputSurnameEN||''
      data.DateOfBirth = inputDateOfBirth||''
      data.Gender = inputGender||null
      data.MobilePhone = inputMobilePhone||null
     
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