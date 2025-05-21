import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
declare class StatusInfoDto {
    InsurerCode: string;
    BatchNumber: string;
    ClaimStatus: string;
    ClaimStatusCode: string;
    ClaimStatusDesc: string;
    ClaimStatusDesc_EN: string;
    ClaimStatusDesc_TH: string;
    TotalApproveAmount?: string;
    PaymentDate?: string;
    InvoiceNumber: string;
    AttachDocList: any[];
}
declare class ResultDto {
    Code: string;
    Message: string;
    MessageTh: string;
}
export declare class InsuranceDataListAll {
    RefId: string;
    TransactionNo: string;
    Result: ResultDto;
    StatusInfo: StatusInfoDto;
}
export declare class ResultInfo {
    InsuranceData: InsuranceDataListAll[];
}
export declare class ResultCheckClaimStatusListAllDto {
    HTTPStatus: HttpMessageDto;
    Result: ResultInfo;
}
export {};
