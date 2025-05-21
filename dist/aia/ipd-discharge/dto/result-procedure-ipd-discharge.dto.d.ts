import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultIpdDischargeProcedurDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    ProcedureInfo?: QueryProcedure[];
}
export declare class QueryProcedure {
    Icd9?: string;
    ProcedureName?: string;
    ProcedureDate?: string;
}
