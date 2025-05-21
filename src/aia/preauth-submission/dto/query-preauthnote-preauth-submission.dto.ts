import { IsArray,IsInt, IsBoolean,IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class QueryPreAuthNoteDto {
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
    HavePreAuthNote: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryPreAuthNote)
    @IsOptional()
    PreAuthNoteInfo?: QueryPreAuthNote[];
  }
   class QueryPreAuthNote{

    @IsString()
    @IsOptional()
    PreAuthDatetime?: string;

    @IsString()
    @IsOptional()
    PreAuthDetail?: string;

  }

  export class ResultSubmitPreAuthNoteDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
class ResultInfo{

  @IsBoolean()
  HavePreAuthNote: boolean;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryPreAuthNote)
    @IsOptional()
    PreAuthNoteInfo?: QueryPreAuthNote[];


}