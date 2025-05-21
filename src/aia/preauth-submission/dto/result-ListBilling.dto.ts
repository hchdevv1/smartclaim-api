import { IsArray,  IsOptional,IsString,ValidateNested  } from 'class-validator';
import { Type  } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultlistBillingDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemBillingCheckBalanceInfoDto)
    @IsOptional()
    ItemBillingCheckBalance?: ItemBillingCheckBalanceInfoDto[];

  }

   class ItemBillingCheckBalanceInfoDto {

    @IsString()
    @IsOptional()
    LocalBillingCode: string; 

    @IsString()
    @IsOptional()
    LocalBillingName: string; 

    @IsString()
    @IsOptional()
    SimbBillingCode: string; 

    @IsString()
    @IsOptional()
    PayorBillingCode: string; 

    @IsString()
    @IsOptional()
    BillingInitial: string; 

    @IsString()
    @IsOptional()
    BillingDiscount: string; 

    @IsString()
    @IsOptional()
    BillingNetAmount: string; 

    @IsString()
    @IsOptional()
    ItemCode: string; 

    @IsString()
    @IsOptional()
    ItemName: string; 

    @IsString()
    @IsOptional()
    ItemAmount: string; 

    @IsString()
    @IsOptional()
    Discount: string; 

    @IsString()
    @IsOptional()
    ItemUnitPrice: string; 

    @IsString()
    @IsOptional()
    netamt: string; 

    @IsString()
    @IsOptional()
    SimbVersion: string; 

    @IsString()
    @IsOptional()
    Terminology: string; 
  }
