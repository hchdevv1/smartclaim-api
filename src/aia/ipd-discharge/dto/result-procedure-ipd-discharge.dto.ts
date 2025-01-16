import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultIpdDischargeProcedurDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryProcedure)
    @IsOptional()
    ProcedureInfo?: QueryProcedure[];
  }


  export class QueryProcedure{

    @IsString()
    @IsOptional()
    Icd9?: string;

    @IsString()
    @IsOptional()
    ProcedureName?: string;

    @IsString()
    @IsOptional()
    ProcedureDate?: string;

  

  }