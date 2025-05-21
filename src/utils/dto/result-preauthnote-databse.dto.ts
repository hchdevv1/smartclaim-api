import { IsInt ,IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from './http-status-message.dto';



export class QueryPreAuthNoteDatabaseBodyDto {

    
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

export class ResultPreAuthNoteDto {

    HTTPStatus: HttpMessageDto;
    Result?:  PreAuthNoteDatabaseResultInfo;
 }
 
 export class PreAuthNoteDatabaseResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryPreAuthNoteDatabse)
    @IsOptional()
    PreAuthNote?: QueryPreAuthNoteDatabse[];
  }


  export class QueryPreAuthNoteDatabse{


    @IsString()
    @IsOptional()
    PreAuthDateTime?: string;

    @IsString()
    @IsOptional()
    PreAuthDetail?: string;
  }



  export class ResultPreAuthNoteDatabaseInfoDto {
    PreAuthDateTime: string; 
    PreAuthDetail: string; 
  }