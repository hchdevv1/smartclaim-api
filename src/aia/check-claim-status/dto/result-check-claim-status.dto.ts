import { IsArray,  IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type  } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultCheckClaimStatusDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo {
  InsuranceResultInfo?:InsuranceResultInfo
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
    ClaimStatus?: string;

    @IsString()
    @IsOptional()
    ClaimStatusDesc?: string;

    @IsString()
    @IsOptional()
    TotalApproveAmount?: string;

    @IsString()
    @IsOptional()
    PaymentDate?: string;

    @IsString()
    @IsOptional()
    InvoiceNumber?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ResultAttachDocListInfoDto)
    @IsOptional() 
    AttachDocList?: ResultAttachDocListInfoDto[];
  }

  export class ResultAttachDocListInfoDto {
    Base64Data: string; 
    DocName: string;
  }