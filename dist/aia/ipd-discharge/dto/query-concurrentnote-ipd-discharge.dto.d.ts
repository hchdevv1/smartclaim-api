import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryConcurNoteDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    HaveConcurNote: boolean;
    ConcurNoteInfo?: QueryConcurNote[];
}
declare class QueryConcurNote {
    ConcurrentDatetime?: string;
    ConcurrentDetail?: string;
}
export declare class ResultSubmitConcurNoteDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    HaveConcurNote: boolean;
    ConcurNoteInfo?: QueryConcurNote[];
}
export {};
