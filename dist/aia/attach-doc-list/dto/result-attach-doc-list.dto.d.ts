import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultAttachDocListDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    BillingSubmissionInfo?: InsuranceResultInfo;
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
}
export declare class ResultAttachDocListInfoDto {
    Base64Data: string;
    DocName: string;
}
