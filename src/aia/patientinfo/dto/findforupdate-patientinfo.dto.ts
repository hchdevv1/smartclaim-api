import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export class FindforUpdateDto {

    HTTPStatus: HttpMessageDto;
    Result?: ComparePatientInfo;
}
export class FindforUpdateBodyDto {
    PatientInfo?: FindforUpdatePatientBodyDto
  }
  class FindforUpdatePatientBodyDto{
    
    @IsInt()
    @IsOptional()
    InsurerCode:number

    @IsString()
    @IsOptional()
    RefID?: string;

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
    VN?: string;

    @IsString()
    @IsOptional()
    StatusClaimCode?: string;

    @IsDate()
    @IsOptional()
    VisitDatefrom?: string;

    @IsDate()
    @IsOptional()
    VisitDateto?: string;

  }
export class ComparePatientInfo{
    PatientInfo?:ComparePatientData
  }
  class ComparePatientData{
    PatientDatabase?:FindforUpdatePatientDatabase
    PatientTrakcare?:FindforUpdatePatientTrakcare
  }
export class FindforUpdatePatientTrakcare{
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
export class FindforUpdatePatientDatabase{
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