import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryPreBillingDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    HavePreBilling: boolean;
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
export declare class ResultSubmitPreBillingDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    TotalBillAmount?: string;
    PreBillingInfo?: QueryPreBilling[];
}
export declare class DeletePreBillingDto {
    PatientInfo?: DeletePatientBillingBodyDto;
}
declare class DeletePatientBillingBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    BillingID?: string;
}
export {};
