import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class PatientSearchDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    PatientInfo?: SearchPatientResultDto[];
}
declare class SearchPatientResultDto {
    PatientID?: number;
    PID?: string;
    PassportNumber?: string;
    HN?: string;
    TitleTH?: string;
    GivenNameTH?: string;
    SurnameTH?: string;
    TitleEN?: string;
    GivenNameEN?: string;
    SurnameEN?: string;
    DateOfBirth?: string;
    Gender?: string;
    MobilePhone?: string;
}
export declare class SearchBodyDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefID?: string;
    TransactionNo?: string;
    PID?: string;
    PassportNumber?: string;
    IdType?: string;
    HN?: string;
    VN?: string;
    StatusClaimCode?: string;
    VisitDatefrom?: string;
    VisitDateto?: string;
}
export {};
