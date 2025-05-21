export declare class QueryOpdDischargeDto {
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
    PolicyTypeCode?: string;
    ServiceSettingCode?: string;
    IllnessTypeCode?: string;
    SurgeryTypeCode?: string;
    VisitDatefrom?: string;
    VisitDateto?: string;
    VisitDateTime?: string;
    AccidentDate?: string;
    FurtherClaimId?: string;
    FurtherClaimVN?: string;
    OrderVitamin?: boolean;
}
export {};
