import {  IsInt,  IsString ,IsOptional ,IsBoolean} from 'class-validator';

export class QueryIpdDischargeDto {
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
    VN?: string;

    @IsString()
    @IsOptional()
    PolicyTypeCode?: string;

    @IsString()
    @IsOptional()
    ServiceSettingCode?: string;

    @IsString()
    @IsOptional()
    IllnessTypeCode?: string;

    @IsString()
    @IsOptional()
    SurgeryTypeCode?: string;


    @IsString()
    @IsOptional()
    VisitDateTime?: string;


    @IsString()
    @IsOptional()
    PreauthReferClaimNo?: string;

    @IsString()
    @IsOptional()
    PreauthOcc?: string;
    @IsString()
    @IsOptional()
    AccidentDate?: string;

       @IsBoolean()
        IsIPDDischarge?: boolean;

        @IsBoolean()
        @IsOptional()

        HaveAccidentCauseOfInjuryDetail?: boolean;
        @IsBoolean()
        @IsOptional()

        HaveAccidentInjuryDetail?: boolean;
       
  }