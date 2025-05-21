import { HttpMessageDto } from './http-status-message.dto';
export declare class QueryProcedeureDatabaseBodyDto {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode: number;
    HN?: string;
    VN?: string;
}
export declare class ResultOpdDischargeProcedurDto {
    HTTPStatus: HttpMessageDto;
    Result?: ProcedeureDatabaseResultInfo;
}
export declare class ProcedeureDatabaseResultInfo {
    ProcedureInfo?: QueryProcedureDatabse[];
}
export declare class QueryProcedureDatabse {
    Icd9?: string;
    ProcedureName?: string;
    ProcedureDate?: string;
}
export declare class ResultProcedureDatabaseInfoDto {
    Icd9: string;
    ProcedureDate: string;
    ProcedureName: string;
}
