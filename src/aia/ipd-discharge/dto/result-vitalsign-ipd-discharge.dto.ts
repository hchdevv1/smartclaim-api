import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultIPDVitalSignDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryVitalSign)
    @IsOptional()
    VitalSignInfo?: QueryVitalSign[];
  }


  export class QueryVitalSign{

    @IsString()
    @IsOptional()
    DiastolicBp?: string;

    @IsString()
    @IsOptional()
    HeartRate?: string;

    @IsString()
    @IsOptional()
    OxygenSaturation?: string;

    @IsString()
    @IsOptional()
    PainScore?: string;

    @IsString()
    @IsOptional()
    RespiratoryRate?: string;

    @IsString()
    @IsOptional()
    SystolicBp?: string;

    @IsString()
    @IsOptional()
    Temperature?: string;

    @IsString()
    @IsOptional()
    VitalSignEntryDateTime?: string;


  }