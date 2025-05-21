import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryUpdateFurtherClaimVNBodyDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    FurtherClaimVN?: string;
}
export declare class ResultSubmitUpdateFurtherClaimVNDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultUpdateFurtherClaimVNBodyDto;
}
declare class ResultUpdateFurtherClaimVNBodyDto {
    status?: string;
}
export {};
