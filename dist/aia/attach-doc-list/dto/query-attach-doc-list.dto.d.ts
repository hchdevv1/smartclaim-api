export declare class QueryAttachBodyDto {
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
    InvoiceNumber?: string;
    DocumenttypeCode?: string;
    Runningdocument?: number;
    IsRequestDispute?: boolean;
}
export {};
