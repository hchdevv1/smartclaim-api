import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultAuthNoteDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    PreAuthNoteList?: QueryPreAuthNote[];
}
export declare class QueryPreAuthNote {
    PreAuthDateTime?: string;
    PreAuthDetail?: string;
}
