import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultIpdDischargeDiagnosisDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryDiagnosis)
    @IsOptional()
    DiagnosisInfo?: QueryDiagnosis[];
  }


  export class QueryDiagnosis{

    @IsString()
    @IsOptional()
    DxTypeCode?: string;

    @IsString()
    @IsOptional()
    DxCode?: string;

    @IsString()
    @IsOptional()
    DxName?: string;

    @IsString()
    @IsOptional()
    Dxtypenametrakcare?: string;

    @IsString()
    @IsOptional()
    Dxtypecodeinsurance?: string;

    @IsString()
    @IsOptional()
    Dxtypenameinsurance?: string;
  }