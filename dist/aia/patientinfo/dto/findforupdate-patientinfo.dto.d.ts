import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class FindforUpdateDto {
    HTTPStatus: HttpMessageDto;
    Result?: ComparePatientInfo;
}
export declare class FindforUpdateBodyDto {
    PatientInfo?: FindforUpdatePatientBodyDto;
}
declare class FindforUpdatePatientBodyDto {
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
export declare class ComparePatientInfo {
    PatientInfo?: ComparePatientData;
}
declare class ComparePatientData {
    PatientDatabase?: FindforUpdatePatientDatabase;
    PatientTrakcare?: FindforUpdatePatientTrakcare;
}
export declare class FindforUpdatePatientTrakcare {
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
export declare class FindforUpdatePatientDatabase {
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
    MembershipId?: string;
    PolicyNumber?: string;
    CustomerId?: string;
}
export {};
