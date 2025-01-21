import { IsArray,IsInt, IsBoolean,IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class QueryPreBillingDto {
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

    @IsBoolean()
    HavePreBilling: boolean;

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

  export class ResultSubmitPreBillingDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
class ResultInfo{

  @IsBoolean()
  HavePreBilling: boolean;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryPreBilling)
    @IsOptional()
    PreBillingInfo?: QueryPreBilling[];


}