import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultIpdDischargeVisitDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    VisitInfo?: QueryVisit;
}
export declare class QueryVisit {
    AccidentDate?: string;
    AdditionalNote?: string;
    AdmitDateTime?: string;
    AlcoholRelated?: boolean;
    ChiefComplaint?: string;
    ComaScore?: string;
    DxFreeText?: string;
    ExpectedDayOfRecovery?: string;
    ExpectedLos?: string;
    Height?: string;
    IndicationForAdmission?: string;
    PhysicalExam?: string;
    PlanOfTreatment?: string;
    PreauthReferClaimNo?: string;
    PreauthOcc?: string;
    Pregnant?: boolean;
    PresentIllness?: string;
    PreviousTreatmentDate?: string;
    PreviousTreatmentDetail?: string;
    PrivateCase?: boolean;
    ProcedureFreeText?: string;
    SignSymptomsDate?: string;
    UnderlyingCondition?: string;
    VisitDate?: string;
    VisitDateTime?: string;
    DscDateTime?: string;
    Vn?: string;
    An?: string;
    Weight?: string;
    IsIPDDischarge?: boolean;
}
export declare class ResultIPDVisitInfoDto {
    AdditionalNote: string;
    AlcoholRelated: boolean;
    ChiefComplaint: string;
    ComaScore: string;
    DxFreeText: string;
    ExpectedDayOfRecovery: string;
    Height: string;
    PhysicalExam: string;
    PlanOfTreatment: string;
    Pregnant: boolean;
    PresentIllness: string;
    PreviousTreatmentDate: string;
    PreviousTreatmentDetail: string;
    PrivateCase: boolean;
    ProcedureFreeText: string;
    SignSymptomsDate: string;
    UnderlyingCondition: string;
    VisitDateTime: string;
    VN: string;
    Weight: string;
    An: string;
    PreauthReferClaimNo: string;
    PreauthReferOcc: string;
    IndicationForAdmission: string;
    DscDateTime: string;
    AdmitDateTime: string;
    IsIPDDischarge: boolean;
    AnesthesiaList: string;
}
