 import {  IsArray, IsString ,IsOptional,ValidateNested} from 'class-validator';

 import { Type } from 'class-transformer';

// import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultReviewPreVisitInfoDto {
   
    AdditionalNote: string;
    AlcoholRelated: boolean;
    ChiefComplaint: string;
    ComaScore: string;
    DxFreeText: string;
    ExpectedDayOfRecovery: string;
    Height: string;
    PhysicalExam: string;
    PlanOfTreatment: string;
    Pregnant: boolean;
    PresentIllness: string;
    PreviousTreatmentDate: string;
    PreviousTreatmentDetail: string;
    PrivateCase: boolean;
    ProcedureFreeText: string;
    SignSymptomsDate: string;
    UnderlyingCondition: string;
    VisitDateTime: string;
    VN: string;
    Weight: string;
    AdmitDateTime:string;
    IsIPDDischarge:boolean;
    // VisitDate: string;
    An: string;
    PreauthReferClaimNo: string; 
    PreauthReferOcc: string; 
    IndicationForAdmission:string;
    DscDateTime:string;

  }

  export class AccidentDetailDto {
    @IsString()
    @IsOptional()
    AccidentPlace?: string;
  
    @IsString()
    @IsOptional()
    AccidentDate?: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CauseOfInjuryDetail)
    CauseOfInjuryDetail: CauseOfInjuryDetail[]; // รายละเอียดเกี่ยวกับสาเหตุการบาดเจ็บ (ต้องไม่ใช้ @IsOptional)
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InjuryDetail)
    @IsOptional()
    InjuryDetail?: InjuryDetail[]; // รายละเอียดเกี่ยวกับบาดแผล
  }

export class CauseOfInjuryDetail {
  @IsString()
  @IsOptional()
  CauseOfInjury?: string; // สาเหตุของการบาดเจ็บ

  @IsString()
  @IsOptional()
  CommentOfInjury?: string; // ความคิดเห็นเกี่ยวกับการบาดเจ็บ
}
  export class InjuryDetail {
    @IsString()
    @IsOptional()
    WoundType?: string; // ประเภทของบาดแผล
  
    @IsString()
    @IsOptional()
    InjurySide?: string; // ด้านของบาดแผล
  
    @IsString()
    @IsOptional()
    InjuryArea?: string; // พื้นที่ของบาดแผล
  }