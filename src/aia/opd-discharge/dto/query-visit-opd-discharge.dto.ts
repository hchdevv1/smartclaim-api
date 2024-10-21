import { IsInt, IsOptional,IsBoolean, IsString  } from 'class-validator';


export class QueryVisitDto {
    PatientInfo?: SearchPatientBodyDto
  }
   class SearchPatientBodyDto {
    
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
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    VisitDateTime?: string;

    @IsString()
    @IsOptional()
    DxFreeText?: string;  

    @IsString()
    @IsOptional()
    PresentIllness?: string; 

    @IsString()
    @IsOptional()
    ChiefComplaint?: string;

    @IsString()
    @IsOptional()
    AccidentCauseOver45Days?: string;

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

    @IsBoolean()
    HaveProcedure: boolean;

    @IsBoolean()
    HaveAccidentCauseOfInjuryDetail: boolean;

    @IsBoolean()
    HaveAccidentInjuryDetail: boolean;

    @IsString()
    @IsOptional()
    SignSymptomsDate?: string; 

     @IsString()
    @IsOptional()
    ComaScore?: string;

    @IsString()
    @IsOptional()
    ExpectedDayOfRecovery?: string;


    @IsBoolean()
    AlcoholRelated: boolean;

    @IsBoolean()
    Pregnant: boolean;

    @IsBoolean()
    PrivateCase: boolean;


  }


