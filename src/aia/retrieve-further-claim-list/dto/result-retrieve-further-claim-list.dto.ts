import { IsArray,  IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type ,Transform } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultRetrieveFurtherClaimDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FurtherClaimList)
    @IsOptional() 
    FurtherClaimList?: FurtherClaimList[];
  }
 export class FurtherClaimList {
    @IsOptional()
    @IsString()
    FurtherClaimId?: string;
  
    @IsOptional()
    @IsString()
    ClaimNo?: string;
  
    @IsOptional()
    @IsString()
    OccurrenceNo?: string;
  
    @IsOptional()
    @IsString()
    Icd10?: string;
  
    @IsOptional()
    @IsString()
    DxName?: string;
  
    @IsOptional()
    @IsString()
    @TransformDateString()
    DscDateTime?: string;
  
    @IsOptional()
    @IsString()
    @TransformDateString()
    VisitDateTime?: string;
  
    @IsOptional()
    @IsString()
    @TransformDateString()
    AccidentDate?: string;
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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FurtherClaimList)
    @IsOptional() 
    FurtherClaimList?: FurtherClaimList[];
  }
   // ตัวแปลงสำหรับการแสดงแค่วันที่ (YYYY-MM-DD)
function TransformDateString() {
    return Transform(({ value }) => {
      if (value) {
        const date = new Date(value);
        return date.toISOString().split('T')[0]; // ตัดเอาเฉพาะวันที่
      }
      return value;
    });
  }