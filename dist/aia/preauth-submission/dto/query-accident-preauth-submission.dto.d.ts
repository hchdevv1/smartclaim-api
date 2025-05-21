import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryAccident {
    AccidentPlace?: string;
    AccidentDate?: string;
    CauseOfInjuryDetail?: QueryCauseOfInjuryDetail[];
    InjuryDetail?: QueryInjuryDetail[];
}
declare class QueryCauseOfInjuryDetail {
    CauseOfInjury?: string;
    CommentOfInjury?: string;
}
declare class QueryInjuryDetail {
    WoundType?: string;
    InjurySide?: string;
    InjuryArea?: string;
}
export declare class QueryAccidentDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode?: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    HaveAccidentCauseOfInjuryDetail?: boolean;
    HaveAccidentInjuryDetail?: boolean;
    AccidentDetailInfo?: QueryAccident;
}
export declare class ResultSubmitAccidentDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    HaveProcedure: boolean;
    AccidentDetailInfo?: QueryAccident[];
}
export {};
