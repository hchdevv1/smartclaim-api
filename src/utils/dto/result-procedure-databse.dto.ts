import { IsInt ,IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from './http-status-message.dto';



export class QueryProcedeureDatabaseBodyDto {

    
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

export class ResultOpdDischargeProcedurDto {

    HTTPStatus: HttpMessageDto;
    Result?: ProcedeureDatabaseResultInfo;
 }
 
 export class ProcedeureDatabaseResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryProcedureDatabse)
    @IsOptional()
    ProcedureInfo?: QueryProcedureDatabse[];
  }


  export class QueryProcedureDatabse{

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



  export class ResultProcedureDatabaseInfoDto {
    Icd9: string; 
    ProcedureDate: string; 
    ProcedureName: string; 
  }