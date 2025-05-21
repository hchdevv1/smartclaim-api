import { IsArray, IsBoolean, IsInt, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultCheckEligibleDto {

    HTTPStatus: HttpMessageDto;
   Result?: InsuranceResultInfo;
 }

 export class CreateTransactionDto {

  HTTPStatus: HttpMessageDto;
  @IsString()
  @IsOptional()
  Result?: string;
}
  class InsuranceResultInfo{
    InsuranceResult?:InsuranceResult;
    InsuranceData?:InsuranceData;
    InsuranceCustomerDetail?:InsuranceCustomerDetail;
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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CoverageList)
    @IsOptional()
    CoverageList?: CoverageList[]
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PolicyInfoList)
    @IsOptional()
    PolicyInfoList?: PolicyInfoList[];
    
  }
export class PolicyInfoList{

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

 export class CoverageList{
    @IsString()
    @IsOptional()
    Type?: string;
    @IsString()
    @IsOptional()
    Status?: string;

    @IsArray()
    @ValidateNested({ each: true })
   @Type(() => MessageList)
    @IsOptional()
    MessageList?: MessageList[];
}
export class MessageList{

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

  export class EligibleEpisodeListDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultPatientEpisodeInfo;
 }
 class ResultPatientEpisodeInfo{
    PatientInfo?: FindPatientInfoResultInfo;
    EpisodeInfo?: FindEpisodeInfoResultInfo;
}
export class FindPatientInfoResultInfo{
    @IsInt()
    @IsOptional()
    PatientID?: number;

    @IsString()
    @IsOptional()
    PID?: string;

    @IsString()
    @IsOptional()
    PassportNumber?: string;

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    TitleTH?: string;

    @IsString()
    @IsOptional()
    GivenNameTH?: string;

    @IsString()
    @IsOptional()
    SurnameTH?: string;

    @IsString()
    @IsOptional()
    TitleEN?: string;

    @IsString()
    @IsOptional()
    GivenNameEN?: string;

    @IsString()
    @IsOptional()
    SurnameEN?: string;

    @IsString()
    @IsOptional()
    DateOfBirth?: string;

    @IsString()
    @IsOptional()
    Gender?: string;

    @IsString()
    @IsOptional()
    MobilePhone?: string;
}
export class FindEpisodeInfoResultInfo{
  

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    EpisodeType?: string;

    @IsString()
    @IsOptional()
    VisitDate?: string;

    @IsString()
    @IsOptional()
    VisitTime?: string;

    @IsString()
    @IsOptional()
    VisitDateTime?: string;

    @IsString()
    @IsOptional()
    AccidentDate?: string;

    @IsString()
    @IsOptional()
    LocationCode?: string;

    @IsString()
    @IsOptional()
    LocationDesc?: string;

    @IsString()
    @IsOptional()
    WardCode?: string;

    @IsString()
    @IsOptional()
    WardDesc?: string;

    @IsString()
    @IsOptional()
    BedCode?: string;

    @IsString()
    @IsOptional()
    MainCareproviderCode?: string;

    @IsString()
    @IsOptional()
    MainCareproviderDesc?: string;

    @IsString()
    @IsOptional()
    DoctorLicense?: string;

    @IsString()
    @IsOptional()
    DoctorFirstName?: string;

    @IsString()
    @IsOptional()
    DoctorLastName?: string;

    @IsString()
    @IsOptional()
    SurgeryType?: string;




}
export class PolicyNumberListDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultPolicyNumberInfo;
 }
  class ResultPolicyNumberInfo{
   
  
  PolicyNumberInfo?: FindPolicyNumberInfo[];

}
export class FindPolicyNumberInfo{
  
    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    PolicyNo?: string;

    @IsString()
    @IsOptional()
    RuleNo?: string;

    @IsString()
    @IsOptional()
    PlanName?: string;

    @IsString()
    @IsOptional()
    PolicyNoType?: string;

    @IsString()
    @IsOptional()
    MessageTH?: string;




}