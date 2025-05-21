import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultlistBillingDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    ItemBillingCheckBalance?: ItemBillingCheckBalanceInfoDto[];
}
declare class ItemBillingCheckBalanceInfoDto {
    LocalBillingCode: string;
    LocalBillingName: string;
    SimbBillingCode: string;
    PayorBillingCode: string;
    BillingInitial: string;
    BillingDiscount: string;
    BillingNetAmount: string;
    ItemCode: string;
    ItemName: string;
    ItemAmount: string;
    Discount: string;
    ItemUnitPrice: string;
    netamt: string;
    SimbVersion: string;
    Terminology: string;
}
export {};
