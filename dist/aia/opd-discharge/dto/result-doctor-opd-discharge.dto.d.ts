import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultOpdDischargeDoctorDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    DoctorInfo?: QueryDoctor[];
}
export declare class QueryDoctor {
    DoctorLicense?: string;
    DoctorRole?: string;
    DoctorFirstName?: string;
    DoctorLastName?: string;
}
