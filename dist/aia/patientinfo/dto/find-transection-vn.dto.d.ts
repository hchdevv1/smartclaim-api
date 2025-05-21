import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class FindTransectionByVNBodyDto {
    PatientInfo?: FindPatientBodyDto;
}
declare class FindPatientBodyDto {
    InsurerCode: number;
    RefID?: string;
    TransactionNo?: string;
    PID?: string;
    PassportNumber?: string;
    IdType?: string;
    HN?: string;
    VN?: string;
    StatusClaimCode?: string;
    VisitDatefrom?: string;
    VisitDateto?: string;
}
export declare class ResultTransactionClaimDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultTransactionClaimInfo;
}
export declare class ResultTransactionClaimInfo {
    TransactionClaimInfo?: TransactionClaimInfo[];
}
declare class TransactionClaimInfo {
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    VisitDateTime?: string;
    ClaimNo: string;
    ClaimStatusCode?: string;
    ClaimStatusDesc?: string;
    OccurrenceNo: string;
    TotalApprovedAmount: string;
    TotalExcessAmount?: string | null;
    IsReimbursement: boolean;
    BatchNumber?: string;
    InvoiceNumber?: string;
}
export {};
