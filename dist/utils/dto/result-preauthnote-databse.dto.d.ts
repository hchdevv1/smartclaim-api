import { HttpMessageDto } from './http-status-message.dto';
export declare class QueryPreAuthNoteDatabaseBodyDto {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode: number;
    HN?: string;
    VN?: string;
}
export declare class ResultPreAuthNoteDto {
    HTTPStatus: HttpMessageDto;
    Result?: PreAuthNoteDatabaseResultInfo;
}
export declare class PreAuthNoteDatabaseResultInfo {
    PreAuthNote?: QueryPreAuthNoteDatabse[];
}
export declare class QueryPreAuthNoteDatabse {
    PreAuthDateTime?: string;
    PreAuthDetail?: string;
}
export declare class ResultPreAuthNoteDatabaseInfoDto {
    PreAuthDateTime: string;
    PreAuthDetail: string;
}
