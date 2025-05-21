import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultRetrievePreAuthListDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    PreAuthTransactionList?: PreAuthList[];
}
export declare class PreAuthList {
    ClaimNo?: string;
    OccerrenceNo?: string;
    ClaimStatus?: string;
    ClaimStatusDesc?: string;
    ExpectedAdmitDate?: string;
    VisitDateTime?: string;
    Procedure?: Procedure[];
    Diagnosis?: Diagnosis[];
}
declare class Diagnosis {
    DxName?: string;
    Icd10?: string;
}
declare class Procedure {
    ProcedureName?: string;
    ProcedureDate?: string;
    Icd9?: string;
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
    PreAuthTransactionList?: PreAuthList[];
}
export {};
