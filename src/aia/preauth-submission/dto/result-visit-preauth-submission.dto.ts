import {  IsBoolean, IsOptional, IsString  } from 'class-validator';

import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultPreAuthVisitDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
   
    VisitInfo?: QueryVisit;
  }


  export class QueryVisit{

    @IsString()
    @IsOptional()
    AccidentDate?: string;


    @IsString()
    @IsOptional()
    AdditionalNote?: string;

    @IsString()
    @IsOptional()
    AdmitDateTime ?: string;

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
    ExpectedLos?: string;

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
    PreauthOcc?: string;

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
    VisitDate?: string;

    @IsString()
    @IsOptional()
    VisitDateTime?: string;
    
    @IsString()
    @IsOptional()
    DscDateTime?: string;
    
    @IsString()
    @IsOptional()
    Vn?: string;

    @IsString()
    @IsOptional()
    An?: string;

    @IsString()
    @IsOptional()
    Weight?: string;

    @IsBoolean()
    @IsOptional()
    IsIPDDischarge?: boolean;

    
  }