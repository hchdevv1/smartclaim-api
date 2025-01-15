import {  IsArray,IsInt,  IsString ,IsOptional ,ValidateNested, IsBoolean} from 'class-validator';
import { Type } from 'class-transformer';
export class QuerySubmitPreAuthDto {
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
    VisitDateTime?: string;

    @IsString()
    @IsOptional()
    AccidentDate?: string;

    @IsString()
    @IsOptional()
    AccidentPlaceCode?: string;

    @IsString()
    @IsOptional()
    AccidentInjuryWoundtypeCode?: string;

    @IsString()
    @IsOptional()
    AccidentInjurySideCode?: string;

    @IsString()
    @IsOptional()
    WoundDetails?: string;

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
    ChiefComplaint?: string;

    @IsString()
    @IsOptional()
    PresentIllness?: string;


    @IsString()
    @IsOptional()
    DxFreeText?: string;


    @IsString()
    @IsOptional()
    OtherInsurer?: string;

    @IsString()
    @IsOptional()
    UnderlyingCondition?: string;

    @IsString()
    @IsOptional()
    PhysicalExam?: string;
    @IsString()
    @IsOptional()
    PlanOfTreatment?: string;

    @IsString()
    @IsOptional()
    ProcedureFreeText?: string;

    @IsString()
    @IsOptional()
    AdditionalNote?: string;

    @IsString()
    @IsOptional()
    SignSymptomsDate?: string;

    @IsString()
    @IsOptional()
    ComaScore?: string;
    @IsString()
    @IsOptional()
    ExpectedDayOfRecovery?: string;

    @IsString()
    @IsOptional()
    AlcoholRelated?: string;

    @IsString()
    @IsOptional()
    Pregnant?: string;

    @IsString()
    @IsOptional()
    PrivateCase?: string;

    @IsString()
    @IsOptional()
    PreviousTreatmentDate?: string;
    @IsString()
    @IsOptional()
    PreviousTreatmentDetail?: string;

    @IsBoolean()
    @IsOptional()
    ProcedureEdit?: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryProcedure)
    @IsOptional()
    ProcedureInfo?: QueryProcedure[];

       
    @IsInt()
    @IsOptional()
    Runningdocument:number

    @IsString()
    @IsOptional()
    DscDateTime?: string;

    @IsString()
    @IsOptional()
    ExpectedAdmitDate?: string;
    
    @IsBoolean()
    IsPackage: boolean;
    
    @IsString()
    @IsOptional()
    TotalEstimatedCost?: string;

    @IsString()
    @IsOptional()
    AnesthesiaList?: string;

    @IsString()
    @IsOptional()
    IndicationForAdmission?: string;
    @IsString()
    @IsOptional()
    PreauthReferClaimNo?: string;
    @IsString()
    @IsOptional()
    PreauthReferOcc?: string;

  }
class QueryProcedure{

    @IsString()
    @IsOptional()
    Icd9?: string;

    @IsString()
    @IsOptional()
    ProcedureName?: string;

    @IsString()
    @IsOptional()
    ProcedureDate?: string;

  

  }