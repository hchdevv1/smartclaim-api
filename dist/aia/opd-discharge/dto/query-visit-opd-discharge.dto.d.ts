export declare class QueryVisitDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    VisitDateTime?: string;
    DxFreeText?: string;
    PresentIllness?: string;
    ChiefComplaint?: string;
    AccidentCauseOver45Days?: string;
    UnderlyingCondition?: string;
    PhysicalExam?: string;
    PlanOfTreatment?: string;
    ProcedureFreeText?: string;
    AdditionalNote?: string;
    HaveProcedure: boolean;
    HaveAccidentCauseOfInjuryDetail: boolean;
    HaveAccidentInjuryDetail: boolean;
    SignSymptomsDate?: string;
    ComaScore?: string;
    ExpectedDayOfRecovery?: string;
    AlcoholRelated: boolean;
    Pregnant: boolean;
    PrivateCase: boolean;
    Height?: string;
    Weight?: string;
}
export {};
