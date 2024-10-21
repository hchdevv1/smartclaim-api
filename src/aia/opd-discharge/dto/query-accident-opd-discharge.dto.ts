import { IsArray,IsInt, IsOptional,IsBoolean, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class QueryAccident {
    @IsString()
    @IsOptional()
    AccidentPlace?: string;
  
    @IsString()
    @IsOptional()
    AccidentDate?: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryCauseOfInjuryDetail)
    @IsOptional()
    CauseOfInjuryDetail?: QueryCauseOfInjuryDetail[];
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryInjuryDetail)
    @IsOptional()
    InjuryDetail?: QueryInjuryDetail[];
  }
  
  class QueryCauseOfInjuryDetail {
    @IsString()
    @IsOptional()
    CauseOfInjury?: string;
  
    @IsString()
    @IsOptional()
    CommentOfInjury?: string;
  }
  
  class QueryInjuryDetail {
    @IsString()
    @IsOptional()
    WoundType?: string;
  
    @IsString()
    @IsOptional()
    InjurySide?: string;
  
    @IsString()
    @IsOptional()
    InjuryArea?: string;
  }
  
  export class QueryAccidentDto {
    PatientInfo?: SearchPatientBodyDto;
  }
  
  class SearchPatientBodyDto {
    @IsInt()
    @IsOptional()
    InsurerCode?: number;
  
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
    @IsOptional()
    HaveAccidentCauseOfInjuryDetail?: boolean;
  
    @IsBoolean()
    @IsOptional()
    HaveAccidentInjuryDetail?: boolean;
  
    // เปลี่ยนจาก array เป็น object
    @ValidateNested()
    @Type(() => QueryAccident)
    @IsOptional()
    AccidentDetailInfo?: QueryAccident; 
  }
  

  export class ResultSubmitAccidentDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
class ResultInfo{

    @IsBoolean()
    HaveProcedure: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryAccident)
    @IsOptional()
    AccidentDetailInfo?: QueryAccident[];


}