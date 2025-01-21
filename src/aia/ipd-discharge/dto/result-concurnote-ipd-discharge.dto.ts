import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultConcurNoteDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryConcurNote)
    @IsOptional()
    ConcurNoteList?: QueryConcurNote[];
  }


  export class QueryConcurNote{


    @IsString()
    @IsOptional()
    ConcurrentDatetime?: string;

    @IsString()
    @IsOptional()
    ConcurrentDetail?: string;

  

  }