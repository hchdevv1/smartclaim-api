import { IsInt ,IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from './http-status-message.dto';



export class QueryPreBillingDatabaseBodyDto {

    
    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;

    @IsInt()
    @IsOptional()
    InsurerCode:number

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;
    
  }

export class ResultPreBillingDto {

    HTTPStatus: HttpMessageDto;
    Result?: PreBillingDatabaseResultInfo;
 }
 
 export class PreBillingDatabaseResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryPreBillingDatabse)
    @IsOptional()
    PreBillingInfo?: QueryPreBillingDatabse[];
  }


  export class QueryPreBillingDatabse{

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




  export class ResultPreBillingDatabaseInfoDto {

    LocalBillingCode?: string;

    LocalBillingName?: string;

    SimbBillingCode?: string;

    PayorBillingCode?: string;

    BillingInitial?: string;
    
    BillingDiscount?: string;
  
    BillingNetAmount?: string;
   
    TotalBillAmount?: string;

  }