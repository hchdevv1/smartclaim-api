import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultPackageBundleDto {
    HTTPStatus: HttpMessageDto;
    Result?: PackageBundleResultInfo;
}
export declare class PackageBundleResultInfo {
    PackageCode?: string;
    PackageDesc?: string;
    BillingInfo?: QueryPackageBundleBilling[];
}
export declare class QueryPackageBundleBilling {
    LocalBillingCode?: string;
    LocalBillingName?: string;
    SimbBillingCode?: string;
    PayorBillingCode?: string;
    BillingInitial?: string;
    BillingDiscount?: string;
    BillingNetAmount?: string;
}
