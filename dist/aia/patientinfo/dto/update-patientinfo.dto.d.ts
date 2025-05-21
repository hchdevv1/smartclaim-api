import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class PatientUpdateDto {
    HTTPStatus: HttpMessageDto;
    Result?: UpdateResultDto;
}
declare class UpdateResultDto {
    PatientInfo?: UpdatePatientBodyDto;
}
export declare class UpdateBodyDto {
    PatientInfo?: UpdatePatientBodyDto;
}
declare class UpdatePatientBodyDto {
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
