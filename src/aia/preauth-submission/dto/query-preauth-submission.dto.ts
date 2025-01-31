import {  IsInt,  IsString ,IsOptional} from 'class-validator';

export class QueryPreauthSubmissionDto {
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
    

  }