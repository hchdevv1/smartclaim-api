import { HttpMessageDto } from './http-status-message.dto';
export declare class AccidentDatabase {
    AccidentPlace?: string;
    AccidentDate?: string;
    CauseOfInjuryDetail?: CauseOfInjuryDetail[];
    InjuryDetail?: InjuryDetail[];
}
export declare class CauseOfInjuryDetail {
    CauseOfInjury?: string;
    CommentOfInjury?: string;
}
export declare class InjuryDetail {
    WoundType?: string;
    InjurySide?: string;
    InjuryArea?: string;
}
export declare class AccidentDatabaseResultInfo {
    AccidentDetailInfo?: AccidentDatabase;
}
export declare class ResultAccidentDatabaseDto {
    HTTPStatus?: HttpMessageDto;
    Result?: AccidentDatabaseResultInfo;
}
export declare class QueryAccidentDatabaseBodyDto {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode: number;
    HN?: string;
    VN?: string;
}
