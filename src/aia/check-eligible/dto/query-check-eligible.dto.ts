
import {  IsInt,  IsString ,IsOptional} from 'class-validator';

export class QueryEligibleBodyDto {
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
    PID?: string;

    @IsString()
    @IsOptional()
    PassportNumber?: string;

    @IsString()
    @IsOptional()
    IdType?: string;
    
    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    GivenNameTH?: string;

    @IsString()
    @IsOptional()
    SurnameTH?: string;

    @IsString()
    @IsOptional()
    DateOfBirth?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    PolicyTypeCode?: string;

    @IsString()
    @IsOptional()
    ServiceSettingCode?: string;

    @IsString()
    @IsOptional()
    ServiceSettingAbbr?: string;

    @IsString()
    @IsOptional()
    IllnessTypeCode?: string;

    @IsString()
    @IsOptional()
    SurgeryTypeCode?: string;

    @IsString()
    @IsOptional()
    VisitDatefrom?: string;

    @IsString()
    @IsOptional()
    VisitDateto?: string;

    @IsString()
    @IsOptional()
    VisitDateTime?: string;

    @IsString()
    @IsOptional()
    AccidentDate?: string;
    
    
    @IsString()
    @IsOptional()
    MembershipId?: string;

    @IsString()
    @IsOptional()
    PolicyNumber?: string;

    @IsString()
    @IsOptional()
    CustomerId?: string;
  
  }


  export class QueryCreateTransactionBodyDto {
    PatientInfo?: CreateTransactionBodyDto
  }
class CreateTransactionBodyDto{
    
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
    PID?: string;

    @IsString()
    @IsOptional()
    PassportNumber?: string;

    @IsString()
    @IsOptional()
    IdType?: string;
    
    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    GivenNameTH?: string;

    @IsString()
    @IsOptional()
    SurnameTH?: string;

    @IsString()
    @IsOptional()
    DateOfBirth?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    PolicyTypeCode?: string;

    @IsString()
    @IsOptional()
    ServiceSettingCode?: string;

    @IsString()
    @IsOptional()
    ServiceSettingAbbr?: string;

    

    @IsString()
    @IsOptional()
    IllnessTypeCode?: string;

    @IsString()
    @IsOptional()
    SurgeryTypeCode?: string;

    @IsString()
    @IsOptional()
    VisitDatefrom?: string;

    @IsString()
    @IsOptional()
    VisitDateto?: string;

    @IsString()
    @IsOptional()
    VisitDateTime?: string;

    @IsString()
    @IsOptional()
    AccidentDate?: string;
    
    @IsString()
    @IsOptional()
    Accidentcauseover45days?: string;
          
    @IsInt()
    @IsOptional()
    Runningdocument:number


    @IsString()
    @IsOptional()
    FurtherClaimId?: string;

    @IsString()
    @IsOptional()
    FurtherClaimNo?: string;

    @IsString()
    @IsOptional()
    FurtherClaimVN?: string;

    @IsString()
    @IsOptional()
    MembershipId?: string;
    
    @IsString()
    @IsOptional()
    PolicyNumber?: string;

    @IsString()
    @IsOptional()
    CustomerId?: string;

    @IsString()
    @IsOptional()
    Visitlocation?: string;
  
    
  }