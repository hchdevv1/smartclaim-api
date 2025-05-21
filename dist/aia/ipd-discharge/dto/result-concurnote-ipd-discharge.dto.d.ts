import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultConcurNoteDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    ConcurNoteList?: QueryConcurNote[];
}
export declare class QueryConcurNote {
    ConcurrentDatetime?: string;
    ConcurrentDetail?: string;
}
