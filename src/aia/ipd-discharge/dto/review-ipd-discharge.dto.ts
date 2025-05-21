import { IsObject,IsBoolean, IsInt, IsArray, IsString ,IsOptional,ValidateNested} from 'class-validator';

import { Type } from 'class-transformer';

import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export class QueryReviewOpdDischargeDto {
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
    HN?: string;


    @IsString()
    @IsOptional()
    VN?: string;

    @IsBoolean()
    HaveProcedure: boolean;

    @IsBoolean()
    HaveAccidentCauseOfInjuryDetail: boolean;

    @IsBoolean()
    HaveAccidentInjuryDetail: boolean;
  }

class PatientDto {
    @IsString()
    Dob: string;

    @IsString()
    Gender: string;

    @IsString()
    Hn: string;
}

class VisitDto {
    @IsString()
    FurtherClaimId: string;

    @IsString()
    AccidentCauseOver45Days: string;

    @IsString()
    AdditionalNote: string;

    @IsBoolean()
    AlcoholRelated: boolean;

    @IsString()
    ChiefComplaint: string;

    @IsString()
    ComaScore: string;

    @IsString()
    DxFreeText: string;

    @IsString()
    ExpectedDayOfRecovery: string;

    @IsString()
    Height: string;

    @IsString()
    PhysicalExam: string;

    @IsString()
    PlanOfTreatment: string;

    @IsBoolean()
    Pregnant: boolean;

    @IsString()
    PresentIllness: string;

    @IsString()
    PreviousTreatmentDate: string;

    @IsString()
    PreviousTreatmentDetail: string;

    @IsBoolean()
    PrivateCase: boolean;

    @IsString()
    ProcedureFreeText: string;

    @IsString()
    SignSymptomsDate: string;

    @IsString()
    UnderlyingCondition: string;

    @IsString()
    VisitDateTime: string;

    @IsString()
    VN: string;

    @IsString()
    Weight: string;
}

class VitalSignDto {
    @IsString()
    DiastolicBp: string;

    @IsString()
    HeartRate: string;

    @IsString()
    OxygenSaturation: string;

    @IsString()
    PainScore: string;

    @IsString()
    RespiratoryRate: string;

    @IsString()
    SystolicBp: string;

    @IsString()
    Temperature: string;

    @IsString()
    VitalSignEntryDateTime: string;
}

class DiagnosisDto {
    @IsString()
    DxName: string;

    @IsString()
    DxType: string;

    @IsString()
    Icd10: string;
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

class ProcedureDto {
    @IsString()
    Icd9: string;

    @IsString()
    ProcedureDate: string;

    @IsString()
    ProcedureName: string;
}
class InvestigationDto {
    @IsString()
    InvestigationCode: string;

    @IsString()
    InvestigationGroup: string;

    @IsString()
    InvestigationName: string;

    @IsString()
    InvestigationResult: string;

    @IsString()
    ResultDateTime: string;
}
class OrderItemDto {
    @IsString()
    Discount: string;

    @IsString()
    Initial: string;

    @IsString()
    ItemAmount: string;

    @IsString()
    ItemId: string;

    @IsString()
    ItemName: string;

    @IsString()
    LocalBillingCode: string;

    @IsString()
    LocalBillingName: string;

    @IsString()
    NetAmount: string;
}
class DoctorDto {
    @IsString()
    DoctorLicense: string;

    @IsString()
    DoctorRole: string;

    @IsString()
    DoctorFirstName: string;

    @IsString()
    DoctorLastName: string;
}
class BillingDto {
    @IsString()
    LocalBillingCode: string;

    @IsString()
    LocalBillingName: string;

    @IsString()
    SimbBillingCode: string;

    @IsString()
    PayorBillingCode: string;

    @IsString()
    BillingInitial: string;

    @IsString()
    BillingDiscount: string;

    @IsString()
    BillingNetAmount: string;
}


