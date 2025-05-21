export declare class SubmitPreBillingDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    PreBillingInfo?: QueryPreBilling[];
}
declare class QueryPreBilling {
    LocalBillingCode?: string;
    LocalBillingName?: string;
    SimbBillingCode?: string;
    PayorBillingCode?: string;
    BillingInitial?: string;
    BillingDiscount?: string;
    BillingNetAmount?: string;
    TotalBillAmount?: string;
}
export {};
