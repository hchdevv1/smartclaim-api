import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryUpdateReferenceVNBodyDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    ReferenceVN?: string;
    IsAdmission: any;
}
export declare class ResultSubmitUpdateReferenceVNDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultUpdateReferenceVNBodyDto;
}
declare class ResultUpdateReferenceVNBodyDto {
    status?: string;
}
export {};
