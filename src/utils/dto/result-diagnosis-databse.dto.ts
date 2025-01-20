import { IsInt ,IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from './http-status-message.dto';



export class QueryDiagnosisDatabaseBodyDto {

    
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

export class ResultPreDiagnosisDto {

    HTTPStatus: HttpMessageDto;
    Result?: PreDiagnosisDatabaseResultInfo;
 }
 
 export class PreDiagnosisDatabaseResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryPreDiagnosisDatabse)
    @IsOptional()
    DiagnosisInfo?: QueryPreDiagnosisDatabse[];
  }


  export class QueryPreDiagnosisDatabse{

    @IsString()
    @IsOptional()
    Icd10?: string;

    @IsString()
    @IsOptional()
    DxName?: string;

    @IsString()
    @IsOptional()
    DxType?: string;
  }



  export class ResultPreDiagnosisDatabaseInfoDto {
    Icd10: string; 
    DxName: string; 
    DxType: string; 
  }