import { IsArray,IsInt, IsBoolean,IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class QueryConcurNoteDto {
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
    HaveConcurNote: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryConcurNote)
    @IsOptional()
    ConcurNoteInfo?: QueryConcurNote[];
  }
   class QueryConcurNote{

    @IsString()
    @IsOptional()
    ConcurrentDatetime?: string;

    @IsString()
    @IsOptional()
    ConcurrentDetail?: string;

  }

  export class ResultSubmitConcurNoteDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
class ResultInfo{

  @IsBoolean()
  HaveConcurNote: boolean;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryConcurNote)
    @IsOptional()
    ConcurNoteInfo?: QueryConcurNote[];


}