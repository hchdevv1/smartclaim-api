import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultPreAuthBillingDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    BillingInfo?: QueryBilling[];
    TotalBillAmount?: string;
    InvoiceNumber?: string;
}
export declare class QueryBilling {
    LocalBillingCode?: string;
    LocalBillingName?: string;
    SimbBillingCode?: string;
    PayorBillingCode?: string;
    BillingInitial?: string;
    BillingDiscount?: string;
    BillingNetAmount?: string;
}
