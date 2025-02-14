import { IsArray,IsInt, IsOptional,IsBoolean, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class QueryDiagnosisDto {
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
    HaveDiagnosis: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryDiagnosis)
    @IsOptional()
    DiagnosisInfo?: QueryDiagnosis[];
  }
   class QueryDiagnosis{

    @IsString()
    @IsOptional()
    DxName?: string;

    @IsString()
    @IsOptional()
    DxType?: string;

    @IsString()
    @IsOptional()
    DxCode?: string;

  }

  export class ResultSubmitDiagnosisDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
class ResultInfo{

    @IsBoolean()
    HaveDiagnosis: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryDiagnosis)
    @IsOptional()
    DiagnosisInfo?: QueryDiagnosis[];


}