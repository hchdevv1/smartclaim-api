import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultIpdDischargeDiagnosisDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    DiagnosisInfo?: QueryDiagnosis[];
}
export declare class QueryDiagnosis {
    DxTypeCode?: string;
    DxCode?: string;
    DxName?: string;
    Dxtypenametrakcare?: string;
    Dxtypecodeinsurance?: string;
    Dxtypenameinsurance?: string;
}
