import { IsInt ,IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from './http-status-message.dto';



export class QueryConcurNoteDatabaseBodyDto {

    
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

export class ResultConcurNoteDto {

    HTTPStatus: HttpMessageDto;
    Result?:  ConcurNoteDatabaseResultInfo;
 }
 
 export class ConcurNoteDatabaseResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryConcurNoteDatabse)
    @IsOptional()
    ConcurNoteList?: QueryConcurNoteDatabse[];
  }


  export class QueryConcurNoteDatabse{


    @IsString()
    @IsOptional()
    ConcurrentDatetime?: string;

    @IsString()
    @IsOptional()
    ConcurrentDetail?: string;
  }



  export class ResultConcurNoteDatabaseInfoDto {
    ConcurrentDatetime: string; 
    ConcurrentDetail: string; 
  }