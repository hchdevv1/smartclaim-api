import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryDiagnosisDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    HaveDiagnosis: boolean;
    DiagnosisInfo?: QueryDiagnosis[];
}
declare class QueryDiagnosis {
    DxName?: string;
    DxType?: string;
    DxCode?: string;
}
export declare class ResultSubmitDiagnosisDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    HaveDiagnosis: boolean;
    DiagnosisInfo?: QueryDiagnosis[];
}
export {};
