import { IsArray,  IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type ,Transform } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultRetrievePreAuthListDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PreAuthList)
    @IsOptional() 
    PreAuthTransactionList?: PreAuthList[];
  }
 export class PreAuthList {

  
    @IsOptional()
    @IsString()
    ClaimNo?: string;
  
    @IsOptional()
    @IsString()
    OccerrenceNo?: string;
  
    @IsOptional()
    @IsString()
    ClaimStatus?: string;
  
    @IsOptional()
    @IsString()
    ClaimStatusDesc?: string;
  
    @IsOptional()
    @IsString()
    @TransformDateString()
    ExpectedAdmitDate?: string;
  
    @IsOptional()
    @IsString()
    @TransformDateString()
    VisitDateTime?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Procedure)
    @IsOptional() 
    Procedure?: Procedure[];
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Diagnosis)
    @IsOptional() 
    Diagnosis?: Diagnosis[];
  }
   class Diagnosis {
    @IsOptional()
    @IsString()
    DxName?: string;
  
    @IsOptional()
    @IsString()
    Icd10?: string;
  }
   class Procedure {
    @IsOptional()
    @IsString()
    ProcedureName?: string;
  
    @IsOptional()
    @IsString()
    ProcedureDate?: string;

      @IsOptional()
    @IsString()
    Icd9?: string;
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
    @Type(() => PreAuthList)
    @IsOptional() 
    PreAuthTransactionList?: PreAuthList[];
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