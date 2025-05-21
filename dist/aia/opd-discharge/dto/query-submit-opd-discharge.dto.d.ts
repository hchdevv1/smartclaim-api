export declare class QuerySubmitOpdDischargeDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    PID?: string;
    PassportNumber?: string;
    IdType?: string;
    HN?: string;
    GivenNameTH?: string;
    SurnameTH?: string;
    DateOfBirth?: string;
    VN?: string;
    VisitDateTime?: string;
    AccidentDate?: string;
    AccidentPlaceCode?: string;
    AccidentInjuryWoundtypeCode?: string;
    AccidentInjurySideCode?: string;
    WoundDetails?: string;
    PolicyTypeCode?: string;
    ServiceSettingCode?: string;
    IllnessTypeCode?: string;
    SurgeryTypeCode?: string;
    ChiefComplaint?: string;
    PresentIllness?: string;
    AccidentCauseOver45Days?: string;
    DxFreeText?: string;
    FurtherClaimId?: string;
    FurtherClaimNo?: string;
    OtherInsurer?: string;
    UnderlyingCondition?: string;
    PhysicalExam?: string;
    PlanOfTreatment?: string;
    ProcedureFreeText?: string;
    AdditionalNote?: string;
    SignSymptomsDate?: string;
    ComaScore?: string;
    ExpectedDayOfRecovery?: string;
    AlcoholRelated?: string;
    Pregnant?: string;
    PrivateCase?: string;
    PreviousTreatmentDate?: string;
    PreviousTreatmentDetail?: string;
    ProcedureEdit?: boolean;
    ProcedureInfo?: QueryProcedure[];
    Runningdocument: number;
    FurtherClaimVN?: string;
    OrderVitamin?: boolean;
}
declare class QueryProcedure {
    Icd9?: string;
    ProcedureName?: string;
    ProcedureDate?: string;
}
export {};
