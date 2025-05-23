import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultIpdDischargeBillingDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryBilling)
    @IsOptional()
    BillingInfo?: QueryBilling[];

    @IsString()
    @IsOptional()
    TotalBillAmount?: string;

    @IsString()
    @IsOptional()
    InvoiceNumber?: string;

  }


  export class QueryBilling{

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

  }