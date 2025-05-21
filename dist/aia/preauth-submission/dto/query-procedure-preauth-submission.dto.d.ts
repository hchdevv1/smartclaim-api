import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryProcedureDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    HaveProcedure: boolean;
    ProcedureInfo?: QueryProcedure[];
}
declare class QueryProcedure {
    Icd9?: string;
    ProcedureName?: string;
    ProcedureDate?: string;
}
export declare class ResultSubmitProcedureDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    HaveProcedure: boolean;
    ProcedureInfo?: QueryProcedure[];
}
export {};
