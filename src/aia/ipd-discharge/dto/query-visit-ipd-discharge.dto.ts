import { IsInt, IsOptional,IsBoolean, IsString ,IsArray ,ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class QueryIPDVisitDto {
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
    AccidentDate?: string;

    @IsString()
    @IsOptional()
    AdditionalNote?: string;

    @IsString()
    @IsOptional()
    AdmitDateTime?: string;

    @IsBoolean()
    AlcoholRelated: boolean;

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
    IndicationForAdmission?: string;

    @IsString()
    @IsOptional()
    PhysicalExam?: string; 

    @IsString()
    @IsOptional()
    PlanOfTreatment?: string;

    @IsString()
    @IsOptional()
    PreauthReferClaimNo?: string;

    @IsString()
    @IsOptional()
    PreauthReferOcc?: string;


    @IsBoolean()
    Pregnant: boolean;

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
    PrivateCase: boolean;

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
    VisitDate?: string;

    @IsString()
    @IsOptional()
    VisitDateTime?: string;
    
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
    Weight?: string;

    @IsBoolean()
    HaveProcedure: boolean;

    @IsBoolean()
    HaveAccidentCauseOfInjuryDetail: boolean;

    @IsBoolean()
    HaveAccidentInjuryDetail: boolean;
   
    @IsBoolean()
    IsIPDDischarge?: boolean;
  }


  export class ResultSubmitIPDVisitDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
class ResultInfo{

 

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SearchPatientBodyDto)
    @IsOptional()
    ProcedureInfo?: SearchPatientBodyDto[];


}