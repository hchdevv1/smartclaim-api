import { IsArray,  IsOptional,IsString,ValidateNested  } from 'class-validator';
import { Type  } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultBillingSubInfoDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BillingSubInfoDto)
    @IsOptional()
    BillingSubInfo?: BillingSubInfoDto[];

  }

   class BillingSubInfoDto {

    @IsString()
    @IsOptional()
    LocalBillingId: string; 

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

  }
