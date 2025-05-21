import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultPreAuthAccidentDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    AccidentDetailInfo?: QueryAccident[];
}
export declare class QueryAccident {
    AccidentPlace?: string;
    AccidentDate?: string;
    CauseOfInjuryDetail?: QueryCauseOfInjuryDetail[];
    InjuryDetail?: QueryInjuryDetail[];
}
export declare class QueryCauseOfInjuryDetail {
    CauseOfInjury?: string;
    CommentOfInjury?: string;
}
export declare class QueryInjuryDetail {
    WoundType?: string;
    InjurySide?: string;
    InjuryArea?: string;
}
