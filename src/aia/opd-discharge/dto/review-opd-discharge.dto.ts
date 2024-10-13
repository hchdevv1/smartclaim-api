import { IsBoolean, IsInt,  IsString ,IsOptional} from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class QueryReviewOpdDischargeDto {
    PatientInfo?: SearchPatientBodyDto
  }
  class SearchPatientBodyDto{
    
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
    HaveProcedure: boolean;

    @IsBoolean()
    HaveAccidentCauseOfInjuryDetail: boolean;

    @IsBoolean()
    HaveAccidentInjuryDetail: boolean;
  }

export class ResultSubmitOpdDischargeDto {

    HTTPStatus: HttpMessageDto;
   // Result?: ResultInfo;
 }
 
  export class ResultInfo{
    // InsuranceResult?:InsuranceResult;
    // InsuranceData?:InsuranceData;
}