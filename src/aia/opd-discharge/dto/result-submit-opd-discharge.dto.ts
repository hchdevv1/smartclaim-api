import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString ,IsObject} from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultSubmitOpdDischargeDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 
  export class ResultInfo{
    InsuranceResult?:InsuranceResult;
    InsuranceData?:InsuranceData;
}
export class CoverageDto {
    @IsString()
    @IsNotEmpty()
    type?: string;  // ใช้ string แทน enum

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}

export class MessageDto {
    @IsString()
    @IsNotEmpty()
    policyNo: string;

    @IsString()
    @IsNotEmpty()
    planName: string;

    @IsString()
    @IsOptional()
    messageTh?: string;

    @IsString()
    @IsOptional()
    messageEn?: string;
}

export class InsuranceData {
    @IsString()
    @IsNotEmpty()
    RefId: string;

    @IsString()
    @IsNotEmpty()
    TransactionNo: string;

    @IsString()
    @IsNotEmpty()
    InsurerCode: string;

    @IsString()
    @IsOptional()
    Message?: string | null;

    @IsString()
    @IsOptional()
    MessageTh?: string | null;

    @IsString()
    @IsNotEmpty()
    ClaimNo: string;

    @IsString()
    @IsNotEmpty()
    OccurrenceNo: string;

    @IsNumber()
    @IsNotEmpty()
    TotalApprovedAmount: string;

    @IsString()
    @IsOptional()
    TotalExcessAmount?: string | null;

    @IsBoolean()
    IsReimbursement: boolean;

    @IsArray()
    @IsOptional()
    CoverageList?: CoverageDto[];

    @IsArray()
    @IsOptional()
    MessageList?: MessageDto[];
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
 
////////////////////////////

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
    Vn: string;

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

 class AccidentDetailDto {
    @IsString()
    AccidentPlace: string;

    @IsString()
    AccidentDate: string;

    @IsArray()
    CauseOfInjuryDetail: Array<{
        CauseOfInjury: string;
        CommentOfInjury: string;
    }>;

    @IsArray()
    InjuryDetail: Array<{
        WoundType: string;
        InjurySide: string;
        InjuryArea: string;
    }>;
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

class PssDto {
    @IsString()
    Exclusion: string;

    @IsString()
    FinalScore: string;

    @IsArray()
    Findings: Array<{
        Description: string;
        Exclusion: string;
        Medical: string;
        Reference: string;
    }>;

    @IsString()
    Id: string;

    @IsString()
    Medical: string;
}
export class ResultDataJsonDto {
    @IsObject()
    Patient: PatientDto;

    @IsObject()
    Visit: VisitDto;

    @IsArray()
    VitalSign: VitalSignDto[];

    @IsArray()
    Diagnosis: DiagnosisDto[];

    @IsObject()
    AccidentDetail: AccidentDetailDto;

    @IsArray()
    Procedure: ProcedureDto[];

    @IsArray()
    Investigation: InvestigationDto[];

    @IsArray()
    OrderItem: OrderItemDto[];

    @IsArray()
   Doctor: DoctorDto[];

    @IsArray()
    Billing: BillingDto[];

    @IsString()
    TotalBillAmount: string;

    @IsObject()
    Pss: PssDto;
}
export class ResultPatientInfoDto {
    Dob: string; // ชื่อโรค
    Gender: string; // ประเภทของโรค (ใช้ dxtypecodeinsurance ถ้ามีการแมป)
    Hn: string; // รหัสโรค Icd10
  }
  export class ResultVitalSignInfoDto {
    DiastolicBp: string; 
    HeartRate: string; 
    OxygenSaturation: string;
    PainScore: string; 
    RespiratoryRate: string; 
    SystolicBp: string; 
    Temperature: string;
    VitalSignEntryDateTime: string; 
  }
  export class ResultDiagnosisInfoDto {
    DxName: string; 
    DxType: string; 
    Icd10: string; 
  }
  export class ResultInvestigationInfoDto {
    InvestigationCode: string; 
    InvestigationGroup: string; 
    InvestigationName: string;
    InvestigationResult: string; 
    ResultDateTime: string; 
  }
  export class ResultDoctorInfoDto {
    DoctorLicense: string; 
    DoctorRole: string; 
    DoctorFirstName: string;
    DoctorLastName: string; 
  }
  export class ResultProcedureInfoDto {
    Icd9: string; 
    ProcedureDate: string; 
    ProcedureName: string; 
  }
  export class ResultOrderItemInfoDto {
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
  export class ResultBillingInfoDto {
    LocalBillingCode: string; 
    LocalBillingName: string; 
    SimbBillingCode: string;
    PayorBillingCode: string; 
    BillingInitial: string; 
    BillingDiscount: string; 
    BillingNetAmount: string;

  }
  export class ResultAccidentDetailDto {
    @IsString()
    AccidentPlace: string;

    @IsString()
    AccidentDate: string;

    @IsArray()
    CauseOfInjuryDetail: Array<{
        CauseOfInjury: string;
        CommentOfInjury: string;
    }>;

    @IsArray()
    InjuryDetail: Array<{
        WoundType: string;
        InjurySide: string;
        InjuryArea: string;
    }>;
}
  
  export class ResultAttachDocListInfoDto {
    Base64Data: string; 
    DocName: string;
  }
  export class ResultVisitInfoDto {
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
    Vn: string;
    Weight: string;

  }