  export class ResultReviewPatientInfoDto {
    Dob: string; // ชื่อโรค
    Gender: string; // ประเภทของโรค (ใช้ dxtypecodeinsurance ถ้ามีการแมป)
    Hn: string; // รหัสโรค Icd10
  }
  export class ResultReviewVisitInfoDto {
    FurtherClaimId: string; 
    AccidentCauseOver45Days: string;
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

  }
  export class ResultReviewVitalSignInfoDto {
    DiastolicBp: string; 
    HeartRate: string; 
    OxygenSaturation: string;
    PainScore: string; 
    RespiratoryRate: string; 
    SystolicBp: string; 
    Temperature: string;
    VitalSignEntryDateTime: string; 
  }
  export class ResultReviewDiagnosisInfoDto {
    DxName: string; 
    DxType: string; 
    Icd10: string; 
  }

  export class ResultReviewProcedureInfoDto {
    Icd9: string; 
    ProcedureDate: string; 
    ProcedureName: string; 
  }
  export class ResultReviewInvestigationInfoDto {
    InvestigationCode: string; 
    InvestigationGroup: string; 
    InvestigationName: string;
    InvestigationResult: string; 
    ResultDateTime: string; 
  }
  export class ResultReviewOrderItemInfoDto {
    ItemId: string; 
    ItemName: string; 
    ItemAmount: string;
    Discount: string; 
    Initial: string; 
    LocalBillingCode: string; 
    LocalBillingName: string;
    Location: string; 
    NetAmount: string; 
    SimbVersion: string; 
    Terminology: string; 
  }
  export class ResultReviewDoctorInfoDto {
    DoctorLicense: string; 
    DoctorRole: string; 
    DoctorFirstName: string;
    DoctorLastName: string; 
  }
  export class ResultReviewBillingInfoDto {
    LocalBillingCode: string; 
    LocalBillingName: string; 
    SimbBillingCode: string;
    PayorBillingCode: string; 
    BillingInitial: string; 
    BillingDiscount: string; 
    BillingNetAmount: string;

  }
export class ResultReviewOpdDischargeDto {

    HTTPStatus: HttpMessageDto;
   Result?: ResultInfo;
 }
 
  export class ResultInfo{
    InsuranceResult?:InsuranceResult;
   //  InsuranceData?:InsuranceData;
}
export class InsuranceResult{

    @IsString()
    @IsOptional()
    Code?: string;

    @IsString()
    @IsOptional()
    Message?: string;

    @IsString()
    @IsOptional()
    MessageTh?: string;
  }
 

  export class ReviewAccidentDatabase {
    @IsString()
    @IsOptional()
    AccidentPlace?: string;

    @IsString()
    @IsOptional()
    AccidentDate?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CauseOfInjuryDetail)
    @IsOptional()
    CauseOfInjuryDetail?: CauseOfInjuryDetail[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InjuryDetail)
    @IsOptional()
    InjuryDetail?: InjuryDetail[];
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

export class AccidentDatabaseResultInfo {
  @ValidateNested() // ใช้สำหรับการตรวจสอบการซ้อนกัน
  @Type(() => AccidentDetailDto)
  AccidentDetailInfo?: AccidentDetailDto; // เปลี่ยนประเภทเป็น AccidentDetailDto
}


export class QueryConcurNote{


  @IsString()
  @IsOptional()
  ConcurrentDatetime?: string;

  @IsString()
  @IsOptional()
  ConcurrentDetail?: string;



}
  ////
export class ResultReviewDataJsonDto {
    @IsObject()
    @IsOptional()
    Patient?: PatientDto;

    @IsObject()
    @IsOptional()
    Visit?: VisitDto;

    @IsArray()
    @IsOptional()
    VitalSign?: VitalSignDto[];

    @IsArray()
    @IsOptional()
    Diagnosis?: DiagnosisDto[];

    @IsOptional()
   AccidentDetail?: AccidentDetailDto //AccidentDatabaseResultInfo;

    @IsArray()
    @IsOptional()
    Procedure?: ProcedureDto[];

    @IsArray()
    @IsOptional()
    Investigation?: InvestigationDto[];

    @IsArray()
    @IsOptional()
    OrderItem?: OrderItemDto[];

    @IsArray()
    @IsOptional()
   Doctor?: DoctorDto[];

    @IsArray()
    @IsOptional()
    Billing?: BillingDto[];

    @IsString()
    @IsOptional()
    TotalBillAmount?: string;

    @IsString()
    @IsOptional()
    InvoiceNumber?: string;

    @IsArray()
    @IsOptional()
    Note?: QueryConcurNote[];
}

////////////////////////////


