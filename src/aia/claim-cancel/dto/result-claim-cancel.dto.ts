
import {   IsOptional, IsString  } from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultClaimCancelDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo {
    ClaimCancelInfo?:InsuranceResultInfo
  }
  export class InsuranceResultInfo{
    InsuranceResult?:InsuranceResult;
    InsuranceData?:InsuranceData;
}
  export class InsuranceResult{

    @IsString()
    @IsOptional()
    Code?: string;

    @IsString()
    @IsOptional()
    Message?: string;

    @IsString()
    @IsOptional()
    MessageTh?: string;
  }

  export class InsuranceData{
    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;

    @IsString()
    @IsOptional()
    InsurerCode?: string;

    @IsString()
    @IsOptional()
    Status?: string;
    
  }