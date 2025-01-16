import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultIpdDischargeAccidentDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryAccident)
    @IsOptional()
    AccidentDetailInfo?: QueryAccident[];
  }


  export class QueryAccident{

    @IsString()
    @IsOptional()
    AccidentPlace?: string;

    @IsString()
    @IsOptional()
    AccidentDate?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryCauseOfInjuryDetail)
    @IsOptional()
    CauseOfInjuryDetail?: QueryCauseOfInjuryDetail[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryInjuryDetail)
    @IsOptional()
    InjuryDetail?: QueryInjuryDetail[];
  }

  export class QueryCauseOfInjuryDetail{

    @IsString()
    @IsOptional()
    CauseOfInjury?: string;

    @IsString()
    @IsOptional()
    CommentOfInjury?: string;


  }

  export class QueryInjuryDetail{

    @IsString()
    @IsOptional()
    WoundType?: string;

    @IsString()
    @IsOptional()
    InjurySide?: string;

    @IsString()
    @IsOptional()
    InjuryArea?: string;

  }