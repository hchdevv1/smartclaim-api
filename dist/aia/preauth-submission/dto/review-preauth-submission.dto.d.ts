import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryReviewOpdDischargeDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    HaveProcedure: boolean;
    HaveAccidentCauseOfInjuryDetail: boolean;
    HaveAccidentInjuryDetail: boolean;
}
declare class PatientDto {
    Dob: string;
    Gender: string;
    Hn: string;
}
declare class VisitDto {
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
export declare class AccidentDetailDto {
    AccidentPlace?: string;
    AccidentDate?: string;
    CauseOfInjuryDetail: CauseOfInjuryDetail[];
    InjuryDetail?: InjuryDetail[];
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
export declare class ResultReviewPatientInfoDto {
    Dob: string;
    Gender: string;
    Hn: string;
}
export declare class ResultReviewVisitInfoDto {
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
export declare class ResultReviewVitalSignInfoDto {
    DiastolicBp: string;
    HeartRate: string;
    OxygenSaturation: string;
    PainScore: string;
    RespiratoryRate: string;
    SystolicBp: string;
    Temperature: string;
    VitalSignEntryDateTime: string;
}
export declare class ResultReviewDiagnosisInfoDto {
    DxName: string;
    DxType: string;
    Icd10: string;
}
export declare class ResultReviewProcedureInfoDto {
    Icd9: string;
    ProcedureDate: string;
    ProcedureName: string;
}
export declare class ResultReviewInvestigationInfoDto {
    InvestigationCode: string;
    InvestigationGroup: string;
    InvestigationName: string;
    InvestigationResult: string;
    ResultDateTime: string;
}
export declare class ResultReviewOrderItemInfoDto {
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
export declare class ResultReviewDoctorInfoDto {
    DoctorLicense: string;
    DoctorRole: string;
    DoctorFirstName: string;
    DoctorLastName: string;
}
export declare class ResultReviewBillingInfoDto {
    LocalBillingCode: string;
    LocalBillingName: string;
    SimbBillingCode: string;
    PayorBillingCode: string;
    BillingInitial: string;
    BillingDiscount: string;
    BillingNetAmount: string;
}
export declare class ResultReviewOpdDischargeDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    InsuranceResult?: InsuranceResult;
}
export declare class InsuranceResult {
    Code?: string;
    Message?: string;
    MessageTh?: string;
}
export declare class ReviewAccidentDatabase {
    AccidentPlace?: string;
    AccidentDate?: string;
    CauseOfInjuryDetail?: CauseOfInjuryDetail[];
    InjuryDetail?: InjuryDetail[];
}
export declare class CauseOfInjuryDetail {
    CauseOfInjury?: string;
    CommentOfInjury?: string;
}
export declare class InjuryDetail {
    WoundType?: string;
    InjurySide?: string;
    InjuryArea?: string;
}
export declare class AccidentDatabaseResultInfo {
    AccidentDetailInfo?: AccidentDetailDto;
}
export declare class QueryConcurNote {
    ConcurrentDatetime?: string;
    ConcurrentDetail?: string;
}
export declare class ResultReviewDataJsonDto {
    Patient?: PatientDto;
    Visit?: VisitDto;
    VitalSign?: VitalSignDto[];
    Diagnosis?: DiagnosisDto[];
    AccidentDetail?: AccidentDetailDto;
    Procedure?: ProcedureDto[];
    Investigation?: InvestigationDto[];
    OrderItem?: OrderItemDto[];
    Doctor?: DoctorDto[];
    Billing?: BillingDto[];
    TotalBillAmount?: string;
    InvoiceNumber?: string;
    Note?: QueryConcurNote[];
}
export declare class ResultReviewPreVisitInfoDto {
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
    AdmitDateTime: string;
    IsIPDDischarge: boolean;
    An: string;
    PreauthReferClaimNo: string;
    PreauthReferOcc: string;
    IndicationForAdmission: string;
    DscDateTime: string;
    IsPackage: boolean;
    ExpectedAdmitDate: string;
    TotalEstimatedCost: string;
    AnesthesiaList: string;
}
export {};
