import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultCheckClaimStatusDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    InsuranceResultInfo?: InsuranceResultInfo;
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
    BatchNumber?: string;
    ClaimStatus?: string;
    ClaimStatusCode?: string;
    ClaimStatusDesc?: string;
    ClaimStatusDesc_TH?: string;
    ClaimStatusDesc_EN?: string;
    TotalApproveAmount?: string;
    PaymentDate?: string;
    InvoiceNumber?: string;
    AttachDocList?: ResultAttachDocListInfoDto[];
}
export declare class ResultAttachDocListInfoDto {
    Base64Data: string;
    DocName: string;
}
