import { IsNotEmpty, IsBoolean,IsNumber,IsArray,IsDate, IsInt, IsOptional, IsString,ValidateNested } from 'class-validator';

import { Type  } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class FindTransectionByVNBodyDto {
    PatientInfo?: FindPatientBodyDto
  }
  class FindPatientBodyDto{
    
    @IsInt()
    @IsOptional()
    InsurerCode:number

    @IsString()
    @IsOptional()
    RefID?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;

    @IsString()
    @IsOptional()
    PID?: string;

    @IsString()
    @IsOptional()
    PassportNumber?: string;

    @IsString()
    @IsOptional()
    IdType?: string;
    

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    StatusClaimCode?: string;

    @IsDate()
    @IsOptional()
    VisitDatefrom?: string;

    @IsDate()
    @IsOptional()
    VisitDateto?: string;

  }

  export class ResultTransactionClaimDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultTransactionClaimInfo;
 }
  export class ResultTransactionClaimInfo {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TransactionClaimInfo)
    @IsOptional() 
    TransactionClaimInfo?: TransactionClaimInfo[];

   

  }
   class TransactionClaimInfo{

    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;


    @IsString()
    @IsOptional()
    VisitDateTime?: string;

    @IsString()
    @IsNotEmpty()
    ClaimNo: string;

    @IsString()
    @IsOptional()
    ClaimStatusCode?: string;


    @IsString()
    @IsOptional()
    ClaimStatusDesc?: string;

    @IsString()
    @IsNotEmpty()
    OccurrenceNo: string;

    @IsNumber()
    @IsNotEmpty()
    TotalApprovedAmount: string;

    @IsString()
    @IsOptional()
    TotalExcessAmount?: string | null;

    @IsBoolean()
    IsReimbursement: boolean;

    @IsString()
    @IsOptional()
    BatchNumber?: string;


    @IsString()
    @IsOptional()
    InvoiceNumber?: string;



  }