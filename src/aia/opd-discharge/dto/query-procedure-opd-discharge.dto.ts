import { IsArray,IsInt, IsOptional,IsBoolean, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class QueryProcedureDto {
    PatientInfo?: SearchPatientBodyDto
  }
   class SearchPatientBodyDto {
    
    @IsInt()
    @IsOptional()
    InsurerCode:number

    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsBoolean()
    HaveProcedure: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryProcedure)
    @IsOptional()
    ProcedureInfo?: QueryProcedure[];
  }
   class QueryProcedure{

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

  export class ResultSubmitProcedureDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
class ResultInfo{

    @IsBoolean()
    HaveProcedure: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryProcedure)
    @IsOptional()
    ProcedureInfo?: QueryProcedure[];


}