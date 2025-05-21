export declare class QueryPreauthSubmissionDto {
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
    ServiceSettingAbbr?: string;
    IllnessTypeCode?: string;
    SurgeryTypeCode?: string;
    VisitDatefrom?: string;
    VisitDateto?: string;
    VisitDateTime?: string;
    AccidentDate?: string;
}
export {};
