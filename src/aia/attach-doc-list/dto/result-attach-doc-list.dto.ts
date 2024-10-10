
import {   IsOptional, IsString  } from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultAttachDocListDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo {
    BillingSubmissionInfo?:InsuranceResultInfo
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
    BatchNumber?: string;

    @IsString()
    @IsOptional()
    InvoiceNumber?: string;

  }
  export class ResultAttachDocListInfoDto {
    Base64Data: string; 
    DocName: string;
  }
 