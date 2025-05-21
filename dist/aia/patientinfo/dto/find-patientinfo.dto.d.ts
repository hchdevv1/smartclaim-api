import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class PatientFindDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    PatientInfo?: FindPatientResultDto;
}
export declare class FindPatientResultDto {
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
export declare class FindBodyDto {
    PatientInfo?: FindPatientBodyDto;
}
declare class FindPatientBodyDto {
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
