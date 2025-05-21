import { IsArray,IsInt ,IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';


export class SubmitPreBillingDto {
    PatientInfo?: SearchPatientBodyDto
  }
   class SearchPatientBodyDto {
    
    @IsInt()
    @IsOptional()
    InsurerCode:number

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


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryPreBilling)
    @IsOptional()
    PreBillingInfo?: QueryPreBilling[];
  }
   class QueryPreBilling{

    @IsString()
    @IsOptional()
    LocalBillingCode?: string;

    @IsString()
    @IsOptional()
    LocalBillingName?: string;

    @IsString()
    @IsOptional()
    SimbBillingCode?: string;

    @IsString()
    @IsOptional()
    PayorBillingCode?: string;

    @IsString()
    @IsOptional()
    BillingInitial?: string;
    @IsString()
    @IsOptional()
    BillingDiscount?: string;
    @IsString()
    @IsOptional()
    BillingNetAmount?: string;
    @IsString()
    @IsOptional()
    TotalBillAmount?: string;
  }
