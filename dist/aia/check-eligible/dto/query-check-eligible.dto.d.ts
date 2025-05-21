export declare class QueryEligibleBodyDto {
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
    MembershipId?: string;
    PolicyNumber?: string;
    CustomerId?: string;
}
export declare class QueryCreateTransactionBodyDto {
    PatientInfo?: CreateTransactionBodyDto;
}
declare class CreateTransactionBodyDto {
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
    Accidentcauseover45days?: string;
    Runningdocument: number;
    FurtherClaimId?: string;
    FurtherClaimNo?: string;
    FurtherClaimVN?: string;
    MembershipId?: string;
    PolicyNumber?: string;
    CustomerId?: string;
    Visitlocation?: string;
}
export {};
