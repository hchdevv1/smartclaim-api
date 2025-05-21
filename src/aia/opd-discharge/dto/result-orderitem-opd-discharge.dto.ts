import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultOpdDischargeOrderItemDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryOrderItem)
    @IsOptional()
    OrderItemInfo?: QueryOrderItem[];
  }


  export class QueryOrderItem{

    @IsString()
    @IsOptional()
    ItemId?: string;

    @IsString()
    @IsOptional()
    ItemName?: string;

    @IsString()
    @IsOptional()
    ItemAmount?: string;

    @IsString()
    @IsOptional()
    Discount?: string;

    @IsString()
    @IsOptional()
    Initial?: string;

    @IsString()
    @IsOptional()
    LocalBillingCode?: string;

    @IsString()
    @IsOptional()
    LocalBillingName?: string;

    @IsString()
    @IsOptional()
    Location?: string;

    @IsString()
    @IsOptional()
    NetAmount?: string;

    @IsString()
    @IsOptional()
    SimbVersion?: string;

    @IsString()
    @IsOptional()
    Terminology?: string;

  }