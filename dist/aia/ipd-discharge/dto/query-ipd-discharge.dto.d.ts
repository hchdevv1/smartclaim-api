export declare class QueryIpdDischargeDto {
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
    VN?: string;
    PolicyTypeCode?: string;
    ServiceSettingCode?: string;
    IllnessTypeCode?: string;
    SurgeryTypeCode?: string;
    VisitDateTime?: string;
    PreauthReferClaimNo?: string;
    PreauthOcc?: string;
    AccidentDate?: string;
    IsIPDDischarge?: boolean;
    HaveAccidentCauseOfInjuryDetail?: boolean;
    HaveAccidentInjuryDetail?: boolean;
}
export {};
