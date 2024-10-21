import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultOpdDischargeInvestigationDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryInvestigation)
    @IsOptional()
    InvestigationInfo?: QueryInvestigation[];
  }


  export class QueryInvestigation{

    @IsString()
    @IsOptional()
    InvestigationCode?: string;

    @IsString()
    @IsOptional()
    InvestigationGroup?: string;

    @IsString()
    @IsOptional()
    InvestigationName?: string;

    @IsString()
    @IsOptional()
    InvestigationResult?: string;

    @IsString()
    @IsOptional()
    ResultDateTime?: string;

  }