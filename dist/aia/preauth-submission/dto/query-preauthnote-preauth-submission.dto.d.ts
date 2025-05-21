import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryPreAuthNoteDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    HavePreAuthNote: boolean;
    PreAuthNoteInfo?: QueryPreAuthNote[];
}
declare class QueryPreAuthNote {
    PreAuthDatetime?: string;
    PreAuthDetail?: string;
}
export declare class ResultSubmitPreAuthNoteDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    HavePreAuthNote: boolean;
    PreAuthNoteInfo?: QueryPreAuthNote[];
}
export {};
