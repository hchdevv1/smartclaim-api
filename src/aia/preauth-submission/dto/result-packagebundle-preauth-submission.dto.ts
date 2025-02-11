import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultPackageBundleDto {

    HTTPStatus: HttpMessageDto;
    Result?: PackageBundleResultInfo;
 }
 
 export class PackageBundleResultInfo {
  @IsString()
  @IsOptional()
  PackageCode?: string;

  @IsString()
  @IsOptional()
  PackageDesc?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryPackageBundleBilling)
    @IsOptional()
    BillingInfo?: QueryPackageBundleBilling[];

  }


  export class QueryPackageBundleBilling{

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