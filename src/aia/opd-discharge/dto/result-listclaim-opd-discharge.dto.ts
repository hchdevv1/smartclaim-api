import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultClaimFormListDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryClaimFormListInfo)
    @IsOptional()
    ClaimFormListInfo?: QueryClaimFormListInfo[];
  }


  export class QueryClaimFormListInfo{

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    VisitDate?: string;

    @IsString()
    @IsOptional()
    DoctorFirstName?: string;

    @IsString()
    @IsOptional()
    PresentIllness?: string;

    @IsString()
    @IsOptional()
    InsuranceNote?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DiagnosisInfo)
    @IsOptional()
    DiagnosisInfo?: DiagnosisInfo[];
  }


 export class QueryClaimDiagnosisInfo {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiagnosisInfo)
  @IsOptional()
  DiagnosisInfo?: DiagnosisInfo[];
}


 class DiagnosisInfo{

  @IsString()
  @IsOptional()
  DxCode?: string;

  @IsString()
  @IsOptional()
  DxName?: string;

}