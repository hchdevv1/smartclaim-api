import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultBillingSubInfoDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    BillingSubInfo?: BillingSubInfoDto[];
}
declare class BillingSubInfoDto {
    LocalBillingId: string;
    LocalBillingCode: string;
    LocalBillingName: string;
    SimbBillingCode: string;
    PayorBillingCode: string;
}
export {};
