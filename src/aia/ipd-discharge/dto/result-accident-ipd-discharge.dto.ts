import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultIpdDischargeAccidentDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryAccident)
    @IsOptional()
    AccidentDetailInfo?: QueryAccident[];
  }


  export class QueryAccident{

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

  export class QueryCauseOfInjuryDetail{

    @IsString()
    @IsOptional()
    CauseOfInjury?: string;

    @IsString()
    @IsOptional()
    CommentOfInjury?: string;


  }

  export class QueryInjuryDetail{

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

  export class AccidentDetailDto {
    @IsString()
    @IsOptional()
    AccidentPlace?: string;
  
    @IsString()
    @IsOptional()
    AccidentDate?: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CauseOfInjuryDetail)
    CauseOfInjuryDetail: CauseOfInjuryDetail[]; // รายละเอียดเกี่ยวกับสาเหตุการบาดเจ็บ (ต้องไม่ใช้ @IsOptional)
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InjuryDetail)
    @IsOptional()
    InjuryDetail?: InjuryDetail[]; // รายละเอียดเกี่ยวกับบาดแผล
  }

export class CauseOfInjuryDetail {
  @IsString()
  @IsOptional()
  CauseOfInjury?: string; // สาเหตุของการบาดเจ็บ

  @IsString()
  @IsOptional()
  CommentOfInjury?: string; // ความคิดเห็นเกี่ยวกับการบาดเจ็บ
}
  export class InjuryDetail {
    @IsString()
    @IsOptional()
    WoundType?: string; // ประเภทของบาดแผล
  
    @IsString()
    @IsOptional()
    InjurySide?: string; // ด้านของบาดแผล
  
    @IsString()
    @IsOptional()
    InjuryArea?: string; // พื้นที่ของบาดแผล
  }