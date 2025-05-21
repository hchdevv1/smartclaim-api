import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultSubmitPreAuthSubmissionDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    InsuranceResult?: InsuranceResult;
    InsuranceData?: InsuranceData;
}
export declare class CoverageDto {
    type?: string;
    status?: boolean;
}
export declare class MessageDto {
    policyNo: string;
    planName: string;
    messageTh?: string;
    messageEn?: string;
}
export declare class InsuranceData {
    RefId: string;
    TransactionNo: string;
    InsurerCode: string;
    Message?: string | null;
    MessageTh?: string | null;
    ClaimNo: string;
    OccurrenceNo: string;
    TotalApprovedAmount: string;
    TotalExcessAmount?: string | null;
    IsReimbursement: boolean;
    CoverageList?: CoverageDto[];
    MessageList?: MessageDto[];
}
export declare class InsuranceResult {
    Code?: string;
    Message?: string;
    MessageTh?: string;
}
declare class PatientDto {
    Dob: string;
    Gender: string;
    Hn: string;
}
declare class VisitDto {
    AccidentDate: string;
    AdditionalNote: string;
    AdmitDateTime: string;
    AlcoholRelated: boolean;
    An: string;
    ChiefComplaint: string;
    ComaScore: string;
    DscDateTime: string;
    DxFreeText: string;
    ExpectedDayOfRecovery: string;
    ExpectedLos?: number;
    Height: string;
    IndicationForAdmission: string;
    PhysicalExam: string;
    PlanOfTreatment: string;
    Pregnant: boolean;
    PresentIllness: string;
    PreviousTreatmentDate: string;
    PreviousTreatmentDetail: string;
    PreauthReferClaimNo: string;
    PreauthReferOcc: string;
    PrivateCase: boolean;
    SignSymptomsDate: string;
    UnderlyingCondition: string;
    VisitDateTime: string;
    Vn: string;
    Weight: string;
}
declare class VitalSignDto {
    DiastolicBp: string;
    HeartRate: string;
    OxygenSaturation: string;
    PainScore: string;
    RespiratoryRate: string;
    SystolicBp: string;
    Temperature: string;
    VitalSignEntryDateTime: string;
}
declare class DiagnosisDto {
    DxName: string;
    DxType: string;
    Icd10: string;
}
declare class AccidentDetailDto {
    AccidentPlace: string;
    AccidentDate: string;
    CauseOfInjuryDetail: Array<{
        CauseOfInjury: string;
        CommentOfInjury: string;
    }>;
    InjuryDetail: Array<{
        WoundType: string;
        InjurySide: string;
        InjuryArea: string;
    }>;
}
declare class ProcedureDto {
    Icd9: string;
    ProcedureDate: string;
    ProcedureName: string;
}
declare class InvestigationDto {
    InvestigationCode: string;
    InvestigationGroup: string;
    InvestigationName: string;
    InvestigationResult: string;
    ResultDateTime: string;
}
declare class OrderItemDto {
    Discount: string;
    Initial: string;
    ItemAmount: string;
    ItemId: string;
    ItemName: string;
    LocalBillingCode: string;
    LocalBillingName: string;
    NetAmount: string;
}
declare class DoctorDto {
    DoctorLicense: string;
    DoctorRole: string;
    DoctorFirstName: string;
    DoctorLastName: string;
}
declare class BillingDto {
    LocalBillingCode: string;
    LocalBillingName: string;
    SimbBillingCode: string;
    PayorBillingCode: string;
    BillingInitial: string;
    BillingDiscount: string;
    BillingNetAmount: string;
}
declare class PssDto {
    Exclusion: string;
    FinalScore: string;
    Findings: Array<{
        Description: string;
        Exclusion: string;
        Medical: string;
        Reference: string;
    }>;
    Id: string;
    Medical: string;
}
declare class PreAuthNoteDto {
    PreAuthDatetime?: string;
    PreAuthDetail?: string;
}
export declare class ResultDataJsonDto {
    Patient: PatientDto;
    Visit: VisitDto;
    VitalSign: VitalSignDto[];
    Diagnosis: DiagnosisDto[];
    AccidentDetail: AccidentDetailDto;
    Procedure: ProcedureDto[];
    Investigation: InvestigationDto[];
    OrderItem: OrderItemDto[];
    Doctor: DoctorDto[];
    Billing: BillingDto[];
    TotalBillAmount: string;
    Pss: PssDto;
    PreAuthNote: PreAuthNoteDto[];
    AnesthesiaList: any;
    IsPackage: boolean;
    TotalEstimatedCost: string;
}
export declare class ResultPatientInfoDto {
    Dob: string;
    Gender: string;
    Hn: string;
}
export declare class ResultVitalSignInfoDto {
    DiastolicBp: string;
    HeartRate: string;
    OxygenSaturation: string;
    PainScore: string;
    RespiratoryRate: string;
    SystolicBp: string;
    Temperature: string;
    VitalSignEntryDateTime: string;
}
export declare class ResultDiagnosisInfoDto {
    DxName: string;
    DxType: string;
    Icd10: string;
}
export declare class ResultInvestigationInfoDto {
    InvestigationCode: string;
    InvestigationGroup: string;
    InvestigationName: string;
    InvestigationResult: string;
    ResultDateTime: string;
}
export declare class ResultDoctorInfoDto {
    DoctorLicense: string;
    DoctorRole: string;
    DoctorFirstName: string;
    DoctorLastName: string;
}
export declare class ResultProcedureInfoDto {
    Icd9: string;
    ProcedureDate: string;
    ProcedureName: string;
}
export declare class ResultOrderItemInfoDto {
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
export declare class ResultBillingInfoDto {
    LocalBillingCode: string;
    LocalBillingName: string;
    SimbBillingCode: string;
    PayorBillingCode: string;
    BillingInitial: string;
    BillingDiscount: string;
    BillingNetAmount: string;
}
export declare class ResultAccidentDetailDto {
    AccidentPlace: string;
    AccidentDate: string;
    CauseOfInjuryDetail: Array<{
        CauseOfInjury: string;
        CommentOfInjury: string;
    }>;
    InjuryDetail: Array<{
        WoundType: string;
        InjurySide: string;
        InjuryArea: string;
    }>;
}
export declare class ResultPreAuthNoteDto {
    PreAuthDatetime: string;
    PreAuthDetail: string;
}
export declare class ResultAttachDocListInfoDto {
    Base64Data: string;
    DocName: string;
}
export declare class ResultVisitInfoDto {
    AccidentDate: string;
    AdditionalNote: string;
    AdmitDateTime: string;
    AlcoholRelated: boolean;
    An: string;
    ChiefComplaint: string;
    ComaScore: string;
    DscDateTime: string;
    DxFreeText: string;
    ExpectedDayOfRecovery: string;
    ExpectedLos: number;
    ExpectedAdmitDate: string;
    Height: string;
    IndicationForAdmission: string;
    PhysicalExam: string;
    PlanOfTreatment: string;
    Pregnant: boolean;
    PresentIllness: string;
    PreviousTreatmentDate: string;
    PreviousTreatmentDetail: string;
    PreauthReferClaimNo: string;
    PreauthReferOcc: string;
    PrivateCase: boolean;
    SignSymptomsDate: string;
    UnderlyingCondition: string;
    VisitDateTime: string;
    VisitDate: string;
    Vn: string;
    Weight: string;
    AnesthesiaList: string;
    TotalEstimatedCost: string;
    IsPackage: boolean;
}
export {};
