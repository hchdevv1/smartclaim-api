import { HttpMessageDto } from './http-status-message.dto';
export declare class QueryDiagnosisDatabaseBodyDto {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode: number;
    HN?: string;
    VN?: string;
}
export declare class ResultPreDiagnosisDto {
    HTTPStatus: HttpMessageDto;
    Result?: PreDiagnosisDatabaseResultInfo;
}
export declare class PreDiagnosisDatabaseResultInfo {
    DiagnosisInfo?: QueryPreDiagnosisDatabse[];
}
export declare class QueryPreDiagnosisDatabse {
    Icd10?: string;
    DxName?: string;
    DxType?: string;
}
export declare class ResultPreDiagnosisDatabaseInfoDto {
    Icd10: string;
    DxName: string;
    DxType: string;
}
