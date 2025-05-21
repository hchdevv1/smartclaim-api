import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QuerySearchTransection {
    PatientInfo?: SearchTransectionDto;
}
declare class SearchTransectionDto {
    InsurerCode: number;
    PID?: string;
    PassportNumber?: string;
    HN?: string;
    VN?: string;
    InvoiceNumber?: string;
    StatusClaimCode?: string;
    VisitDatefrom?: string;
    VisitDateto?: string;
    ServiceSettingCode?: string;
    ServiceSettingAbbr?: string;
    StatusChangedAtDatefrom?: string;
    StatusChangedAtDateto?: string;
}
export declare class ResultTransactionClaimDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultTransactionInfo;
}
export declare class ResultTransactionInfo {
    TransactionClaimInfo?: TransactionClaimInfo[];
}
declare class TransactionClaimInfo {
    RefId?: string;
    TransactionNo?: string;
    PID?: string;
    PassportNumber?: string;
    TitleTH?: string;
    GivenNameTH?: string;
    SurnameTH?: string;
    HN?: string;
    VN?: string;
    VisitDate?: string;
    ClaimNo: string;
    ClaimStatusCode?: string;
    ClaimStatusDesc?: string;
    ClaimStatusDesc_EN?: string;
    ClaimStatusDesc_TH?: string;
    OccurrenceNo: string;
    TotalApprovedAmount: string;
    TotalExcessAmount?: string | null;
    IsReimbursement: boolean;
    BatchNumber?: string;
    InvoiceNumber?: string;
    PolicyTypeCode?: string;
    IdType?: string;
    IllnessTypeCode?: string;
    ServiceSettingCode?: string;
    ServiceSettingAbbr?: string;
    SurgeryTypeCode?: string;
    FurtherClaimNo?: string;
    FurtherClaimId?: string;
    AccidentDate?: string;
    VisitDateTime?: string;
    Runningdocument?: number;
    ReferenceVN?: string;
    IsIPDDischarge: boolean;
}
export {};
