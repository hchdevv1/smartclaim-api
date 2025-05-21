import { HttpMessageDto } from './http-status-message.dto';
export declare class QueryPreBillingDatabaseBodyDto {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode: number;
    HN?: string;
    VN?: string;
}
export declare class ResultPreBillingDto {
    HTTPStatus: HttpMessageDto;
    Result?: PreBillingDatabaseResultInfo;
}
export declare class PreBillingDatabaseResultInfo {
    PreBillingInfo?: QueryPreBillingDatabse[];
}
export declare class QueryPreBillingDatabse {
    LocalBillingCode?: string;
    LocalBillingName?: string;
    SimbBillingCode?: string;
    PayorBillingCode?: string;
    BillingInitial?: string;
    BillingDiscount?: string;
    BillingNetAmount?: string;
    TotalBillAmount?: string;
}
export declare class ResultPreBillingDatabaseInfoDto {
    LocalBillingCode?: string;
    LocalBillingName?: string;
    SimbBillingCode?: string;
    PayorBillingCode?: string;
    BillingInitial?: string;
    BillingDiscount?: string;
    BillingNetAmount?: string;
    TotalBillAmount?: string;
}
