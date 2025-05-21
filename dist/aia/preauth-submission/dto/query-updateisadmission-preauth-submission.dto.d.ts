import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryUpdateIsAdmissionBodyDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    IsAdmission?: boolean;
}
export declare class ResultSubmitUpdateIsAdmissionDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultUpdateIsAdmissionBodyDto;
}
declare class ResultUpdateIsAdmissionBodyDto {
    status?: string;
}
export {};
