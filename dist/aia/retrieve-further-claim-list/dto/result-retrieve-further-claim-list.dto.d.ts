import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultRetrieveFurtherClaimDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    FurtherClaimList?: FurtherClaimList[];
}
export declare class FurtherClaimList {
    FurtherClaimId?: string;
    ClaimNo?: string;
    OccurrenceNo?: string;
    Icd10?: string;
    DxName?: string;
    DscDateTime?: string;
    VisitDateTime?: string;
    AccidentDate?: string;
    FurtherClaimVN?: string;
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
    FurtherClaimList?: FurtherClaimList[];
}
