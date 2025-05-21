import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class PatientCreateDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    PatientInfo?: CreatePatientBodyDto;
}
export declare class CreateBodyDto {
    PatientInfo?: CreatePatientBodyDto;
}
declare class CreatePatientBodyDto {
    InsurerCode: number;
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
export declare class TransactionQueryPatientCreateDto {
    InsurerCode: number;
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
export {};
