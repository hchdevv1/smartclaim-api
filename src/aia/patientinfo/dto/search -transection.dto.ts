import { IsArray,IsBoolean ,IsNumber,IsDate, IsInt, IsOptional, IsString ,IsNotEmpty ,ValidateNested} from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
import { Type  } from 'class-transformer';

export class QuerySearchTransection {
    PatientInfo?: SearchTransectionDto
  }
  class SearchTransectionDto{

    @IsInt()
    @IsOptional()
    InsurerCode:number


    @IsString()
    @IsOptional()
    PID?: string;

    @IsString()
    @IsOptional()
    PassportNumber?: string;

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    InvoiceNumber?: string;

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
    Result?: ResultTransactionInfo;
 }
 
  export class ResultTransactionInfo{
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
    PID?: string;

    @IsString()
    @IsOptional()
    PassportNumber?: string;
    @IsString()
    @IsOptional()
    TitleTH?: string;

    @IsString()
    @IsOptional()
    GivenNameTH?: string;

    @IsString()
    @IsOptional()
    SurnameTH?: string;
    

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;


    @IsString()
    @IsOptional()
    VisitDate?: string;

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