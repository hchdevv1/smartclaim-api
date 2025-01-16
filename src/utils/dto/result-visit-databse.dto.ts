import { IsInt ,IsBoolean, IsOptional, IsString  } from 'class-validator';

//import { Type } from 'class-transformer';
import { HttpMessageDto } from './http-status-message.dto';



export class QueryVisitDatabaseBodyDto {

    
    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;

    @IsInt()
    @IsOptional()
    InsurerCode:number

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;
    
  }

  
  export class ResultOpdDischargeVisitDto {

    HTTPStatus: HttpMessageDto;
    Result?: VisitDatabaseResultInfo;
 }
 
 export class QueryVisitDatabse{

    @IsString()
    @IsOptional()
    FurtherClaimId?: string;

    @IsString()
    @IsOptional()
    AccidentCauseOver45Days?: string;

    @IsString()
    @IsOptional()
    AdditionalNote?: string;

    @IsBoolean()
    @IsOptional()
    AlcoholRelated?: boolean;

    @IsString()
    @IsOptional()
    ChiefComplaint?: string;

    @IsString()
    @IsOptional()
    ComaScore?: string;

    @IsString()
    @IsOptional()
    DxFreeText?: string;

    @IsString()
    @IsOptional()
    ExpectedDayOfRecovery?: string;

    @IsString()
    @IsOptional()
    Height?: string;

    @IsString()
    @IsOptional()
    PhysicalExam?: string;

    @IsString()
    @IsOptional()
    PlanOfTreatment?: string;

    @IsBoolean()
    @IsOptional()
    Pregnant?: boolean;

    @IsString()
    @IsOptional()
    PresentIllness?: string;

    @IsString()
    @IsOptional()
    PreviousTreatmentDate?: string;

    @IsString()
    @IsOptional()
    PreviousTreatmentDetail?: string;

    @IsBoolean()
    @IsOptional()
    PrivateCase?: boolean;

    @IsString()
    @IsOptional()
    ProcedureFreeText?: string;

    @IsString()
    @IsOptional()
    SignSymptomsDate?: string;

    @IsString()
    @IsOptional()
    UnderlyingCondition?: string;

    @IsString()
    @IsOptional()
    VisitDateTime?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    Weight?: string;

    @IsString()
    @IsOptional()
    ExpectedAdmitDate?: string;

    @IsString()
    @IsOptional()
    PreauthReferClaimNo?: string;   

    @IsString()
    @IsOptional()
    PreauthReferOcc?: string;   
    
    @IsString()
    @IsOptional()
    IndicationForAdmission?: string;   
    
    @IsString()
    @IsOptional()
    DscDateTime?: string;   

    @IsBoolean()
    @IsOptional()
    IsPackage?: boolean;

    @IsString()
    @IsOptional()
    TotalEstimatedCost?: string;  
    
    @IsString()
    @IsOptional()
    AnesthesiaList?: string;
    
    @IsString()
    @IsOptional()
    AccidentDate?: string;

    @IsString()
    @IsOptional()
    AdmitDateTime?: string;

    @IsBoolean()
    @IsOptional()
    IsIPDDischarge?: boolean;

  }
 export class VisitDatabaseResultInfo {

    @IsOptional()
    VisitInfo?: QueryVisitDatabse;
  }

 