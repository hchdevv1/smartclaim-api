import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultAuthNoteDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryPreAuthNote)
    @IsOptional()
    PreAuthNoteList?: QueryPreAuthNote[];
  }


  export class QueryPreAuthNote{


    @IsString()
    @IsOptional()
    PreAuthDateTime?: string;

    @IsString()
    @IsOptional()
    PreAuthDetail?: string;

  

  }