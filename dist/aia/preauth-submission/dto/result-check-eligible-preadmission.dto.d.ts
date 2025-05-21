import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultCheckeligiblePreAdmissionDto {
    HTTPStatus: HttpMessageDto;
    Result?: InsuranceResultInfo;
}
export declare class CreateTransactionDto {
    HTTPStatus: HttpMessageDto;
    Result?: string;
}
declare class InsuranceResultInfo {
    InsuranceResult?: InsuranceResult;
    InsuranceData?: InsuranceEligibleData;
    InsuranceCustomerDetail?: InsuranceCustomerDetail;
}
export declare class InsuranceResult {
    Code?: string;
    Message?: string;
    MessageTh?: string;
}
export declare class InsuranceEligibleData {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode: number;
    CoverageClaimStatus?: boolean;
    RemarkList?: [];
    PolicyCoverageDesc?: [];
    CoverageList?: CoverageList[];
    PolicyInfoList?: PolicyInfoList[];
}
export declare class PolicyInfoList {
    PolicyNo?: string;
    MembershipNo?: string;
    PolicyDescription?: string;
    EffectiveDate?: string;
    Remark1?: string;
    Remark2?: string;
    SpecialRemark1?: string;
    SpecialRemark2?: string;
}
export declare class CoverageList {
    Type?: string;
    Status?: string;
    MessageList?: MessageList[];
}
export declare class MessageList {
    PolicyNo?: string;
    PlanName?: string;
    MessageTh?: string;
    MessageEn?: string;
    RuleNo?: string;
}
export declare class InsuranceCustomerDetail {
    PolicyNo?: string;
    MemberShipId?: string;
    FirstName?: string;
    LastName?: string;
    NationalId?: string;
}
export declare class EligibleEpisodeListDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultPatientEpisodeInfo;
}
declare class ResultPatientEpisodeInfo {
    PatientInfo?: FindPatientInfoResultInfo;
    EpisodeInfo?: FindEpisodeInfoResultInfo;
}
export declare class FindPatientInfoResultInfo {
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
export declare class FindEpisodeInfoResultInfo {
    VN?: string;
    EpisodeType?: string;
    VisitDate?: string;
    VisitTime?: string;
    VisitDateTime?: string;
    AccidentDate?: string;
    LocationCode?: string;
    LocationDesc?: string;
    WardCode?: string;
    WardDesc?: string;
    BedCode?: string;
    MainCareproviderCode?: string;
    MainCareproviderDesc?: string;
    DoctorLicense?: string;
    DoctorFirstName?: string;
    DoctorLastName?: string;
    SurgeryType?: string;
}
export {};
