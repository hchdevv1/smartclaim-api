import { HttpMessageDto } from './http-status-message.dto';
export declare class QueryConcurNoteDatabaseBodyDto {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode: number;
    HN?: string;
    VN?: string;
}
export declare class ResultConcurNoteDto {
    HTTPStatus: HttpMessageDto;
    Result?: ConcurNoteDatabaseResultInfo;
}
export declare class ConcurNoteDatabaseResultInfo {
    ConcurNoteList?: QueryConcurNoteDatabse[];
}
export declare class QueryConcurNoteDatabse {
    ConcurrentDatetime?: string;
    ConcurrentDetail?: string;
}
export declare class ResultConcurNoteDatabaseInfoDto {
    ConcurrentDatetime: string;
    ConcurrentDetail: string;
}
