import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultPreAuthVisitDto {
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
