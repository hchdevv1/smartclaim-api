import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultClaimFormListDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    ClaimFormListInfo?: QueryClaimFormListInfo[];
}
export declare class QueryClaimFormListInfo {
    VN?: string;
    VisitDate?: string;
    DoctorFirstName?: string;
    PresentIllness?: string;
    InsuranceNote?: string;
    DiagnosisInfo?: DiagnosisInfo[];
}
export declare class QueryClaimDiagnosisInfo {
    DiagnosisInfo?: DiagnosisInfo[];
}
declare class DiagnosisInfo {
    DxCode?: string;
    DxName?: string;
}
export {};
