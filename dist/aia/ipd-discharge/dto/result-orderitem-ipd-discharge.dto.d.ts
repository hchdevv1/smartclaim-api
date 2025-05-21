import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultIpdDischargeOrderItemDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    OrderItemInfo?: QueryOrderItem[];
}
export declare class QueryOrderItem {
    ItemId?: string;
    ItemName?: string;
    ItemAmount?: string;
    Discount?: string;
    Initial?: string;
    LocalBillingCode?: string;
    LocalBillingName?: string;
    Location?: string;
    NetAmount?: string;
    SimbVersion?: string;
    Terminology?: string;
}
