import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultCheckEligibleDto {

    HTTPStatus: HttpMessageDto;
  // Result?: ResultInfo;
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

    // @IsArray()
    // @IsOptional()
    // InsuranceData?:InsuranceData[]

  }
export class InsuranceData{

    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;

    @IsInt()
    @IsOptional()
    InsurerCode:number

    @IsBoolean()
    @IsOptional()
    CoverageClaimStatus?: boolean;

    @IsArray()
    @IsOptional()
    RemarkList?:[]

    @IsArray()
    @IsOptional()
    PolicyCoverageDesc?:[]

    CoverageList:CoverageList[]
    
    @IsArray()
    @IsOptional()
    PolicyInfoList?: PolicyInfoList[];
    
  }
  class PolicyInfoList{

    @IsString()
    @IsOptional()
    PolicyNo?: string;

    @IsString()
    @IsOptional()
    MembershipNo?: string;

    @IsString()
    @IsOptional()
    PolicyDescription?: string;

    @IsString()
    @IsOptional()
    EffectiveDate?: string;

    @IsString()
    @IsOptional()
    Remark1?: string;
    @IsString()
    @IsOptional()
    Remark2?: string;
    @IsString()
    @IsOptional()
    SpecialRemark1?: string;
    @IsString()
    @IsOptional()
    SpecialRemark2?: string;

}

 class CoverageList{
    @IsString()
    @IsOptional()
    Type?: string;
    @IsString()
    @IsOptional()
    Status?: string;
    @IsArray()
    @IsOptional()
    MessageList?: MessageList[]
}
class MessageList{

    @IsString()
    @IsOptional()
    PolicyNo?: string;

    @IsString()
    @IsOptional()
    PlanName?: string;

    @IsString()
    @IsOptional()
    MessageTh?: string;

    @IsString()
    @IsOptional()
    MessageEn?: string;

    @IsString()
    @IsOptional()
    RuleNo?: string;

}
  export class InsuranceCustomerDetail{

    @IsString()
    @IsOptional()
    PolicyNo?: string;

    @IsString()
    @IsOptional()
    MemberShipId?: string;

    @IsString()
    @IsOptional()
    FirstName?: string;

    @IsString()
    @IsOptional()
    LastName?: string;

    @IsString()
    @IsOptional()
    NationalId?: string;
    
  }