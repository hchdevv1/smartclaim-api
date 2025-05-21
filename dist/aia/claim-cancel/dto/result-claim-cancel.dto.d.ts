import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultClaimCancelDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    ClaimCancelInfo?: InsuranceResultInfo;
}
export declare class InsuranceResultInfo {
    InsuranceResult?: InsuranceResult;
    InsuranceData?: InsuranceData;
}
export declare class InsuranceResult {
    Code?: string;
    Message?: string;
    MessageTh?: string;
}
export declare class InsuranceData {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode?: string;
    Status?: string;
}
